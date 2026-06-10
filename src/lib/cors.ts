import { NextResponse } from "next/server";

const allowedOrigin =
  process.env.NEXT_PUBLIC_FRONTEND_URL ||
  process.env.NEXTAUTH_URL ||
  "http://localhost:3000";

const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  "Access-Control-Allow-Headers":
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
};

export function applyCors(request: Request) {
  if (request.method === "OPTIONS") {
    return NextResponse.json(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  return null;
}

export function attachCorsHeaders<T extends Response>(response: T): T {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value as string);
  });
  return response;
}
