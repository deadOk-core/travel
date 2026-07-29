import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Группируем основные библиотеки
            if (id.includes("react") || id.includes("scheduler")) {
              return "react-vendor";
            }
            if (
              id.includes("redux") ||
              id.includes("immer") ||
              id.includes("reselect")
            ) {
              return "redux-vendor";
            }
            if (id.includes("router") || id.includes("remix")) {
              return "router-vendor";
            }
            if (id.includes("zod") || id.includes("hook-form")) {
              return "form-vendor";
            }
            if (id.includes("tanstack")) {
              return "query-vendor";
            }
            // Все остальные библиотеки в один чанк
            return "vendor";
          }
        },
      },
    },
  },
});
