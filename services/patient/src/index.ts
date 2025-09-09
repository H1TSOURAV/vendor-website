import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { authenticateJwt, requireRoles, registerPatientSchema, ApiResponse } from '@cms/common';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

const PORT = Number(process.env.PORT || 4002);

type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email?: string;
  address?: string;
};

const patients = new Map<string, Patient>();

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/patients', authenticateJwt(), requireRoles(['admin', 'receptionist', 'doctor']), (req, res) => {
  const parsed = registerPatientSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, error: parsed.error.message } satisfies ApiResponse<null>);
  }
  const id = crypto.randomUUID();
  const patient: Patient = { id, ...parsed.data };
  patients.set(id, patient);
  return res.status(201).json({ success: true, data: patient } satisfies ApiResponse<Patient>);
});

app.get('/patients/:id', authenticateJwt(), requireRoles(['admin', 'doctor', 'nurse', 'receptionist']), (req, res) => {
  const p = patients.get(req.params.id);
  if (!p) return res.status(404).json({ success: false, error: 'Not found' } satisfies ApiResponse<null>);
  return res.json({ success: true, data: p } satisfies ApiResponse<Patient>);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Patient service listening on :${PORT}`);
});
