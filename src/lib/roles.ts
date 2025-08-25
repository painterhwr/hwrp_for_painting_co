export type AppRole = 'admin' | 'manager' | 'supervisor' | 'painter' | 'apprentice'

const MANAGE_ROLES: AppRole[] = ['admin', 'manager', 'supervisor']

export function canManageAll(role: AppRole | null): boolean {
  return !!role && MANAGE_ROLES.includes(role)
}

export function fieldOnly(role: AppRole | null): boolean {
  return !!role && !MANAGE_ROLES.includes(role)
}