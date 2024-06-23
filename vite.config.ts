// vite.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const excludeFiles = (regex: RegExp) => {
  return {
    name: "exclude-files",
    load(id: string) {
      if (regex.test(id)) {
        return { code: "" }; // Return an empty module
      }
    },
  };
};

export default defineConfig({
  plugins: [react(), excludeFiles(/\/path\/to\/test\.tsx$/)],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
  build: {
    rollupOptions: {
      input: {
        main: "src/main.tsx", // Adjust according to your entry point
      },
    },
  },
});
