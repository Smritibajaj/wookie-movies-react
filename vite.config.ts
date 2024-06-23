// vite.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
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
  plugins: [react()],
  // test: {
  //   globals: true,
  //   environment: "jsdom",
  //   setupFiles: "./src/setupTests.ts",
  // },
  build: {
    rollupOptions: {
      input: {
        main: "src/main.tsx", // Adjust according to your entry point
      },
    },
  },
});
