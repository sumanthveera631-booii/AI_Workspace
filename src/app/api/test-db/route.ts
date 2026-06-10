import { NextResponse } from "next/server";
import { applyCors, attachCorsHeaders } from "@/lib/cors";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const preflight = applyCors(request);
  if (preflight) return preflight;

  const users = await db.user.findMany();

  return attachCorsHeaders(
    NextResponse.json({
      success: true,
      users,
    })
  );
}
