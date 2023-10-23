/* eslint-disable no-undef */
import * as esbuild from "esbuild";

await esbuild.build({
    entryPoints: ["src/index.tsx"],
    bundle: true,
    minify: true,
    sourcemap: false,
    jsx: "automatic",
    define: {
        'process.env.NODE_ENV': '"production"',
    },
    drop: ["console", "debugger"],
    outfile: "dist/esnacc-openapi-sdk.js",
});
