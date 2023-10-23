/* eslint-disable no-undef */
import * as esbuild from "esbuild";

await esbuild.build({
    entryPoints: ["src/index.tsx"],
    bundle: true,
    minify: true,
    sourcemap: false,
    jsx: "automatic",
    format: "esm",
    define: {
        'process.env.NODE_ENV': '"production"',
    },
    drop: ["console", "debugger"],
    outfile: "dist/esnacc-openapi-sdk.js",
});

await esbuild.build({
    entryPoints: ["src/browser.tsx"],
    bundle: true,
    minify: true,
    sourcemap: false,
    external: ["*.css"],
    jsx: "automatic",
    define: {
        'process.env.NODE_ENV': '"production"',
    },
    drop: ["console", "debugger"],
    outfile: "dist/esnacc-openapi-sdk-browser.js",
});

await esbuild.build({
    entryPoints: ["src/index.tsx"],
    bundle: true,
    minify: true,
    sourcemap: false,
    external: ["*.css"],
    jsx: "automatic",
    define: {
        'process.env.NODE_ENV': '"production"',
    },
    format: "cjs",
    drop: ["console", "debugger"],
    outfile: "dist/esnacc-openapi-sdk.cjs",
});