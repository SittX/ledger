import "./config/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./database/migration",
    dialect: "postgresql",
    schema: "./database/schema/*",

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
        schema: "public",
    },

    breakpoints: true,
    strict: true,
    verbose: true,
});
