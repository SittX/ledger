import { config } from "dotenv";
import { resolve } from "path";

/**
 * Centralized environment variable loader
 * 
 * Loads environment files in Next.js priority order:
 * 1. .env.local (highest priority, gitignored)
 * 2. .env.development / .env.production / .env.test (environment-specific)
 * 3. .env (default fallback)
 * 
 * This ensures consistent environment variable loading across:
 * - Next.js runtime (which auto-loads these files)
 * - Standalone scripts (drizzle.config.ts, db scripts, etc.)
 */

const nodeEnv = process.env.NODE_ENV || "development";
const rootDir = process.cwd();

// Load environment files in priority order (later loads override earlier ones)
// 1. Base .env file (lowest priority)
config({ path: resolve(rootDir, ".env") });

// 2. Environment-specific file (.env.development, .env.production, etc.)
if (nodeEnv !== "test") {
    config({ path: resolve(rootDir, `.env.${nodeEnv}`) });
} else {
    config({ path: resolve(rootDir, ".env.test") });
}

// 3. .env.local (highest priority, overrides everything)
config({ path: resolve(rootDir, ".env.local") });

// Export environment variables for type safety and validation
export const env = {
    // Database
    DATABASE_URL: process.env.DATABASE_URL!,
    // Better Auth
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET!,
    // Node Environment
    NODE_ENV: nodeEnv,
} as const;

// Validate required environment variables
const requiredEnvVars = [
    "DATABASE_URL",
    "BETTER_AUTH_SECRET",
] as const;

for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
        throw new Error(
            `Missing required environment variable: ${varName}. ` +
            `Please check your .env.local or .env.${nodeEnv} file.`
        );
    }
}
