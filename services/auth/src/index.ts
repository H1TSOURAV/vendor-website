import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ApiResponse, JwtUser } from '@cms/common';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

const PORT = Number(process.env.PORT || 4001);
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

// In-memory demo users; replace with DB in production
const users = new Map<string, { passwordHash: string; roles: JwtUser['roles']; tenantId: string }>();
const seedPassword = bcrypt.hashSync('admin123', 10);
users.set('admin@clinic.com', { passwordHash: seedPassword, roles: ['admin'], tenantId: 'tenant-default' });

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  const record = users.get(email);
  if (!record) return res.status(401).json({ success: false, error: 'Invalid credentials' } satisfies ApiResponse<null>);
  const valid = bcrypt.compareSync(password, record.passwordHash);
  if (!valid) return res.status(401).json({ success: false, error: 'Invalid credentials' } satisfies ApiResponse<null>);
  const payload: JwtUser = { userId: email, roles: record.roles, tenantId: record.tenantId };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
  return res.json({ success: true, data: { token, user: payload } } satisfies ApiResponse<{ token: string; user: JwtUser }>);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Auth service listening on :${PORT}`);
});
