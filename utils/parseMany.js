// utils/parseMany.js
//
// Turns pasted lines into structured rows.
// Accepts lines like:
//  - 603488******1234, 100
//  - 489514******9988 50
//  - Target, 603488******1234, 100
//
// Delimiters supported: comma, tab, semicolon, or spaces.
// Amount can include $, commas, decimals.

export function parseMany(text) {
  const rows = [];
  const lines = String(text)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  for (const line of lines) {
    // Split on comma / semicolon / tab / multiple spaces
    const parts = line.split(/[,\t; ]+/).map((p) => p.trim()).filter(Boolean);

    let brand = null, number = null, amount = null;

    if (parts.length >= 3) {
      // treat as: brand, number, amount
      brand = parts[0];
      number = parts[1];
      amount = parts[2];
    } else if (parts.length === 2) {
      // treat as: number, amount
      number = parts[0];
      amount = parts[1];
    } else {
      rows.push({ _raw: line, _error: 'Could not parse line' });
      continue;
    }

    const normalized = String(number).replace(/[^0-9]/g, '');
    if (!/^\d{8,19}$/.test(normalized)) {
      rows.push({ brand, number: normalized, amount, _error: 'Invalid card number' });
      continue;
    }

    const amt = Number(String(amount).replace(/[^0-9.]/g, ''));
    rows.push({
      brand: brand || null,
      number: normalized,
      amount: isNaN(amt) ? null : amt
    });
  }

  return rows;
}
