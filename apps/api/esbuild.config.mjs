// esbuild.config.mjs
import { build } from "esbuild";

await build({
  entryPoints: ["src/index.ts"],
  platform: "node",
  target: "node22",
  format: "esm",
  bundle: true,
  sourcemap: true,
  outdir: "dist",
});