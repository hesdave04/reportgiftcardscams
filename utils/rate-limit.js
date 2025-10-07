// Naive in-memory IP rate limiter (OK for MVP; use Redis for production)
const counters = new Map();

export default function rateLimit({ window = 60, limit = 20 } = {}) {
  return {
    check: async (key) => {
      const now = Date.now();
      const data = counters.get(key) || { count: 0, resetAt: now + window * 1000 };
      if (now > data.resetAt) { data.count = 0; data.resetAt = now + window * 1000; }
      data.count += 1;
      counters.set(key, data);
      return { ok: data.count <= limit, remaining: Math.max(0, limit - data.count), resetAt: data.resetAt };
    }
  };
}
