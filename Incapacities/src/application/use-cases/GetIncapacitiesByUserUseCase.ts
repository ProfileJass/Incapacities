import { Incapacity } from '@domain/entities/Incapacity';
import { IncapacityRepository } from '@domain/repositories/IncapacityRepository';

export class GetIncapacitiesByUserUseCase {
  constructor(private readonly incapacityRepository: IncapacityRepository) {}

  async execute(userId: string): Promise<Incapacity[]> {
    try {
      if (!userId || userId.trim().length === 0) {
        throw new Error('User ID is required');
      }

      return await this.incapacityRepository.findByUserId(userId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to retrieve user incapacities: ${error.message}`);
      }
      throw new Error('Failed to retrieve user incapacities: Unknown error');
    }
  }
}
