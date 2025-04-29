import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 2048,
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
  test: {
    setupFiles: ["src/setupTests.ts"],
    globals: true,
    environment: "jsdom",

    // see: https://stackoverflow.com/questions/78989267/vitest-unknown-file-extension-css
    pool: "vmThreads",
  },
});
