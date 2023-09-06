import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
  },
  server: {
    open: false, //개발 서버를 실행할 때 브라우저를 자동으로 엽니다.
    port: 3000, //3000번 포트로 개발 서버를 실행합니다.
    proxy: {
      //CORS 방지를 위한 프록시 설정입니다.
      "/local": {
        target: "https://your.api.domain.here", //실제 api 도메인을 넣어줍니다.
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/local/, ""), //target url을 교체합니다.
      },
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: "eslint src/",
        dev: {
          logLevel: ["warning"],
        },
      },
      enableBuild: false,
      overlay: {
        initialIsOpen: false,
      },
    }),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Threat Map",
        short_name: "Threat Map",
        description: "Threat Map",
        theme_color: "#6EAA2D",
        icons: [
          {
            src: "manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
