import { Incapacity } from '@domain/entities/Incapacity';
import { IncapacityRepository } from '@domain/repositories/IncapacityRepository';

export class GetAllIncapacitiesUseCase {
  constructor(private readonly incapacityRepository: IncapacityRepository) {}

  async execute(): Promise<Incapacity[]> {
    try {
      return await this.incapacityRepository.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to retrieve incapacities: ${error.message}`);
      }
      throw new Error('Failed to retrieve incapacities: Unknown error');
    }
  }
}
