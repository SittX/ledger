import "./config/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./db/migration",
    dialect: "postgresql",
    schema: "./db/schema.ts",

    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },

    extensionsFilters: ["postgis"],
    schemaFilter: "public",
    tablesFilter: "*",

    introspect: {
        casing: "camel",
    },

    migrations: {
        prefix: "timestamp",
        table: "__drizzle_migrations__",
        schema: "app",
    },

    breakpoints: true,
    strict: true,
    verbose: true,
});
