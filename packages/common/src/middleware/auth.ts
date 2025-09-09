import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtUser, UserRole } from '../types';

export function authenticateJwt() {
  return (req: Request & { user?: JwtUser }, res: Response, next: NextFunction) => {
    const header = req.headers['authorization'];
    if (!header) {
      return res.status(401).json({ success: false, error: 'Missing Authorization header' });
    }
    const token = header.replace('Bearer ', '');
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret') as JwtUser;
      req.user = payload;
      next();
    } catch (err) {
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }
  };
}

export function requireRoles(allowed: UserRole[]) {
  return (req: Request & { user?: JwtUser }, res: Response, next: NextFunction) => {
    const roles = req.user?.roles || [];
    const ok = roles.some((r) => allowed.includes(r));
    if (!ok) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }
    next();
  };
}
