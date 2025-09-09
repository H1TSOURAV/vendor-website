import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { authenticateJwt, requireRoles, ApiResponse } from '@cms/common';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

const PORT = Number(process.env.PORT || 4005);

type Suggestion = {
  diseases: string[];
  tests: string[];
  medicines: string[];
};

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/ai-prescription/suggest', authenticateJwt(), requireRoles(['doctor']), (req, res) => {
  const { symptoms } = req.body as { symptoms: string };
  const base: Suggestion = {
    diseases: ['Common Cold', 'Flu'],
    tests: ['CBC', 'CRP'],
    medicines: ['Paracetamol', 'Cetirizine'],
  };
  const result = symptoms?.toLowerCase().includes('fever')
    ? { ...base, diseases: ['Fever', ...base.diseases] }
    : base;
  return res.json({ success: true, data: result } satisfies ApiResponse<Suggestion>);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`AI Prescription service listening on :${PORT}`);
});
