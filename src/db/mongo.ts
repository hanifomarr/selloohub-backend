import mongoose from 'mongoose';
import config from '@/config';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    if (config.NODE_ENV === 'production') {
      process.exit(1); // Exit the process in production on error
    }
  }
};

export default connectToMongoDB;
