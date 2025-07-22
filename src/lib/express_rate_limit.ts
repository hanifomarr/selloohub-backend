/**
 * Node modules
 */
import rateLimit from 'express-rate-limit';

// Middleware: rate limiting
// This limits the number of requests from a single IP to prevent abuse
const limiter = rateLimit({
  windowMs: 60000, // 1 minute
  limit: 60, // Limit each IP to 60 requests per minute
  standardHeaders: 'draft-8', // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    error: 'Too many requests, please try again later.',
  },
});

export default limiter;
