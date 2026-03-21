import config from "@iobroker/eslint-config";

export default [
    {
        ignores: ["build/**", "node_modules/**", "test/**", "eslint.config.mjs"],
    },
    ...config,
    {
        files: ["src/**/*.ts"],
        rules: {
            "jsdoc/require-jsdoc": "off",
            "jsdoc/no-blank-blocks": "off",
            "@typescript-eslint/no-floating-promises": "warn",
            "@typescript-eslint/require-await": "warn",
            "prettier/prettier": "off",
        },
    },
];
