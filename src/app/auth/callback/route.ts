import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  const error = searchParams.get("error");
  const errorCode = searchParams.get("error_code");
  const errorDescription = searchParams.get("error_description");

  // Check for OAuth errors from provider
  if (error || errorCode) {
    const params = new URLSearchParams({
      ...(error && { error }),
      ...(errorCode && { error_code: errorCode }),
      ...(errorDescription && { error_description: errorDescription }),
    });
    return NextResponse.redirect(`${origin}/auth/auth-code-error?${params}`);
  }

  if (code) {
    const supabase = await createClient();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (!exchangeError) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    } else {
      // Handle code exchange errors
      const params = new URLSearchParams({
        error_code: "exchange_failed",
        error_description: exchangeError.message || "Failed to complete authentication",
      });
      return NextResponse.redirect(`${origin}/auth/auth-code-error?${params}`);
    }
  }

  // No code and no explicit error - generic auth error
  return NextResponse.redirect(`${origin}/auth/auth-code-error?error_code=invalid_request`);
}
