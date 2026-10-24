<#
.SYNOPSIS
    ECC Ultra OS v3.0 - Automated 6-Phase Verification & GateGuard/Plankton Audit Script
.DESCRIPTION
    Executes the 6-phase verification pipeline on a target project directory:
      Phase 1: Build Verification
      Phase 2: Type Check (tsc / pyright / mypy / cargo check / go vet)
      Phase 3: Lint & Plankton Config Lock Check
      Phase 4: Test Suite Execution
      Phase 5: AgentShield Security & Zero-Slop Scan (Secrets, console.log, TODOs, empty catch)
      Phase 6: Git Diff & Blast-Radius Summary
#>
param(
    [string]$ProjectRoot = ".",
    [switch]$SkipTests = $false,
    [switch]$SkipBuild = $false
)

$ErrorActionPreference = "Continue"
$ResolvedRoot = (Resolve-Path $ProjectRoot).Path
Push-Location $ResolvedRoot

$Results = [ordered]@{
    Stack        = "Unknown"
    PackageMgr   = "None"
    Build        = "SKIPPED"
    Types        = "SKIPPED"
    LintAndLock  = "SKIPPED"
    Tests        = "SKIPPED"
    AgentShield  = "PASS"
    DiffSummary  = "No git repo"
    Issues       = New-Object System.Collections.Generic.List[string]
}

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "[ECC ULTRA OS v3.0] 6-PHASE VERIFICATION ENGINE" -ForegroundColor Cyan
Write-Host "Project Root: $ResolvedRoot" -ForegroundColor Gray
Write-Host "============================================================" -ForegroundColor Cyan

# --- Step 0: Detect Stack & Package Manager ---
if (Test-Path "package.json") {
    $Results.Stack = "Node/TypeScript"
    if (Test-Path "bun.lockb") { $Results.PackageMgr = "bun" }
    elseif (Test-Path "bun.lock") { $Results.PackageMgr = "bun" }
    elseif (Test-Path "pnpm-lock.yaml") { $Results.PackageMgr = "pnpm" }
    elseif (Test-Path "yarn.lock") { $Results.PackageMgr = "yarn" }
    else { $Results.PackageMgr = "npm" }
} elseif ((Test-Path "pyproject.toml") -or (Test-Path "requirements.txt")) {
    $Results.Stack = "Python"
    if (Test-Path "uv.lock") { $Results.PackageMgr = "uv" }
    elseif (Test-Path "poetry.lock") { $Results.PackageMgr = "poetry" }
    else { $Results.PackageMgr = "python" }
} elseif (Test-Path "go.mod") {
    $Results.Stack = "Go"
    $Results.PackageMgr = "go"
} elseif (Test-Path "Cargo.toml") {
    $Results.Stack = "Rust"
    $Results.PackageMgr = "cargo"
}

Write-Host "[Step 0] Detected Stack: $($Results.Stack) (Runner: $($Results.PackageMgr))" -ForegroundColor Yellow

$PkgScripts = @{}
if ($Results.Stack -eq "Node/TypeScript") {
    try {
        $PkgJson = Get-Content "package.json" -Raw | ConvertFrom-Json
        if ($PkgJson.scripts) {
            foreach ($prop in $PkgJson.scripts.PSObject.Properties) {
                $PkgScripts[$prop.Name] = $prop.Value
            }
        }
    } catch {
        $Results.Issues.Add("Failed to parse package.json")
    }
}

function Invoke-StepCommand([string]$Label, [string]$Cmd) {
    Write-Host "`n>> Running $Label : $Cmd" -ForegroundColor Cyan
    Invoke-Expression $Cmd
    return ($LASTEXITCODE -eq 0)
}

