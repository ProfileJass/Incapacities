import { Incapacity, IncapacityType, IncapacityStatus } from '../domain/incapacity.entity';
import { IncapacityRepositoryInterface } from '../domain/ports/incapacity.repository.interface';
import { CreateIncapacityRequest, UpdateIncapacityRequest } from './dto/incapacity.request';
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from '../domain/model/user.model';
import { CompanyModel } from '../domain/model/company.model';
import { PayrollModel } from '../domain/model/payroll.model';

export class IncapacityService {
  constructor(private readonly incapacityRepository: IncapacityRepositoryInterface) {}

  async createIncapacity(dto: CreateIncapacityRequest): Promise<Incapacity> {
    try {
      const userId = uuidv4();
      await UserModel.upsert({
        id_user: userId,
        firstName: dto.user.firstName,
        lastName: dto.user.lastName,
        email: dto.user.email,
        role: dto.user.role,
      });

      const companyId = uuidv4();
      await CompanyModel.upsert({
        id_company: companyId,
        nameCompany: dto.payroll.nameCompany,
        NIT: dto.payroll.NIT,
        adressCompany: dto.payroll.adressCompany,
        phone: dto.payroll.phone,
      });

      const payrollId = uuidv4();
      await PayrollModel.upsert({
        id_payroll: payrollId,
        id_user: userId,
        id_company: companyId,
        status: 'active',
      });

      const incapacityId = uuidv4();
      const startDate = new Date(dto.incapacity.start_date);
      const endDate = new Date(dto.incapacity.end_date);

      const incapacity = new Incapacity(
        incapacityId,
        userId,
        payrollId,
        startDate,
        endDate,
        dto.incapacity.type,
        IncapacityStatus.PENDIENTE,
        dto.incapacity.observacion
      );

      return await this.incapacityRepository.create(incapacity);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create incapacity: ${error.message}`);
      }
      throw new Error('Failed to create incapacity: Unknown error');
    }
  }

  async getAllIncapacities(): Promise<Incapacity[]> {
    try {
      return await this.incapacityRepository.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to retrieve incapacities: ${error.message}`);
      }
      throw new Error('Failed to retrieve incapacities: Unknown error');
    }
  }

  async getIncapacitiesByUser(userId: string): Promise<Incapacity[]> {
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

  async updateIncapacity(id: string, dto: UpdateIncapacityRequest): Promise<Incapacity> {
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
        const statusValue = dto.status as IncapacityStatus;
        if (!Object.values(IncapacityStatus).includes(statusValue)) {
          throw new Error('Invalid incapacity status');
        }
        updateData.status = statusValue;
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
