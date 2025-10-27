import { UserModel } from '../models/UserModel';
import { CompanyModel } from '../models/CompanyModel';
import { PayrollModel } from '../models/PayrollModel';
import { User } from '@domain/value-objects/User';
import { Payroll } from '@domain/value-objects/Payroll';

export class UserPayrollService {
  static async createOrUpdateUser(user: User): Promise<void> {
    try {
      await UserModel.upsert({
        id_user: user.id_user,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      throw new Error(`Failed to store user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async createOrUpdateCompanyAndPayroll(payroll: Payroll, userId: string): Promise<void> {
    try {
      await CompanyModel.upsert({
        id_company: payroll.id_company,
        nameCompany: payroll.nameCompany,
        NIT: payroll.NIT,
        adressCompany: payroll.adressCompany,
        phone: payroll.phone,
      });

      await PayrollModel.upsert({
        id_payroll: payroll.id_payroll,
        id_user: userId,
        id_company: payroll.id_company,
        status: 'active',
      });
    } catch (error) {
      throw new Error(`Failed to store company and payroll: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
