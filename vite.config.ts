import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ['**/*.JPG', '**/*.PNG', '**/*.GIF', '**/*.JPEG', '**/*.SVG'],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      'generated-client': path.resolve(__dirname, "./generated-client"),
    },
  },
})
