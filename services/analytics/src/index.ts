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

const PORT = Number(process.env.PORT || 4008);

type KPI = { name: string; value: number };
let kpis: KPI[] = [
  { name: 'patients_today', value: 0 },
  { name: 'revenue_today', value: 0 },
  { name: 'invoices_created', value: 0 }
];

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.get('/analytics/kpis', authenticateJwt(), requireRoles(['admin', 'analyst']), (_req, res) => {
  return res.json({ success: true, data: kpis } satisfies ApiResponse<KPI[]>);
});

app.post('/analytics/kpis', authenticateJwt(), requireRoles(['admin']), (req, res) => {
  const { name, value } = req.body as KPI;
  const idx = kpis.findIndex(k => k.name === name);
  if (idx >= 0) kpis[idx] = { name, value };
  else kpis.push({ name, value });
  return res.status(201).json({ success: true, data: { name, value } } satisfies ApiResponse<KPI>);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Analytics service listening on :${PORT}`);
});
