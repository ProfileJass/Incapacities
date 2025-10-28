import app from './app';
import { connectDB } from './config/database';
import { config } from './config/config';
import process from 'process';

const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(config.port, () => {});
  } catch (error) {
    process.exit(1);
  }
};

startServer();