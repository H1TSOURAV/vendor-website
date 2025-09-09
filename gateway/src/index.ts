import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

const PORT = Number(process.env.PORT || 4000);

// Service routes - could be moved to service discovery config
const services: Record<string, string> = {
  auth: process.env.AUTH_URL || 'http://localhost:4001',
  patient: process.env.PATIENT_URL || 'http://localhost:4002',
  appointments: process.env.APPOINTMENTS_URL || 'http://localhost:4003',
  billing: process.env.BILLING_URL || 'http://localhost:4004',
  ai: process.env.AI_PRESCRIPTION_URL || 'http://localhost:4005',
  manual: process.env.MANUAL_PRESCRIPTION_URL || 'http://localhost:4006',
  accounts: process.env.ACCOUNTS_URL || 'http://localhost:4007',
  analytics: process.env.ANALYTICS_URL || 'http://localhost:4008',
};

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/auth', createProxyMiddleware({ target: services.auth, changeOrigin: true, pathRewrite: { '^/auth': '' } }));
app.use('/patients', createProxyMiddleware({ target: services.patient, changeOrigin: true }));
app.use('/appointments', createProxyMiddleware({ target: services.appointments, changeOrigin: true }));
app.use('/billing', createProxyMiddleware({ target: services.billing, changeOrigin: true }));
app.use('/ai-prescription', createProxyMiddleware({ target: services.ai, changeOrigin: true }));
app.use('/manual-prescription', createProxyMiddleware({ target: services.manual, changeOrigin: true }));
app.use('/accounts', createProxyMiddleware({ target: services.accounts, changeOrigin: true }));
app.use('/analytics', createProxyMiddleware({ target: services.analytics, changeOrigin: true }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API Gateway listening on :${PORT}`);
});
