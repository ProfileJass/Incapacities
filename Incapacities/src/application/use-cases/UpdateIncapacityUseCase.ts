import { Incapacity } from '@domain/entities/Incapacity';
import { IncapacityType, IncapacityStatus } from '@domain/value-objects/IncapacityEnums';
import { IncapacityRepository } from '@domain/repositories/IncapacityRepository';

export interface UpdateIncapacityDTO {
  start_date?: string;
  end_date?: string;
  type?: IncapacityType;
  status?: IncapacityStatus;
  observacion?: string;
}

export class UpdateIncapacityUseCase {
  constructor(private readonly incapacityRepository: IncapacityRepository) {}

  async execute(id: string, dto: UpdateIncapacityDTO): Promise<Incapacity> {
    try {
      if (!id || id.trim().length === 0) {
        throw new Error('Incapacity ID is required');
      }

      const existingIncapacity = await this.incapacityRepository.findById(id);
      if (!existingIncapacity) {
        throw new Error('Incapacity not found');
      }

      const updateData: Record<string, any> = {};

      if (dto.start_date) {
        updateData.start_date = new Date(dto.start_date);
      }

      if (dto.end_date) {
        updateData.end_date = new Date(dto.end_date);
      }

      if (dto.type) {
        if (!Object.values(IncapacityType).includes(dto.type)) {
          throw new Error('Invalid incapacity type');
        }
        updateData.type = dto.type;
      }

      if (dto.status) {
        if (!Object.values(IncapacityStatus).includes(dto.status)) {
          throw new Error('Invalid incapacity status');
        }
        updateData.status = dto.status;
      }

      if (dto.observacion !== undefined) {
        updateData.observacion = dto.observacion;
      }

      if (updateData.start_date && updateData.end_date) {
        if (updateData.end_date < updateData.start_date) {
          throw new Error('End date must be after start date');
        }
      } else if (updateData.start_date && existingIncapacity.end_date) {
        if (existingIncapacity.end_date < updateData.start_date) {
          throw new Error('End date must be after start date');
        }
      } else if (updateData.end_date && existingIncapacity.start_date) {
        if (updateData.end_date < existingIncapacity.start_date) {
          throw new Error('End date must be after start date');
        }
      }

      const updatedIncapacity = await this.incapacityRepository.update(id, updateData);
      if (!updatedIncapacity) {
        throw new Error('Failed to update incapacity');
      }

      return updatedIncapacity;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update incapacity: ${error.message}`);
      }
      throw new Error('Failed to update incapacity: Unknown error');
    }
  }
}
