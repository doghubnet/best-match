export type Role = 'user' | 'admin' | 'consultant'
export const hasAdminAccess = (role: Role) => role === 'admin'
