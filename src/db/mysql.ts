import sequelize from '@/config/mysql.config';

async function connectToMySQL() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('MySQL connected');
  } catch (error) {
    console.error('MySQL connection error:', error);
    throw error;
  }
}

export default connectToMySQL;
