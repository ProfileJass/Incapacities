import { z } from 'zod';
import { IncapacityType, IncapacityStatus } from '@domain/value-objects/IncapacityEnums';

export const CreateIncapacitySchema = z.object({
  user: z.object({
    firstName: z.string().min(1, 'First name is required').max(100),
    lastName: z.string().min(1, 'Last name is required').max(100),
    email: z.string().email('Invalid email format'),
    role: z.string().min(1, 'Role is required').max(50),
  }),
  payroll: z.object({
    nameCompany: z.string().min(1, 'Company name is required').max(200),
    NIT: z.string().min(1, 'NIT is required').max(50),
    adressCompany: z.string().min(1, 'Address is required').max(300),
    phone: z.string().min(1, 'Phone is required').max(20),
  }),
  incapacity: z.object({
    start_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid start date format',
    }),
    end_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid end date format',
    }),
    type: z.nativeEnum(IncapacityType, {
      errorMap: () => ({ message: 'Type must be accidente, maternidad, or enfermedad' }),
    }),
    observacion: z.string().optional(),
  }),
});

export const UpdateIncapacitySchema = z.object({
  start_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid start date format',
  }).optional(),
  end_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid end date format',
  }).optional(),
  type: z.nativeEnum(IncapacityType, {
    errorMap: () => ({ message: 'Type must be accidente, maternidad, or enfermedad' }),
  }).optional(),
  status: z.nativeEnum(IncapacityStatus, {
    errorMap: () => ({ message: 'Status must be pendiente, en trámite, confirmada, or negada' }),
  }).optional(),
  observacion: z.string().optional(),
});

export const UUIDSchema = z.string().uuid('Invalid UUID format');
