import { cookies } from "next/headers";
import { sessionCookie, verifySessionToken } from "./auth";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookie.name)?.value;
  if (!token) return null;
  try {
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

export async function requireRole(role: "admin" | "staff") {
  const session = await getSession();
  if (!session) {
    return { ok: false, status: 401 as const };
  }
  if (role === "admin" && session.role !== "admin") {
    return { ok: false, status: 403 as const };
  }
  return { ok: true, session };
}
