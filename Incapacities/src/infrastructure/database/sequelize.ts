import { Sequelize } from 'sequelize';
import { config } from '@shared/config/config';

export const sequelize = new Sequelize({
  host: config.database.host,
  port: config.database.port,
  database: config.database.name,
  username: config.database.user,
  password: config.database.password,
  dialect: config.database.dialect,
  logging: config.nodeEnv === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
    
    await sequelize.sync({ alter: config.nodeEnv === 'development' });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};
