import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "http://mern-auth-be-1:8000",
        changeOrigin: true,
      },
    },
  },
});
