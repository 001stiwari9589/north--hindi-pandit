/**
 * Security & Anti-Spam Utility for North Hindi Pandit
 * Protects Booking & Consultation Forms from Bots, Spammers & Promo Marketers
 */

const SPAM_KEYWORDS = [
  'justdial',
  'just dial',
  'register',
  'registar',
  'karva lo',
  'website',
  'web site',
  'add str',
  'marketing',
  'promote',
  'promotion',
  'seo',
  'google ad',
  'google ads',
  'loan',
  'finance',
  'crypto',
  'bitcoin',
  'telegram',
  'follow',
  'followers',
  'instagram',
  'facebook',
  'click here',
  'free recharge',
  'casino',
  'betting',
  'satta',
  'backlink',
  'whatsapp group',
  'agency',
  'subscribers',
  'earning',
  'part time job',
  'work from home',
  'investment',
  'trading',
  'escort',
  'call girl',
  'dating',
  'http://',
  'https://',
  'www.'
];

// Block our own phone numbers from being submitted as devotee phone (prevents loopbacks / self-spam)
const RESERVED_PHONES = [
  '9183089880',
  '7772035222'
];

// Obvious dummy phone patterns
const DUMMY_PHONE_PATTERNS = [
  '1234567890',
  '0123456789',
  '9876543210',
  '0000000000',
  '1111111111',
  '2222222222',
  '3333333333',
  '4444444444',
  '5555555555',
  '6666666666',
  '7777777777',
  '8888888888',
  '9999999999'
];

/**
 * Validates a devotee name
 * Returns { valid: boolean, message: string }
 */
export function validateDevoteeName(rawName) {
  if (!rawName || typeof rawName !== 'string') {
    return { valid: false, message: 'Please enter your full name (Kripya apna shuddh naam darj karein).' };
  }

  const trimmed = rawName.trim();

  // Length constraint: Names are between 2 and 40 characters
  if (trimmed.length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters long.' };
  }
  if (trimmed.length > 40) {
    return { valid: false, message: 'Name cannot exceed 40 characters. Please enter only your name.' };
  }

  // Reject digits
  if (/\d/.test(trimmed)) {
    return { valid: false, message: 'Name cannot contain numbers. Only letters are allowed.' };
  }

  // Reject URLs or symbols
  if (/[<>{}[\]\\/@#$%^&*_=+|~`]/.test(trimmed)) {
    return { valid: false, message: 'Name cannot contain special symbols or code.' };
  }

  // Only letters (English + Devanagari Hindi), space, dot, apostrophe
  const nameRegex = /^[a-zA-Z\u0900-\u097F\s'.]{2,40}$/;
  if (!nameRegex.test(trimmed)) {
    return { valid: false, message: 'Please enter a valid devotee name (English or Hindi letters only).' };
  }

  // Word count constraint: Real names have 1 to 4 words (e.g., "Dr. Ramesh Kumar Sharma").
  // 5+ words is an indicator of sentence / promotional copy (e.g. "just dail ke register karva lo web site")
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length > 4) {
    return { valid: false, message: 'Please enter only your first and last name, not a full message or sentence.' };
  }

  // Check against known spam keywords
  const lower = trimmed.toLowerCase();
  for (const spam of SPAM_KEYWORDS) {
    if (lower.includes(spam)) {
      return { valid: false, message: 'Invalid name detected. Promotional or marketing text is not allowed.' };
    }
  }

  return { valid: true, sanitized: trimmed };
}

/**
 * Validates an Indian mobile phone number
 * Returns { valid: boolean, message: string, cleanPhone?: string }
 */
export function validateDevoteePhone(rawPhone) {
  if (!rawPhone || typeof rawPhone !== 'string') {
    return { valid: false, message: 'Please enter a 10-digit mobile number.' };
  }

  const cleanPhone = rawPhone.replace(/\D/g, '');

  if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    return { valid: false, message: 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.' };
  }

  if (DUMMY_PHONE_PATTERNS.includes(cleanPhone)) {
    return { valid: false, message: 'Please enter your genuine 10-digit contact number.' };
  }

  // Check repeating digits (e.g. 9999999999)
  if (/^(\d)\1{9}$/.test(cleanPhone)) {
    return { valid: false, message: 'Please enter a valid mobile number.' };
  }

  // Check if Pandit Ji's own number was entered
  if (RESERVED_PHONES.includes(cleanPhone)) {
    return { valid: false, message: 'Please enter your own contact number, not the temple helpline number.' };
  }

  return { valid: true, cleanPhone };
}

/**
 * Checks if a honeypot field was filled by a spam bot
 */
export function isHoneypotTriggered(body) {
  if (!body || typeof body !== 'object') return false;
  // If any honeypot trap field has content, it is a bot
  if (body.brij_hp_check && body.brij_hp_check.trim() !== '') return true;
  if (body.hp_check && body.hp_check.trim() !== '') return true;
  if (body.website_trap && body.website_trap.trim() !== '') return true;
  return false;
}

// In-Memory Rate Limiting (Tracks submissions per IP and per Phone)
const submissionTracker = new Map();

/**
 * Rate Limiter for IP (Very generous so multiple users on Jio/Airtel/Wi-Fi never get blocked)
 * Allows up to 30 submissions per 5 minutes per IP
 */
export function isRateLimited(identifier, maxSubmissions = 30, windowMs = 5 * 60 * 1000) {
  if (!identifier || identifier === 'unknown') return false;
  const now = Date.now();

  const history = submissionTracker.get(identifier) || [];
  const recent = history.filter((time) => now - time < windowMs);

  if (recent.length >= maxSubmissions) {
    return true;
  }

  recent.push(now);
  submissionTracker.set(identifier, recent);

  // Auto clean-up map if too large
  if (submissionTracker.size > 2000) {
    for (const [key, times] of submissionTracker.entries()) {
      if (times.every((t) => now - t >= windowMs)) {
        submissionTracker.delete(key);
      }
    }
  }

  return false;
}

/**
 * Rate Limiter for a specific Phone Number (Prevents rapid double clicking / script spamming)
 * Allows up to 3 submissions per 3 minutes for the same phone number
 */
export function isPhoneRateLimited(phone, maxSubmissions = 3, windowMs = 3 * 60 * 1000) {
  if (!phone) return false;
  return isRateLimited(`phone_${phone}`, maxSubmissions, windowMs);
}
