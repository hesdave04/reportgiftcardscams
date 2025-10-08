// scripts/upload-batch.js
// Usage: node scripts/upload-batch.js path/to/cards.json
// JSON format: [{ gift_card_brand, retailer, cardNumber, amount, purchase_city, purchase_state, purchase_date, notes, fraud_phone, fraud_email, fraud_social }, ...]

import fs from 'node:fs';
import fetch from 'node-fetch';

const ADMIN_BULK_KEY = process.env.ADMIN_BULK_KEY;
const BASE = process.env.BASE_URL || 'https://YOUR_DEPLOYMENT.vercel.app';

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error('Provide a path to JSON file');
    process.exit(1);
  }
  const items = JSON.parse(fs.readFileSync(file, 'utf-8'));
  const res = await fetch(`${BASE}/api/admin/bulk`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-bulk-key': ADMIN_BULK_KEY
    },
    body: JSON.stringify({ items })
  });
  const out = await res.json();
  console.log(res.status, out);
}

main().catch(e => { console.error(e); process.exit(1); });
