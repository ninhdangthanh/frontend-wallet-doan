import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import path from "path";

export default defineConfig({
  plugins: [react()],
  esbuild: {
    target: 'esnext',
    // platform: 'linux',
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  optimizeDeps: {
    include: ["ethers"],
  },
});
