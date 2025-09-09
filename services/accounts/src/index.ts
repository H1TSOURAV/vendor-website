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

const PORT = Number(process.env.PORT || 4007);

type LedgerEntry = {
  id: string;
  type: 'revenue' | 'expense';
  amount: number;
  description?: string;
};
const ledger: LedgerEntry[] = [];

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/accounts/ledger', authenticateJwt(), requireRoles(['admin', 'accountant']), (req, res) => {
  const { type, amount, description } = req.body as LedgerEntry;
  const entry: LedgerEntry = { id: crypto.randomUUID(), type, amount, description };
  ledger.push(entry);
  return res.status(201).json({ success: true, data: entry } satisfies ApiResponse<LedgerEntry>);
});

app.get('/accounts/summary', authenticateJwt(), requireRoles(['admin', 'accountant', 'analyst']), (_req, res) => {
  const revenue = ledger.filter(l => l.type === 'revenue').reduce((s, l) => s + l.amount, 0);
  const expense = ledger.filter(l => l.type === 'expense').reduce((s, l) => s + l.amount, 0);
  const net = revenue - expense;
  return res.json({ success: true, data: { revenue, expense, net } } satisfies ApiResponse<{ revenue: number; expense: number; net: number }>);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Accounts service listening on :${PORT}`);
});
