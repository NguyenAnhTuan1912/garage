import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  // root: path.resolve(__dirname, "src/app"),
  cacheDir: path.resolve(__dirname, "node_modules/.vite_web"),
  publicDir: path.resolve(__dirname, "public"),
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: [
      {
        find: "@/lib",
        replacement: path.resolve(__dirname, "./src/shared/lib"),
      },
      {
        find: "@/components",
        replacement: path.resolve(__dirname, "./src/shared/components"),
      },
      {
        find: "@/hooks",
        replacement: path.resolve(__dirname, "./src/shared/hooks"),
      },
      {
        find: "@/assets",
        replacement: path.resolve(__dirname, "./src/shared/assets"),
      },
      {
        find: "@/utils",
        replacement: path.resolve(__dirname, "./src/shared/utils"),
      },
      {
        find: "@/shared",
        replacement: path.resolve(__dirname, "./src/shared"),
      },
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "./index.html"),
      },
    },
  },
  server: {
    port: 5500,
    proxy: {
      // Proxy các request bắt đầu bằng /api sang Backend NestJS
      "/api": {
        target: "http://localhost:10000", // Port mặc định của NestJS
        changeOrigin: true,
        // Nếu backend của bạn đã có sẵn prefix /api thì không cần rewrite
        // Nếu backend chưa có /api, hãy dùng dòng dưới:
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});
