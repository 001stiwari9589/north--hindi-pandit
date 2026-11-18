/**
 * Client-Side Form Validation & Anti-Spam Security
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
  'crypto',
  'bitcoin',
  'telegram',
  'followers',
  'click here',
  'free recharge',
  'casino',
  'betting',
  'backlink',
  'agency',
  'subscribers',
  'http://',
  'https://',
  'www.'
];

const RESERVED_PHONES = ['9183089880', '7772035222'];
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

export function validateDevoteeName(rawVal) {
  const trimmed = (rawVal || '').trim();
  if (!trimmed) {
    return 'Please enter your full name (Kripya apna shuddh naam darj karein).';
  }
  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters.';
  }
  if (trimmed.length > 40) {
    return 'Name is too long. Please enter only your name (max 40 letters).';
  }
  if (/\d/.test(trimmed)) {
    return 'Name cannot contain numbers. Only letters are allowed.';
  }
  if (/[<>{}[\]\\/@#$%^&*_=+|~`]/.test(trimmed)) {
    return 'Name cannot contain special symbols or links.';
  }
  // English + Hindi Devanagari letters, dot, apostrophe, space
  if (!/^[a-zA-Z\u0900-\u097F\s'.]{2,40}$/.test(trimmed)) {
    return 'Please enter a valid name (English or Hindi letters only).';
  }

  // Word count check (max 4 words)
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length > 4) {
    return 'Please enter only your first and last name, not a full sentence.';
  }

  // Spam keywords check
  const lower = trimmed.toLowerCase();
  for (const spam of SPAM_KEYWORDS) {
    if (lower.includes(spam)) {
      return 'Promotional or spam text is not allowed in name field.';
    }
  }

  return '';
}

export function validateDevoteePhone(rawVal) {
  const digits = (rawVal || '').replace(/\D/g, '');
  if (!digits) {
    return 'Please enter a 10-digit mobile number.';
  }
  if (digits.length !== 10) {
    return `Please enter a 10-digit number (${digits.length}/10 entered).`;
  }
  if (!/^[6-9]/.test(digits)) {
    return 'Mobile number must start with 6, 7, 8, or 9.';
  }
  if (DUMMY_PHONE_PATTERNS.includes(digits) || /^(\d)\1{9}$/.test(digits)) {
    return 'Please enter your genuine 10-digit mobile number.';
  }
  if (RESERVED_PHONES.includes(digits)) {
    return 'Please enter your own contact number, not the helpline number.';
  }
  return '';
}
