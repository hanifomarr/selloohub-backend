/**
 * Node modules
 */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { CorsOptions } from 'cors';
/**
 * Custom modules
 */
import config from '@/config';
import limiter from '@/lib/express_rate_limit';
import connectToMongoDB from '@/db/mongo';

/**
 * Routes
 */
import connectToMySQL from './db/mysql';
import productRoutes from './routes/v1/product/product.route';

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

async function startServer() {
  try {
    // Connect to both databases
    await connectToMySQL();
    await connectToMongoDB();

    app.use('/api/v1', productRoutes);

    // Start server
    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error('Error during server startup:', error);
    if (config.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}

startServer();

const handleServerShutdown = async () => {
  try {
    console.log('Server is shutting down');
    process.exit(0);
  } catch (error) {
    console.error('Error during server shutdown:', error);
    process.exit(1); // Exit with error code if shutdown fails
  }
};

process.on('SIGTERM', handleServerShutdown);
process.on('SIGINT', handleServerShutdown);
