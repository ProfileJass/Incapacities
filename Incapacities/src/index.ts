import { config } from './shared/config/config';
import { connectDatabase } from './infrastructure/database/sequelize';
import { SequelizeIncapacityRepository } from './infrastructure/repositories/SequelizeIncapacityRepository';
import { CreateIncapacityUseCase } from './application/use-cases/CreateIncapacityUseCase';
import { GetAllIncapacitiesUseCase } from './application/use-cases/GetAllIncapacitiesUseCase';
import { GetIncapacitiesByUserUseCase } from './application/use-cases/GetIncapacitiesByUserUseCase';
import { UpdateIncapacityUseCase } from './application/use-cases/UpdateIncapacityUseCase';
import { IncapacityController } from './presentation/controllers/IncapacityController';
import { createApp } from './presentation/app';

const bootstrap = async () => {
  try {
    await connectDatabase();

    const incapacityRepository = new SequelizeIncapacityRepository();

    const createIncapacityUseCase = new CreateIncapacityUseCase(incapacityRepository);
    const getAllIncapacitiesUseCase = new GetAllIncapacitiesUseCase(incapacityRepository);
    const getIncapacitiesByUserUseCase = new GetIncapacitiesByUserUseCase(incapacityRepository);
    const updateIncapacityUseCase = new UpdateIncapacityUseCase(incapacityRepository);

    const incapacityController = new IncapacityController(
      createIncapacityUseCase,
      getAllIncapacitiesUseCase,
      getIncapacitiesByUserUseCase,
      updateIncapacityUseCase
    );

    const app = createApp(incapacityController);

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

bootstrap();