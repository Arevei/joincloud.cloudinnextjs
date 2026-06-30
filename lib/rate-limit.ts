// Simple in-memory rate limiter for form submissions
// For production, consider using Redis or Upstash for distributed rate limiting

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// Rate limit configuration per endpoint
const rateLimits: Record<string, { windowMs: number; maxRequests: number }> = {
  waitlist: { windowMs: 60 * 1000, maxRequests: 3 }, // 3 requests per minute
  feedback: { windowMs: 60 * 1000, maxRequests: 5 }, // 5 requests per minute
};

// In-memory store for rate limiting
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;

function cleanupOldEntries() {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Start cleanup interval
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupOldEntries, CLEANUP_INTERVAL);
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (usually email or IP)
 * @param endpoint - The endpoint being accessed ('waitlist' or 'feedback')
 */
export function checkRateLimit(identifier: string, endpoint: keyof typeof rateLimits): RateLimitResult {
  const config = rateLimits[endpoint];
  const key = `${endpoint}:${identifier}`;
  const now = Date.now();

  let entry = rateLimitStore.get(key);

  // If no entry or entry has expired, create new one
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    rateLimitStore.set(key, entry);
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetTime: entry.resetTime,
    };
  }

  // Increment count
  entry.count++;

  // Check if limit exceeded
  if (entry.count > config.maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
      retryAfter: Math.ceil((entry.resetTime - now) / 1000),
    };
  }

  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Get rate limit headers for response
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    "X-RateLimit-Limit": String(rateLimits.waitlist.maxRequests), // Using waitlist as reference
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetTime / 1000)),
    ...(result.retryAfter ? { "Retry-After": String(result.retryAfter) } : {}),
  };
}