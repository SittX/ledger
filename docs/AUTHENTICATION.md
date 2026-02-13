# Authentication with Better Auth

This document describes how **Better Auth** is integrated into the Ledger project and how the end-to-end auth flow works.

---

## Overview

The project uses [Better Auth](https://www.better-auth.com/) for authentication. Better Auth is a library-agnostic auth solution that provides:

- **Email/password** sign-up and sign-in
- **Session management** with HTTP-only cookies (via the Next.js plugin)
- **Database-backed** users, sessions, and accounts using **Drizzle** and **PostgreSQL**

All auth-related tables live in the `neon_auth` PostgreSQL schema. Application tables (e.g. `accounts`, `transactions`) reference `neon_auth.user.id` (UUID).

---

## Architecture

### 1. Server: Auth instance (`lib/auth.ts`)

The single source of truth for auth configuration is `lib/auth.ts`:

| Concern | Implementation |
|--------|----------------|
| **Base URL** | `process.env.BETTER_AUTH_URL` (e.g. `http://localhost:3000`) |
| **Secret** | `process.env.BETTER_AUTH_SECRET` (used for signing/verification) |
| **Database** | Drizzle adapter with PostgreSQL (`db` from `@/database`) |
| **IDs** | UUIDs for users/sessions (`generateId: "uuid"`) |
| **Auth method** | `emailAndPassword: { enabled: true }` |
| **Next.js** | `nextCookies()` plugin for cookie-based sessions |

The Drizzle adapter is wired to the schema in `database/schema/auth.ts`:

- **Tables:** `user`, `session`, `account` (as `userAccount`), `verification`
- **Relations:** `userRelations`, `sessionRelations`, `accountRelations` (used by the adapter and by app code)

### 2. API route: Catch-all handler (`app/api/auth/[...all]/route.ts`)

Better Auth exposes its HTTP API (sign-in, sign-up, sign-out, session, etc.) through a single catch-all route:

- **File:** `app/api/auth/[...all]/route.ts`
- **Exports:** `POST` and `GET` handlers via `toNextJsHandler(auth)`

All Better Auth endpoints are therefore under `/api/auth/*` (e.g. `/api/auth/sign-in/email`, `/api/auth/session`).

### 3. Client: Auth client (`lib/auth-client.ts`)

The client is created with `createAuthClient` from `better-auth/react`:

- **Base URL:** `process.env.NEXT_PUBLIC_APP_URL` (e.g. `http://localhost:3000`)

This must match the server’s `BETTER_AUTH_URL` so that cookies and redirects work correctly. The client is used for:

- `authClient.signIn.email()`
- `authClient.signUp.email()`
- `authClient.signOut()`
- `authClient.useSession()` (React hook for current session)

---

## Database schema (auth)

Auth tables are defined in `database/schema/auth.ts` under the `neon_auth` schema.

| Table | Purpose |
|-------|--------|
| **user** | User profile: `id` (UUID), `name`, `email`, `emailVerified`, `image`, timestamps, optional `role` / `banned` fields |
| **session** | Active sessions: `token`, `userId`, `expiresAt`, optional `ipAddress` / `userAgent`; FK to `user` with cascade delete |
| **account** | OAuth/linked accounts and password hash: `providerId`, `accountId`, `userId`, tokens, `password`; FK to `user` with cascade delete |
| **verification** | Email verification / one-time codes: `identifier`, `value`, `expiresAt` |

Relations are set up so that:

- A **user** has many **sessions** and many **accounts**.
- **Session** and **account** each belong to one **user**.

Application tables (e.g. `accounts`, `transactions`) reference `user.id` from `neon_auth.user`.

---

## Auth flow

### Sign-up (email/password)

1. User submits the form on **`/sign-up`** (`app/(auth)/sign-up/page.tsx`).
2. Client calls `authClient.signUp.email({ name, email, password })`.
3. The request hits **`/api/auth/sign-up/email`** (handled by Better Auth).
4. Better Auth:
   - Creates a row in `neon_auth.user`
   - Creates a row in `neon_auth.account` (credentials stored with the configured adapter)
   - Creates a session and sets the session cookie
5. On success, the client redirects to **`/dashboard`** and calls `router.refresh()`.

### Sign-in (email/password)

1. User submits the form on **`/sign-in`** (`app/(auth)/sign-in/page.tsx`).
2. Optional `callbackUrl` is taken from the query (e.g. after redirect from a protected route).
3. Client calls `authClient.signIn.email({ email, password, callbackURL: callbackUrl })`.
4. The request hits **`/api/auth/sign-in/email`**.
5. Better Auth validates credentials, creates/updates a session, and sets the session cookie.
6. On success, the client redirects to `callbackUrl` (or `/dashboard`) and calls `router.refresh()`.

### Sign-out

1. User triggers sign-out (e.g. from the **Sidebar** via `handleSignOut()`).
2. Client calls `authClient.signOut()`.
3. The request hits the Better Auth sign-out endpoint; the session is invalidated and the cookie cleared.
4. Client redirects to **`/sign-in`** and calls `router.refresh()`.

### Session on the client

- **Sidebar** (and any other client component that needs the user) uses `authClient.useSession()` to read the current session.
- Session state is updated when the user signs in or signs out (and after `router.refresh()` where used).

---

## Session validation

Session handling in this project uses **two layers**: a fast, optimistic check in middleware and full validation when the session is actually used.

### 1. Optimistic check (middleware) — cookie presence only

**Where:** `proxy.ts`, invoked from `middleware.ts` (Next.js middleware).

**How it works:**

- The middleware matcher is **`/dashboard`** and **`/dashboard/:path*`**. Only dashboard routes are protected; the root **`/`** (marketing landing), **`/sign-in`**, **`/sign-up`**, and other public paths are not.
- Uses **`getSessionCookie(request)`** from `better-auth/cookies`.
- This only checks whether a **session cookie is present** in the request. It does **not**:
  - Verify the cookie’s signature or payload
  - Look up the session in the database
  - Check if the session has expired

**Purpose:** A cheap guard to redirect users who have no cookie at all to `/sign-in` when they access any dashboard route, without a database round-trip on every request. It improves UX (immediate redirect) but is **not** sufficient for security.

**Limitation:** A forged or expired cookie can still pass this check. Any real security decision must use full session validation (below).

### 2. Full session validation — token + database + expiry

**Where:** Better Auth’s **`/api/auth/get-session`** endpoint and, on the server, `auth.api.getSession()`.

**How it works:**

1. **Client (e.g. `authClient.useSession()`):**
   - The React hook calls **GET `/api/auth/get-session`** with the current cookies.
   - Better Auth reads the session cookie, verifies it (signature/decoding), looks up the session in the database, and checks expiry.
   - Returns `{ user, session }` if valid, or `null` if missing, invalid, or expired.

2. **Server (Server Components, Route Handlers, Server Actions):**
   - To validate the session when loading protected data, use the auth instance’s API with the current request headers:
   - **Example (Route Handler or Server Action with `headers()`):**
     ```ts
     import { auth } from "@/lib/auth";
     import { headers } from "next/headers";

     const session = await auth.api.getSession({ headers: await headers() });
     if (!session) {
       redirect("/sign-in"); // or return 401, etc.
     }
     const userId = session.user.id;
     ```
   - **Example (Route Handler with `Request`):**
     ```ts
     const session = await auth.api.getSession({ headers: request.headers });
     ```
   - This performs the same validation as the client: cookie → verify → DB lookup → expiry check. Only after this should you treat the user as authenticated and use `session.user.id` (or similar) for queries.

**When to use:**

- **Optimistic (middleware):** Redirect unauthenticated users away from protected routes without a DB call.
- **Full validation:** Before returning or mutating any protected data; in API routes, Server Actions, or Server Components that depend on the current user.

### Summary: two layers

| Layer            | Tool / endpoint           | What it does                          | Used for                    |
|-----------------|---------------------------|----------------------------------------|-----------------------------|
| **Optimistic**  | `getSessionCookie(request)` in `proxy.ts` | Checks if a session cookie exists     | Fast redirect to sign-in    |
| **Full**        | `auth.api.getSession({ headers })` or `GET /api/auth/get-session` | Validates cookie, DB, expiry; returns user + session or null | Loading data, enforcing auth |

The comment in `proxy.ts` (“Session is always validated on the server when loading protected data”) means: **every** code path that loads or changes protected data should call `auth.api.getSession()` (or equivalent) and only proceed if a session is returned. The middleware cookie check does not replace that.

---

## Protected routes (intended behavior)

The file **`proxy.ts`** defines the **optimistic** protection layer described above:

- It uses **`getSessionCookie(request)`** to check for the presence of a session cookie.
- If there is **no** cookie, it redirects to **`/sign-in`** with `callbackUrl` set to the current path.
- **`config.matcher`** lists the protected paths: `/`, `/accounts/*`, `/budgets`, `/goals`, `/category/*`, `/subscriptions/*`, `/transactions/*`, `/settings`.

To activate this behavior, `proxy` must be invoked from Next.js **middleware**. For example, in a root **`middleware.ts`**:

```ts
import { proxy } from "./proxy";

export default function middleware(request: import("next/server").NextRequest) {
  return proxy(request);
}
```

If you do not have a `middleware.ts` that calls `proxy`, the redirect to `/sign-in` for protected routes will not run until you add it.

---

## Environment variables

| Variable | Where used | Purpose |
|----------|------------|--------|
| **BETTER_AUTH_URL** | Server (`lib/auth.ts`) | Base URL of the app (e.g. `http://localhost:3000`). Used for redirects and cookie domain. |
| **BETTER_AUTH_SECRET** | Server (`lib/auth.ts`) | Secret for signing/verification. Must be set in production. |
| **NEXT_PUBLIC_APP_URL** | Client (`lib/auth-client.ts`) | Same as `BETTER_AUTH_URL` in practice; used by the auth client for API calls. |
| **DATABASE_URL** | Server (Drizzle + Better Auth) | PostgreSQL connection string. Auth tables live in the same DB (schema `neon_auth`). |

---

## File reference

| File | Role |
|------|------|
| **`lib/auth.ts`** | Better Auth server config (Drizzle adapter, email/password, nextCookies). |
| **`lib/auth-client.ts`** | Client-side auth client (sign-in, sign-up, sign-out, useSession). |
| **`app/api/auth/[...all]/route.ts`** | Next.js route that exposes all Better Auth API endpoints. |
| **`database/schema/auth.ts`** | Drizzle schema for `neon_auth.user`, `session`, `account`, `verification` and relations. |
| **`app/(auth)/sign-in/page.tsx`** | Sign-in form; uses `authClient.signIn.email` and optional `callbackUrl`. |
| **`app/(auth)/sign-up/page.tsx`** | Sign-up form; uses `authClient.signUp.email`. |
| **`app/(auth)/layout.tsx`** | Layout for auth pages (centered card on base-200 background). |
| **`components/ui/Sidebar.tsx`** | Uses `authClient.useSession()` and `authClient.signOut()`. |
| **`proxy.ts`** | Optimistic protected-route check (redirect to `/sign-in` when no session cookie). Must be wired in `middleware.ts` to take effect. |

---

## Summary

- **Server:** Better Auth in `lib/auth.ts` with Drizzle + PostgreSQL and email/password; API at `/api/auth/*` via `app/api/auth/[...all]/route.ts`.
- **Client:** `authClient` from `lib/auth-client.ts` for sign-in, sign-up, sign-out, and `useSession()`.
- **Data:** Auth stored in `neon_auth` (user, session, account, verification); app data references `neon_auth.user.id`.
- **Session validation:** (1) **Optimistic** — `getSessionCookie(request)` in `proxy.ts` (middleware) checks for cookie presence only; (2) **Full** — `auth.api.getSession({ headers })` or `GET /api/auth/get-session` validates cookie, DB, and expiry. Use full validation whenever loading or mutating protected data.
- **Protection:** `proxy.ts` implements an optimistic redirect to `/sign-in` for listed routes; use Next.js middleware to call it. Rely on `auth.api.getSession()` in server code for actual access control.
