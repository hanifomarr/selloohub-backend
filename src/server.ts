/**
 * Node modules
 */
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
/**
 * Custom modules
 */
import config from '@/config';
import limiter from '@/lib/express_rate_limit';
import { CorsOptions } from 'cors';

/**
 * Server setup
 */
const app = express();

// Middleware: secure HTTP headers
app.use(helmet());

// Middleware: compress all responses
app.use(
  compression({
    threshold: 1024, // Compress responses larger than 1KB
  }),
);

// Middleware: parse cookies
app.use(cookieParser());

// Middleware: parse JSON bodies
app.use(express.json());

//enable URL-encoded request body parsing
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

// Configure CORS options
const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (
      config.NODE_ENV === 'development' ||
      !requestOrigin ||
      config.WHITELIST?.includes(requestOrigin)
    ) {
      callback(null, true);
    } else {
      console.warn(`CORS error: ${requestOrigin} is not allowed by CORS.`);
      callback(
        new Error(`CORS error: ${requestOrigin} is not allowed by CORS`),
      );
    }
  },
};

//Apply CORS middleware
app.use(cors(corsOptions));

(async () => {
  try {
    app.get('/', (req: Request, res: Response) => {
      res.send('API is running');
    });

    app.listen(config.PORT, () =>
      console.log(`Server running on port ${config.PORT}`),
    );
  } catch (error) {
    console.log('Error starting server:', error);

    if (config.NODE_ENV === 'production') {
      process.exit(1); // Exit the process in production on error
    }
  }
})();
