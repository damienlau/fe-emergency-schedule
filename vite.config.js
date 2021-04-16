import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { getThemeVariables } from "ant-design-vue/dist/theme";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    open: true,
    proxy: {
      "/dev-api": {
        target: "http://192.168.31.241:8080/schedule",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ""),
      },
      "/prod-api": {
        target: "",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/prod-api/, ""),
      },
    },
  },
  plugins: [vue()],
});
