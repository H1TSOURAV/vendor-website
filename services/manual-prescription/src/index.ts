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

const PORT = Number(process.env.PORT || 4006);

type PrescriptionTemplate = {
  id: string;
  name: string;
  content: string;
};
const templates = new Map<string, PrescriptionTemplate>();

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/manual-prescription/templates', authenticateJwt(), requireRoles(['doctor']), (req, res) => {
  const { name, content } = req.body as { name: string; content: string };
  const id = crypto.randomUUID();
  const tpl: PrescriptionTemplate = { id, name, content };
  templates.set(id, tpl);
  return res.status(201).json({ success: true, data: tpl } satisfies ApiResponse<PrescriptionTemplate>);
});

app.get('/manual-prescription/templates/:id', authenticateJwt(), requireRoles(['doctor', 'nurse']), (req, res) => {
  const tpl = templates.get(req.params.id);
  if (!tpl) return res.status(404).json({ success: false, error: 'Not found' } satisfies ApiResponse<null>);
  return res.json({ success: true, data: tpl } satisfies ApiResponse<PrescriptionTemplate>);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Manual Prescription service listening on :${PORT}`);
});
