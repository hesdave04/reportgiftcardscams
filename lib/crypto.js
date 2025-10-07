import crypto from 'crypto';

const ALGO = 'aes-256-gcm';
const ENC_KEY = process.env.ENCRYPTION_KEY ? Buffer.from(process.env.ENCRYPTION_KEY, 'base64') : null;
const HMAC_KEY = process.env.HMAC_KEY ? Buffer.from(process.env.HMAC_KEY, 'base64') : ENC_KEY;

function mustKey(buf, label) {
  if (!buf || buf.length !== 32) throw new Error(`${label} missing or not 32 bytes (base64)`);
}

export function encrypt(text) {
  mustKey(ENC_KEY, 'ENCRYPTION_KEY');
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, ENC_KEY, iv);
  const ciphertext = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, ciphertext]).toString('base64');
}

export function decrypt(b64) {
  mustKey(ENC_KEY, 'ENCRYPTION_KEY');
  const data = Buffer.from(b64, 'base64');
  const iv = data.slice(0, 12);
  const tag = data.slice(12, 28);
  const ciphertext = data.slice(28);
  const decipher = crypto.createDecipheriv(ALGO, ENC_KEY, iv);
  decipher.setAuthTag(tag);
  const out = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return out.toString('utf8');
}

export function hmacHex(text) {
  mustKey(HMAC_KEY, 'HMAC_KEY/ENCRYPTION_KEY');
  return crypto.createHmac('sha256', HMAC_KEY).update(text).digest('hex');
}
