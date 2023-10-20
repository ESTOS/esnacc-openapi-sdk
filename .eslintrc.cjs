// eslint-disable-next-line no-undef
module.exports = {
    "globals": {
        "globalThis": true, // means it is not writeable
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    "rules": {
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "consistent-return": 2,
        "indent": [
            1,
            4
        ],
        "no-else-return": 1,
        "semi": [
            1,
            "always"
        ],
        "space-unary-ops": 2
    }
}