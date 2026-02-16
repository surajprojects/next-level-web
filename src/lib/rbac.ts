import { Role } from "@/db/generated/prisma/enums";

export function hasAccess(userRole: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(userRole);
}
