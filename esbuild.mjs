/* eslint-disable no-undef */
import * as esbuild from "esbuild";

await esbuild.build({
    entryPoints: ["src/browser.tsx"],
    bundle: true,
    minify: true,
    sourcemap: process.env.DEV ? true : false,
    jsx: "automatic",
    outfile: "dist/bundle.js",
});
