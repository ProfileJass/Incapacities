import { IncapacityType } from '../../domain/incapacity.entity';

export interface CreateIncapacityRequest {
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

export interface UpdateIncapacityRequest {
  start_date?: string;
  end_date?: string;
  type?: IncapacityType;
  status?: string;
  observacion?: string;
}
