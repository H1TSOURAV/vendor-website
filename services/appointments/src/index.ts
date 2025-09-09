import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { authenticateJwt, requireRoles, createAppointmentSchema, ApiResponse } from '@cms/common';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

const PORT = Number(process.env.PORT || 4003);

type Appointment = {
  id: string;
  patientId: string;
  doctorId: string;
  scheduledAt: string;
  reason?: string;
};
const appointments = new Map<string, Appointment>();

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/appointments', authenticateJwt(), requireRoles(['admin', 'doctor', 'receptionist']), (req, res) => {
  const parsed = createAppointmentSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ success: false, error: parsed.error.message } satisfies ApiResponse<null>);
  const id = crypto.randomUUID();
  const appt: Appointment = { id, ...parsed.data };
  appointments.set(id, appt);
  return res.status(201).json({ success: true, data: appt } satisfies ApiResponse<Appointment>);
});

app.get('/appointments/:id', authenticateJwt(), requireRoles(['admin', 'doctor', 'nurse', 'receptionist']), (req, res) => {
  const a = appointments.get(req.params.id);
  if (!a) return res.status(404).json({ success: false, error: 'Not found' } satisfies ApiResponse<null>);
  return res.json({ success: true, data: a } satisfies ApiResponse<Appointment>);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Appointments service listening on :${PORT}`);
});
