import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defaultClientConditions, defaultServerConditions } from "vite";

const prismaFixPlugin = {
  name: "prisma-fix",
  enforce: "post",
  config() {
    return {
      resolve: {
        conditions: [...defaultClientConditions],
      },
      ssr: {
        resolve: {
          conditions: [...defaultServerConditions],
          externalConditions: [...defaultServerConditions],
        },
      },
    };
  },
};

export default defineConfig(({ isSsrBuild, command }) => ({
  build: {
    rollupOptions: isSsrBuild
      ? {
          input: "./server/app.ts",
        }
      : undefined,
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  ssr: {
    noExternal: command === "build" ? true : undefined,
  },
  plugins: [prismaFixPlugin,reactRouter(), tsconfigPaths()],
}));
