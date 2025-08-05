import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/config/mysql.config';

interface StoreAttributes {
  id: number;
  name: string;
  slug: string;
  userId: number;
}

interface StoreCreationAttributes extends Optional<StoreAttributes, 'id'> {}

class Store
  extends Model<StoreAttributes, StoreCreationAttributes>
  implements StoreAttributes
{
  public id!: number;
  public name!: string;
  public slug!: string;
  public userId!: number;
}

Store.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Store',
    tableName: 'stores',
    timestamps: true,
  },
);

export default Store;
