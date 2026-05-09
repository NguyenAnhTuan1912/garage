import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./public/manifest.json";

export default defineConfig({
  // root: path.resolve(__dirname, "src/extension"),
  cacheDir: path.resolve(__dirname, "node_modules/.vite_ext"),
  plugins: [react(), tailwindcss(), crx({ manifest })],
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
    outDir: path.resolve(__dirname, "dist-extension"),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "./extension.html"),
      },
    },
  },
  server: {
    port: 5600,
    strictPort: true,
    hmr: {
      port: 5600,
    },
    proxy: {
      // Proxy các request bắt đầu bằng /api sang Backend NestJS
      '/api': {
        target: 'http://localhost:10000', // Port mặc định của NestJS
        changeOrigin: true,
        // Nếu backend của bạn đã có sẵn prefix /api thì không cần rewrite
        // Nếu backend chưa có /api, hãy dùng dòng dưới:
        // rewrite: (path) => path.replace(/^\/api/, '') 
      },
    },
  },
});
