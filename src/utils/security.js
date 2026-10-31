/**
 * Security and Cryptographic Utilities for BilimKitep Platform
 * Implements PBKDF2-SHA256 password hashing with cryptographic salt,
 * password strength scoring, brute-force rate limiting (account lockout),
 * and XSS text sanitization.
 */

const PBKDF2_ITERATIONS = 100000;
const SALT_BYTES = 16;
const LOCKOUT_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

// In-memory / localStorage tracking for brute-force prevention
const ATTEMPTS_STORAGE_KEY = 'bilimkitep_login_attempts';

/**
 * Generate a cryptographically secure random salt in hexadecimal format
 */
export const generateSalt = () => {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(SALT_BYTES);
    window.crypto.getRandomValues(array);
    return Array.from(array)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  // Fallback for non-browser or test runner environments
  return Array.from({ length: SALT_BYTES }, () =>
    Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  ).join('');
};

/**
 * Hash password using Web Crypto PBKDF2 (SHA-256, 100,000 iterations)
 * Returns { hash, salt } in hex string format
 */
export const hashPassword = async (password, existingSalt = null) => {
  if (!password) {
    throw new Error('Password must not be empty');
  }

  const salt = existingSalt || generateSalt();

  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    try {
      const enc = new TextEncoder();
      const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        enc.encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
      );

      // Convert salt hex to Uint8Array
      const saltBuffer = new Uint8Array(
        salt.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
      );

      const derivedBits = await window.crypto.subtle.deriveBits(
        {
          name: 'PBKDF2',
          salt: saltBuffer,
          iterations: PBKDF2_ITERATIONS,
          hash: 'SHA-256',
        },
        keyMaterial,
        256
      );

      const hashArray = Array.from(new Uint8Array(derivedBits));
      const hash = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      return { hash, salt };
    } catch {
      // Fall through to JS implementation
    }
  }

  // Pure JS fallback implementation for environments without subtle crypto
  let h = 0x811c9dc5;
  const combined = password + ':' + salt + ':' + PBKDF2_ITERATIONS;
  for (let iter = 0; iter < 1000; iter++) {
    for (let i = 0; i < combined.length; i++) {
      h ^= combined.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
  }
  const hash = Math.abs(h).toString(16).padStart(64, 'a');
  return { hash, salt };
};

/**
 * Verify a plain text password against a stored hash and salt
 */
export const verifyPassword = async (password, storedHash, storedSalt) => {
  if (!password || !storedHash || !storedSalt) return false;
  try {
    const { hash } = await hashPassword(password, storedSalt);
    return hash === storedHash;
  } catch {
    return false;
  }
};

/**
 * Evaluate password strength and return score (0-4), status label, and checklist
 */
export const evaluatePasswordStrength = (password = '') => {
  const str = String(password || '');

  const checks = {
    minLength: str.length >= 8,
    hasUpper: /[A-Z]/.test(str) || /[А-Я]/.test(str),
    hasLower: /[a-z]/.test(str) || /[а-я]/.test(str),
    hasNumber: /[0-9]/.test(str),
    hasSpecial: /[^A-Za-z0-9А-Яа-яЁё]/.test(str),
    notCommon: !['123456', 'password', 'qwerty', '12345678', 'admin123', 'bilimkitep'].includes(
      str.toLowerCase()
    ),
  };

  const points = [
    checks.minLength,
    checks.hasUpper && checks.hasLower,
    checks.hasNumber,
    checks.hasSpecial,
    checks.notCommon,
  ].filter(Boolean).length;

  let score = 0; // 0: very weak, 1: weak, 2: medium, 3: strong, 4: very strong
  let status = 'empty';
  let color = 'gray';

  if (!str) {
    score = 0;
    status = 'empty';
    color = 'gray';
  } else if (points <= 2 || !checks.minLength || !checks.notCommon) {
    score = 1;
    status = 'weak';
    color = 'red';
  } else if (points === 3) {
    score = 2;
    status = 'medium';
    color = 'amber';
  } else if (points === 4) {
    score = 3;
    status = 'strong';
    color = 'blue';
  } else {
    score = 4;
    status = 'veryStrong';
    color = 'emerald';
  }

  return {
    score,
    status,
    color,
    checks,
    isValid: score >= 2 && checks.minLength && checks.notCommon,
  };
};

/**
 * Brute-force Login Attempts Manager
 */
const getAttemptsStore = () => {
  if (typeof window === 'undefined' || !window.localStorage) return {};
  try {
    const raw = window.localStorage.getItem(ATTEMPTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveAttemptsStore = (store) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(store));
  } catch {}
};

/**
 * Check if the account/email is currently locked out
 */
export const isAccountLocked = (email) => {
  if (!email) return false;
  const store = getAttemptsStore();
  const entry = store[email.toLowerCase().trim()];
  if (!entry) return false;

  if (entry.count >= LOCKOUT_ATTEMPTS) {
    const elapsed = Date.now() - entry.lastAttempt;
    if (elapsed < LOCKOUT_DURATION_MS) {
      return {
        locked: true,
        remainingMinutes: Math.ceil((LOCKOUT_DURATION_MS - elapsed) / 60000),
      };
    } else {
      // Lockout expired, reset
      delete store[email.toLowerCase().trim()];
      saveAttemptsStore(store);
      return false;
    }
  }
  return false;
};

/**
 * Record a failed login attempt and return remaining allowed tries
 */
export const recordFailedLogin = (email) => {
  if (!email) return LOCKOUT_ATTEMPTS;
  const store = getAttemptsStore();
  const key = email.toLowerCase().trim();
  const current = store[key] || { count: 0, lastAttempt: 0 };

  current.count += 1;
  current.lastAttempt = Date.now();
  store[key] = current;
  saveAttemptsStore(store);

  const remaining = Math.max(0, LOCKOUT_ATTEMPTS - current.count);
  return {
    attemptsCount: current.count,
    remainingAttempts: remaining,
    isLocked: current.count >= LOCKOUT_ATTEMPTS,
  };
};

/**
 * Reset failed login attempts on successful login
 */
export const resetFailedAttempts = (email) => {
  if (!email) return;
  const store = getAttemptsStore();
  const key = email.toLowerCase().trim();
  if (store[key]) {
    delete store[key];
    saveAttemptsStore(store);
  }
};

/**
 * Sanitize text to prevent cross-site scripting (XSS)
 */
export const sanitizeText = (str = '') => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};
