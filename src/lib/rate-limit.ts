/**
 * In-memory limiter: the counter lives in one serverless instance, so the
 * effective limit is roughly `maxRequests` times the number of warm instances.
 * Good enough next to the honeypot and the KVKK checkbox, not a hard ceiling.
 *
 * To make it exact, move the counter to shared storage: `@upstash/ratelimit`
 * with `@upstash/redis` (or Vercel KV) replacing the Map below, keyed the same
 * way on IP. That is the only change needed here; `check()` becomes async and
 * the caller in actions/contact-form.ts awaits it.
 */
class RateLimiter {
  private cache: Map<string, { count: number; resetTime: number }>;
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests = 3, windowMs = 5 * 60 * 1000) {
    this.cache = new Map();
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now > value.resetTime) {
        this.cache.delete(key);
      }
    }
  }

  check(ip: string): { allowed: boolean; retryAfter?: number } {
    this.cleanup();
    
    const now = Date.now();
    const entry = this.cache.get(ip);

    if (!entry || now > entry.resetTime) {
      this.cache.set(ip, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return { allowed: true };
    }

    if (entry.count < this.maxRequests) {
      entry.count++;
      return { allowed: true };
    }

    const retryAfterSeconds = Math.ceil((entry.resetTime - now) / 1000);
    return { allowed: false, retryAfter: retryAfterSeconds };
  }
}

export const rateLimiter = new RateLimiter();