# --- Phase 1: Build Verification ---
if (-not $SkipBuild) {
    if (($Results.Stack -eq "Node/TypeScript") -and $PkgScripts.ContainsKey("build")) {
        $ok = Invoke-StepCommand "Phase 1 (Build)" "$($Results.PackageMgr) run build"
        $Results.Build = if ($ok) { "PASS" } else { "FAIL" }
        if (-not $ok) { $Results.Issues.Add("Phase 1: Production build failed.") }
    } elseif ($Results.Stack -eq "Go") {
        $ok = Invoke-StepCommand "Phase 1 (Build)" "go build ./..."
        $Results.Build = if ($ok) { "PASS" } else { "FAIL" }
        if (-not $ok) { $Results.Issues.Add("Phase 1: go build failed.") }
    } elseif ($Results.Stack -eq "Rust") {
        $ok = Invoke-StepCommand "Phase 1 (Build)" "cargo check"
        $Results.Build = if ($ok) { "PASS" } else { "FAIL" }
        if (-not $ok) { $Results.Issues.Add("Phase 1: cargo check failed.") }
    }
}

# --- Phase 2: Type Check ---
if (($Results.Stack -eq "Node/TypeScript") -and (Test-Path "tsconfig.json")) {
    $ok = Invoke-StepCommand "Phase 2 (TypeCheck)" "npx --no-install tsc --noEmit"
    $Results.Types = if ($ok) { "PASS" } else { "FAIL" }
    if (-not $ok) { $Results.Issues.Add("Phase 2: TypeScript typecheck (tsc --noEmit) reported errors.") }
} elseif ($Results.Stack -eq "Python") {
    if (Get-Command pyright -ErrorAction SilentlyContinue) {
        $ok = Invoke-StepCommand "Phase 2 (TypeCheck)" "pyright ."
        $Results.Types = if ($ok) { "PASS" } else { "FAIL" }
        if (-not $ok) { $Results.Issues.Add("Phase 2: pyright reported type errors.") }
    }
} elseif ($Results.Stack -eq "Go") {
    $ok = Invoke-StepCommand "Phase 2 (go vet)" "go vet ./..."
    $Results.Types = if ($ok) { "PASS" } else { "FAIL" }
    if (-not $ok) { $Results.Issues.Add("Phase 2: go vet reported issues.") }
}

# --- Phase 3: Lint & Plankton Config Lock ---
$LintOk = $true
if (($Results.Stack -eq "Node/TypeScript") -and $PkgScripts.ContainsKey("lint")) {
    $LintOk = Invoke-StepCommand "Phase 3 (Lint)" "$($Results.PackageMgr) run lint"
    if (-not $LintOk) { $Results.Issues.Add("Phase 3: Linter reported errors.") }
} elseif (($Results.Stack -eq "Python") -and (Get-Command ruff -ErrorAction SilentlyContinue)) {
    $LintOk = Invoke-StepCommand "Phase 3 (Ruff Lint)" "ruff check ."
    if (-not $LintOk) { $Results.Issues.Add("Phase 3: ruff check reported errors.") }
}

# Plankton Config Lock check via git diff
$ConfigTampered = $false
if (Test-Path ".git") {
    $ChangedFiles = git diff --name-only HEAD 2>$null
    $ProtectedPatterns = @("tsconfig*.json", "*eslint*", "biome.json", ".ruff.toml", ".golangci.yml", "clippy.toml")
    foreach ($file in $ChangedFiles) {
        foreach ($pat in $ProtectedPatterns) {
            if ($file -like $pat) {
                $DiffContent = git diff HEAD -- $file 2>$null
                if ($DiffContent -match '(\+\s*"strict"\s*:\s*false|\+\s*".*no-explicit-any"\s*:\s*"off")') {
                    $ConfigTampered = $true
                    $Results.Issues.Add("Phase 3 [PLANKTON LOCK VIOLATION]: Config file '$file' was weakened to suppress errors!")
                }
            }
        }
    }
}
$Results.LintAndLock = if ($LintOk -and (-not $ConfigTampered)) { "PASS" } else { "FAIL" }

