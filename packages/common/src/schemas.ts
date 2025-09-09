import { z } from 'zod';

export const registerPatientSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dateOfBirth: z.string(),
  gender: z.enum(['male', 'female', 'other']),
  phone: z.string().min(8),
  email: z.string().email().optional(),
  address: z.string().optional(),
});

export const createAppointmentSchema = z.object({
  patientId: z.string().uuid(),
  doctorId: z.string().uuid(),
  scheduledAt: z.string(),
  reason: z.string().optional(),
});

export type RegisterPatientInput = z.infer<typeof registerPatientSchema>;
export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
