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

const PORT = Number(process.env.PORT || 4004);

type Invoice = {
  id: string;
  patientId: string;
  amount: number;
  gst: number;
  total: number;
  status: 'unpaid' | 'paid';
  paymentMode?: 'cash' | 'card' | 'upi' | 'insurance';
};
const invoices = new Map<string, Invoice>();

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/billing/invoices', authenticateJwt(), requireRoles(['admin', 'billing', 'receptionist']), (req, res) => {
  const { patientId, amount, gst, paymentMode } = req.body as {
    patientId: string; amount: number; gst: number; paymentMode?: Invoice['paymentMode']
  };
  const id = crypto.randomUUID();
  const total = amount + gst;
  const inv: Invoice = { id, patientId, amount, gst, total, status: 'unpaid', paymentMode };
  invoices.set(id, inv);
  return res.status(201).json({ success: true, data: inv } satisfies ApiResponse<Invoice>);
});

app.get('/billing/invoices/:id', authenticateJwt(), requireRoles(['admin', 'billing']), (req, res) => {
  const inv = invoices.get(req.params.id);
  if (!inv) return res.status(404).json({ success: false, error: 'Not found' } satisfies ApiResponse<null>);
  return res.json({ success: true, data: inv } satisfies ApiResponse<Invoice>);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Billing service listening on :${PORT}`);
});
