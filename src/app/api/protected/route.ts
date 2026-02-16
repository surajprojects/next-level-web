import { hasAccess } from "@/lib/rbac";
import { headers } from "next/headers";
import { Role } from "@/db/generated/prisma/enums";

export async function GET() {
  const userRole = (await headers()).get("role");

  if (!userRole) return Response.json({ message: "Go to homepage!!!" });

  if (!hasAccess(userRole.toUpperCase() as Role, ["ADMIN"])) {
    return Response.json({ message: "Forbidden!!!" }, { status: 403 });
  }

  return Response.json({ message: "Secret admin data!!!" });
}
