import { Incapacity } from '@domain/entities/Incapacity';
import { User } from '@domain/value-objects/User';
import { Payroll } from '@domain/value-objects/Payroll';
import { IncapacityType, IncapacityStatus } from '@domain/value-objects/IncapacityEnums';
import { IncapacityRepository } from '@domain/repositories/IncapacityRepository';
import { UserPayrollService } from '@infrastructure/services/UserPayrollService';
import { v4 as uuidv4 } from 'uuid';

export interface CreateIncapacityDTO {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  payroll: {
    nameCompany: string;
    NIT: string;
    adressCompany: string;
    phone: string;
  };
  incapacity: {
    start_date: string;
    end_date: string;
    type: IncapacityType;
    observacion?: string;
  };
}

export class CreateIncapacityUseCase {
  constructor(private readonly incapacityRepository: IncapacityRepository) {}

  async execute(dto: CreateIncapacityDTO): Promise<Incapacity> {
    try {
      const userId = uuidv4();
      const user = new User(
        userId,
        dto.user.firstName,
        dto.user.lastName,
        dto.user.email,
        dto.user.role
      );

      const companyId = uuidv4();
      const payrollId = uuidv4();
      const payroll = new Payroll(
        payrollId,
        companyId,
        dto.payroll.nameCompany,
        dto.payroll.NIT,
        dto.payroll.adressCompany,
        dto.payroll.phone
      );

      const incapacityId = uuidv4();
      const startDate = new Date(dto.incapacity.start_date);
      const endDate = new Date(dto.incapacity.end_date);

      await UserPayrollService.createOrUpdateUser(user);
      await UserPayrollService.createOrUpdateCompanyAndPayroll(payroll, user.id_user);

      const incapacity = new Incapacity(
        incapacityId,
        user.id_user,
        payroll.id_payroll,
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
}
