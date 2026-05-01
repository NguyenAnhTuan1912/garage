import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5500,
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
  }
});
