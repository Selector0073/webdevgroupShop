// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: "static", // було "server"
  outDir: "./dist",
});