import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import { createIncapacityRouter } from './routes/incapacity.routes';
import { IncapacityController } from './controllers/IncapacityController';

export const createApp = (incapacityController: IncapacityController): Application => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Service is running' });
  });

  app.use('/api/incapacities', createIncapacityRouter(incapacityController));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
