import sequelize from '@/config/mysql.config';
import User from '@/models/user.model';
import Store from '@/models/store.model';

// Associations
User.hasOne(Store, { foreignKey: 'userId', as: 'store' });
Store.belongsTo(User, { foreignKey: 'userId', as: 'user' });

const syncModels = async () => {
  await sequelize.sync({ alter: true }); // Use alter: true for dev
  console.log('✅ MySQL models synced');
};

export { User, Store, syncModels };
