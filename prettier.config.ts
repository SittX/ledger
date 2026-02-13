import type { Config } from "prettier";

const config: Config = {
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: "es5",
    printWidth: 120,
    bracketSpacing: true,
    bracketSameLine: true,
    plugins: ["prettier-plugin-tailwindcss"],
};

export default config;