<#
.SYNOPSIS
    ECC Ultra OS v3.0 - Instant Search & Router across all 311 Skills, 71 Agents, 22 Rule Packs & 97 Commands
.DESCRIPTION
    Searches the local ECC Ultra Vault (vault/skills, vault/agents, vault/rules, vault/commands)
    by keyword or regex and returns matching skill/agent/rule paths and descriptions.
.EXAMPLE
    powershell -ExecutionPolicy Bypass -File scripts/search-ecc-vault.ps1 -Query "fastapi"
    powershell -ExecutionPolicy Bypass -File scripts/search-ecc-vault.ps1 -Query "security" -Type skills
#>
param(
    [Parameter(Mandatory=$false)]
    [string]$Query = "",
    [ValidateSet("all", "skills", "agents", "rules", "commands")]
    [string]$Type = "all",
    [int]$Limit = 25
)

$ErrorActionPreference = "Continue"
$SkillRoot = Split-Path -Parent $PSScriptRoot
$VaultRoot = Join-Path $SkillRoot "vault"

if (-not (Test-Path $VaultRoot)) {
    Write-Host "[ERROR] Vault directory not found at: $VaultRoot" -ForegroundColor Red
    exit 1
}

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "[ECC ULTRA VAULT ROUTER] Query: '$Query' | Scope: $Type" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

$Targets = @()
if ($Type -eq "all" -or $Type -eq "skills") {
    $Targets += Get-ChildItem -Path (Join-Path $VaultRoot "skills") -Filter "SKILL.md" -Recurse -ErrorAction SilentlyContinue
}
if ($Type -eq "all" -or $Type -eq "agents") {
    $Targets += Get-ChildItem -Path (Join-Path $VaultRoot "agents") -Filter "*.md" -Recurse -ErrorAction SilentlyContinue
}
if ($Type -eq "all" -or $Type -eq "rules") {
    $Targets += Get-ChildItem -Path (Join-Path $VaultRoot "rules") -Filter "*.md" -Recurse -ErrorAction SilentlyContinue
}
if ($Type -eq "all" -or $Type -eq "commands") {
    $Targets += Get-ChildItem -Path (Join-Path $VaultRoot "commands") -Filter "*.md" -Recurse -ErrorAction SilentlyContinue
}

$MatchesList = New-Object System.Collections.Generic.List[PSObject]

foreach ($file in $Targets) {
    $relPath = $file.FullName.Substring($SkillRoot.Length + 1).Replace("\", "/")
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    if (-not $content) { continue }

    $name = $file.BaseName
    if ($name -eq "SKILL") {
        $name = $file.Directory.Name
    }

    $desc = ""
    if ($content -match '(?ms)^---\s*\r?\n(.*?)\r?\n---') {
        $fm = $Matches[1]
        if ($fm -match '(?m)^description:\s*(.+)$') {
            $desc = $Matches[1].Trim().Trim('"').Trim("'")
        }
    }
    if (-not $desc) {
        $firstLines = ($content -split "\r?\n" | Where-Object { $_ -and ($_ -notmatch '^---') -and ($_ -notmatch '^#') } | Select-Object -First 2) -join " "
        $desc = $firstLines
    }
    if ($desc.Length -gt 160) {
        $desc = $desc.Substring(0, 157) + "..."
    }

    $score = 0
    if ([string]::IsNullOrWhiteSpace($Query)) {
        $score = 1
    } else {
        if ($name -match $Query) { $score += 10 }
        if ($relPath -match $Query) { $score += 5 }
        if ($desc -match $Query) { $score += 3 }
        if ($content -match $Query) { $score += 1 }
    }

    if ($score -gt 0) {
        $MatchesList.Add([PSCustomObject]@{
            Score       = $score
            Name        = $name
            Path        = $relPath
            Description = $desc
        })
    }
}

$Sorted = $MatchesList | Sort-Object -Property @{Expression="Score"; Descending=$true}, @{Expression="Name"; Ascending=$true} | Select-Object -First $Limit

Write-Host ("Found {0} matching entries (showing top {1}):`n" -f $MatchesList.Count, $Sorted.Count) -ForegroundColor Yellow

foreach ($item in $Sorted) {
    Write-Host ("  * [{0}] " -f $item.Name) -ForegroundColor Green -NoNewline
    Write-Host ("({0})" -f $item.Path) -ForegroundColor Gray
    if ($item.Description) {
        Write-Host ("    {0}" -f $item.Description) -ForegroundColor White
    }
}
Write-Host "============================================================" -ForegroundColor Cyan
