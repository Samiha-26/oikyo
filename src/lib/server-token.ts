import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getServerToken(): Promise<string | null> {
  try {
    const tokenRes = await auth.api.getToken({
      headers: await headers(),
    });
    return tokenRes?.token ?? null;
  } catch {
    return null;
  }
}
