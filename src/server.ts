/**
 * Node modules
 */
import express, { Request, Response } from 'express';
import cors from 'cors';

/**
 * Custom modules
 */
import config from '@/config';
import { CorsOptions } from 'cors';

/**
 * Server setup
 */
const app = express();

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

//enable JSON request body parsing
app.use(express.json());

//enable URL-encoded request body parsing
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('API is running');
});

app.listen(config.PORT, () =>
  console.log(`Server running on port ${config.PORT}`),
);
