import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/**
 * Optimistic auth check: redirect to sign-in when no session cookie is present.
 * Session is always validated on the server when loading protected data.
 */
export function proxy(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*"],
};
