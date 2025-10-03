import { AppDataSource } from '@/data-source';

async function connectToMySQL() {
  try {
    await AppDataSource.initialize()
    console.log('MySQL connected');
  } catch (error) {
    console.error('MySQL connection error:', error);
    throw error;
  }
}

export default connectToMySQL;
