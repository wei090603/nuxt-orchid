import { defineNuxtConfig } from "nuxt";
import { loadEnv } from "vite";

interface VITE_ENV_CONFIG {
  VITE_API_HOST: string;
  VITE_API_PREFFIX: string;
  VITE_PACK_ENV: string;
  VITE_PACK_URL: string;
}

const envScript = process.env.npm_lifecycle_script.split(" ");
const envName = envScript[envScript.length - 1]; // 通过启动命令区分环境
const envData = loadEnv(envName, "env") as unknown as VITE_ENV_CONFIG;

console.log("当前环境：", envData);

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  build: {
    extractCSS: true,
    transpile:
      process.env.NODE_ENV === "production"
        ? [
            "naive-ui",
            "vueuc",
            "@css-render/vue3-ssr",
            "@juggle/resize-observer",
          ]
        : ["@juggle/resize-observer"],
  },
  vite: {
    envDir: "~/env", // 指定env文件夹
    optimizeDeps: {
      include:
        process.env.NODE_ENV === "development"
          ? ["naive-ui", "vueuc", "date-fns-tz/esm/formatInTimeZone"]
          : [],
    },
  },
  publicRuntimeConfig: envData, // 把env放入这个里面，通过useRuntimeConfig获取
  meta: {
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  },
  css: [],
  components: {
    global: true,
    dirs: ["~/components"],
  },
  head: {
    link: [
      { rel: "shortcut icon", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
    ],
  },
});
