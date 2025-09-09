import { UserRole } from './types';

export const roleHierarchy: Record<UserRole, number> = {
  admin: 100,
  doctor: 80,
  nurse: 60,
  receptionist: 50,
  billing: 50,
  accountant: 70,
  analyst: 40,
  patient: 10,
};

export function hasRequiredRole(userRoles: UserRole[], allowedRoles: UserRole[]): boolean {
  return userRoles.some((role) => allowedRoles.includes(role));
}
