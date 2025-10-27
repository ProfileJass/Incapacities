import { Request, Response } from 'express';
import { CreateIncapacityUseCase } from '@application/use-cases/CreateIncapacityUseCase';
import { GetAllIncapacitiesUseCase } from '@application/use-cases/GetAllIncapacitiesUseCase';
import { GetIncapacitiesByUserUseCase } from '@application/use-cases/GetIncapacitiesByUserUseCase';
import { UpdateIncapacityUseCase } from '@application/use-cases/UpdateIncapacityUseCase';
import { asyncHandler } from '../middlewares/error.middleware';

export class IncapacityController {
  constructor(
    private readonly createIncapacityUseCase: CreateIncapacityUseCase,
    private readonly getAllIncapacitiesUseCase: GetAllIncapacitiesUseCase,
    private readonly getIncapacitiesByUserUseCase: GetIncapacitiesByUserUseCase,
    private readonly updateIncapacityUseCase: UpdateIncapacityUseCase
  ) {}

  createIncapacity = asyncHandler(async (req: Request, res: Response) => {
    const incapacity = await this.createIncapacityUseCase.execute(req.body);

    res.status(201).json({
      success: true,
      message: 'Incapacity created successfully',
      data: incapacity,
    });
  });

  getAllIncapacities = asyncHandler(async (req: Request, res: Response) => {
    const incapacities = await this.getAllIncapacitiesUseCase.execute();

    res.status(200).json({
      success: true,
      message: 'Incapacities retrieved successfully',
      data: incapacities,
      count: incapacities.length,
    });
  });

  getIncapacitiesByUser = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const incapacities = await this.getIncapacitiesByUserUseCase.execute(userId);

    res.status(200).json({
      success: true,
      message: 'User incapacities retrieved successfully',
      data: incapacities,
      count: incapacities.length,
    });
  });

  updateIncapacity = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const incapacity = await this.updateIncapacityUseCase.execute(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Incapacity updated successfully',
      data: incapacity,
    });
  });
}
