export type UserRole = 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'billing' | 'accountant' | 'analyst' | 'patient';

export interface JwtUser {
  userId: string;
  roles: UserRole[];
  tenantId: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginationQuery {
  limit?: number;
  offset?: number;
}

export interface ServiceConfig {
  port: number;
  serviceName: string;
}
