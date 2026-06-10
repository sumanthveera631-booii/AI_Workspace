import { NextResponse } from "next/server";
import { applyCors, attachCorsHeaders } from "@/lib/cors";

import bcrypt from "bcrypt";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  const preflight = applyCors(req);
  if (preflight) return preflight;

  try {
    const body = await req.json();

    const {
      email,
      password,
      name,
    } = body;

    if (!email || !password || !name) {
      return attachCorsHeaders(
        NextResponse.json(
          {
            error: "Missing fields",
          },
          {
            status: 400,
          }
        )
      );
    }

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return attachCorsHeaders(
        NextResponse.json(
          {
            error: "User already exists",
          },
          {
            status: 400,
          }
        )
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return attachCorsHeaders(NextResponse.json(user));
  } catch (error) {
    console.log(error);

    return attachCorsHeaders(
      NextResponse.json(
        {
          error: "Something went wrong",
        },
        {
          status: 500,
        }
      )
    );
  }
}