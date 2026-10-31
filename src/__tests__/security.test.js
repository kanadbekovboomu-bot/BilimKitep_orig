import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateSalt,
  hashPassword,
  verifyPassword,
  evaluatePasswordStrength,
  isAccountLocked,
  recordFailedLogin,
  resetFailedAttempts,
  sanitizeText,
} from '../utils/security';

describe('Security and Cryptography Engine', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Password Hashing & Verification', () => {
    it('generates a valid 32-character hexadecimal salt', () => {
      const salt = generateSalt();
      expect(salt).toBeDefined();
      expect(typeof salt).toBe('string');
      expect(salt.length).toBe(32);
      expect(/^[0-9a-f]+$/i.test(salt)).toBe(true);
    });

    it('hashes password with salt deterministically', async () => {
      const password = 'SuperSecret#2026';
      const salt = generateSalt();

      const { hash: hash1 } = await hashPassword(password, salt);
      const { hash: hash2 } = await hashPassword(password, salt);

      expect(hash1).toBeDefined();
      expect(hash1).toBe(hash2);
      expect(hash1.length).toBeGreaterThanOrEqual(32);
    });

    it('produces different hashes for different passwords with same salt', async () => {
      const salt = generateSalt();
      const { hash: hash1 } = await hashPassword('Password123!', salt);
      const { hash: hash2 } = await hashPassword('Password456!', salt);

      expect(hash1).not.toBe(hash2);
    });

    it('verifies correct password and rejects invalid password', async () => {
      const password = 'Kitep#Secure2026';
      const { hash, salt } = await hashPassword(password);

      const isValid = await verifyPassword(password, hash, salt);
      expect(isValid).toBe(true);

      const isInvalid = await verifyPassword('WrongPassword#123', hash, salt);
      expect(isInvalid).toBe(false);
    });
  });

  describe('Password Strength Evaluation', () => {
    it('detects very weak or common passwords', () => {
      const res = evaluatePasswordStrength('123456');
      expect(res.score).toBeLessThanOrEqual(1);
      expect(res.status).toBe('weak');
      expect(res.isValid).toBe(false);
    });

    it('evaluates strong passwords with mixed case, numbers and symbols', () => {
      const res = evaluatePasswordStrength('BilimKitep#2026!');
      expect(res.score).toBeGreaterThanOrEqual(3);
      expect(res.isValid).toBe(true);
      expect(res.checks.minLength).toBe(true);
      expect(res.checks.hasUpper).toBe(true);
      expect(res.checks.hasNumber).toBe(true);
      expect(res.checks.hasSpecial).toBe(true);
    });
  });

  describe('Brute-Force Rate Limiting (Account Lockout)', () => {
    const email = 'user.test@bilimkitep.kg';

    it('starts unlocked and counts failed attempts down from 5', () => {
      expect(isAccountLocked(email)).toBe(false);

      const res1 = recordFailedLogin(email);
      expect(res1.attemptsCount).toBe(1);
      expect(res1.remainingAttempts).toBe(4);
      expect(res1.isLocked).toBe(false);

      recordFailedLogin(email);
      recordFailedLogin(email);
      recordFailedLogin(email);
      const res5 = recordFailedLogin(email);

      expect(res5.attemptsCount).toBe(5);
      expect(res5.remainingAttempts).toBe(0);
      expect(res5.isLocked).toBe(true);

      const lockStatus = isAccountLocked(email);
      expect(lockStatus.locked).toBe(true);
      expect(lockStatus.remainingMinutes).toBeGreaterThan(0);
    });

    it('resets attempts upon successful login', () => {
      recordFailedLogin(email);
      recordFailedLogin(email);

      resetFailedAttempts(email);
      expect(isAccountLocked(email)).toBe(false);
    });
  });

  describe('XSS Text Sanitization', () => {
    it('escapes dangerous HTML/script tags', () => {
      const malicious = '<script>alert("hacked")</script>';
      const sanitized = sanitizeText(malicious);
      expect(sanitized).toBe('&lt;script&gt;alert(&quot;hacked&quot;)&lt;&#x2F;script&gt;');
    });

    it('handles normal safe text gracefully', () => {
      const safe = 'Айбек Нурланов +996 700 123 456';
      expect(sanitizeText(safe)).toBe(safe);
    });
  });
});