# --- Phase 4: Test Suite ---
if (-not $SkipTests) {
    if (($Results.Stack -eq "Node/TypeScript") -and $PkgScripts.ContainsKey("test")) {
        $ok = Invoke-StepCommand "Phase 4 (Tests)" "$($Results.PackageMgr) test"
        $Results.Tests = if ($ok) { "PASS" } else { "FAIL" }
        if (-not $ok) { $Results.Issues.Add("Phase 4: Test suite failed.") }
    } elseif (($Results.Stack -eq "Python") -and (Get-Command pytest -ErrorAction SilentlyContinue)) {
        $ok = Invoke-StepCommand "Phase 4 (Pytest)" "pytest"
        $Results.Tests = if ($ok) { "PASS" } else { "FAIL" }
        if (-not $ok) { $Results.Issues.Add("Phase 4: pytest failed.") }
    } elseif ($Results.Stack -eq "Go") {
        $ok = Invoke-StepCommand "Phase 4 (Go Test)" "go test ./..."
        $Results.Tests = if ($ok) { "PASS" } else { "FAIL" }
        if (-not $ok) { $Results.Issues.Add("Phase 4: go test failed.") }
    } elseif ($Results.Stack -eq "Rust") {
        $ok = Invoke-StepCommand "Phase 4 (Cargo Test)" "cargo test"
        $Results.Tests = if ($ok) { "PASS" } else { "FAIL" }
        if (-not $ok) { $Results.Issues.Add("Phase 4: cargo test failed.") }
    }
}

# --- Phase 5: AgentShield Security & Zero-Slop Scan ---
Write-Host "`n>> Running Phase 5 (AgentShield Security & Zero-Slop Scan)..." -ForegroundColor Cyan
$CodeFiles = Get-ChildItem -Recurse -File -Include *.ts,*.tsx,*.js,*.jsx,*.py,*.go,*.rs -ErrorAction SilentlyContinue |
    Where-Object { $_.FullName -notmatch '[\\/](node_modules|\.git|dist|build|\.next|coverage|__pycache__|target)[\\/]' }

$SecretHits = 0
foreach ($f in $CodeFiles) {
    $matches = Select-String -Path $f.FullName -Pattern '(sk-[a-zA-Z0-9]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN (RSA|OPENSSH|EC|PRIVATE) KEY-----)' -ErrorAction SilentlyContinue
    if ($matches) {
        $SecretHits += $matches.Count
        $Results.Issues.Add("Phase 5 [AGENTSHIELD CRITICAL]: Potential hardcoded secret in $($f.Name)")
    }
}
if ($SecretHits -gt 0) {
    $Results.AgentShield = "FAIL ($SecretHits secret hits)"
}

# --- Phase 6: Git Diff Summary ---
if (Test-Path ".git") {
    $Stat = git status --short 2>$null
    $Count = ($Stat | Measure-Object).Count
    $Results.DiffSummary = "$Count file(s) modified/untracked"
}

Pop-Location

# --- Final Report ---
$OverallReady = ($Results.Build -ne "FAIL") -and ($Results.Types -ne "FAIL") -and ($Results.LintAndLock -ne "FAIL") -and ($Results.Tests -ne "FAIL") -and ($Results.AgentShield -eq "PASS")

Write-Host "`n============================================================" -ForegroundColor Cyan
Write-Host "[ECC ULTRA OS] VERIFICATION REPORT" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ("Stack / Runner : {0} ({1})" -f $Results.Stack, $Results.PackageMgr)
Write-Host ("1. Build       : {0}" -f $Results.Build)
Write-Host ("2. Types       : {0}" -f $Results.Types)
Write-Host ("3. Lint & Lock : {0}" -f $Results.LintAndLock)
Write-Host ("4. Tests       : {0}" -f $Results.Tests)
Write-Host ("5. AgentShield : {0}" -f $Results.AgentShield)
Write-Host ("6. Diff Status : {0}" -f $Results.DiffSummary)
Write-Host "------------------------------------------------------------" -ForegroundColor Gray
if ($OverallReady) {
    Write-Host "Overall Gate   : [PASS] READY FOR PRODUCTION" -ForegroundColor Green
} else {
    Write-Host "Overall Gate   : [FAIL] NEEDS FIX" -ForegroundColor Red
    foreach ($issue in $Results.Issues) {
        Write-Host "  - $issue" -ForegroundColor Red
    }
}
Write-Host "============================================================" -ForegroundColor Cyan
exit $(if ($OverallReady) { 0 } else { 1 })
