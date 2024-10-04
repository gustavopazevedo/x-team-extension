import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {
  extensionReloaderBuildStep,
  extensionReloaderWatchExternal,
  extensionReloaderWebSocket,
  //@ts-expect-error no @types/vite-plugin-extension-reloader
} from "vite-plugin-extension-reloader";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    extensionReloaderBuildStep("src/manifest.json"),
    extensionReloaderWatchExternal("src/**/*"),
    extensionReloaderWebSocket(),
  ],
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, "popup.html"),
        background: path.resolve(__dirname, "src/background.ts"),
      },
      output: {
        assetFileNames: "[name][extname]",
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
