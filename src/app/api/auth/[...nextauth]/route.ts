import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { applyCors, attachCorsHeaders } from "@/lib/cors";

const handler = NextAuth(authOptions);

export async function GET(request: Request) {
  const preflight = applyCors(request);
  if (preflight) return preflight;

  const response = await handler(request);
  return attachCorsHeaders(response);
}

export async function POST(request: Request) {
  const preflight = applyCors(request);
  if (preflight) return preflight;

  const response = await handler(request);
  return attachCorsHeaders(response);
}
