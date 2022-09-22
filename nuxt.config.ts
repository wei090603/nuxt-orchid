import { defineNuxtConfig } from 'nuxt';
import { loadEnv } from 'vite';

interface VITE_ENV_CONFIG {
  VITE_API_HOST: string;
  VITE_API_PREFFIX: string;
  VITE_PACK_ENV: string;
  VITE_PACK_URL: string;
}

const envScript = process.env.npm_lifecycle_script.split(' ');
const envName = envScript[envScript.length - 1]; // 通过启动命令区分环境
const envData = loadEnv(envName, 'env') as unknown as VITE_ENV_CONFIG;

console.log('当前环境：', envData);

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  app: {
    head: {
      titleTemplate: '',
      title: '兰花交流网 － 兰花问题,兰草交易,兰花图片,了解中国兰花尽在本兰花网',
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'zh-CN',
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'keyword',
          conntent:
            '兰花,兰草,兰花草,兰花网,兰花拍卖,兰花图片,兰花网站,中国兰花,兰花价格,兰花交易网,兰花拍卖网,中交网,三千兰花,爱兰,爱兰网站,兰花市场,兰花批发市场,兰花交易,兰花价格行情,兰花百科,兰花学院,兰友博客,兰花新闻,兰花店铺,兰友社区',
        },
        {
          name: 'description',
          content:
            '兰花交流网 - 国内领先的兰花交流平台,提供中国兰花拍卖,兰花交易,兰花图片,兰花价格,兰友社区,兰友博客,兰花百科,兰花学院,兰园店铺,国兰文化,兰市动态等一体化的兰花网！',
        },
      ],
      link: [
        { rel: 'shortcut icon', href: 'favicon.ico' },
        { rel: 'apple-touch-icon', href: 'favicon.ico' },
      ],
    },
  },
  build: {
    extractCSS: true,
    transpile:
      process.env.NODE_ENV === 'production'
        ? ['naive-ui', 'vueuc', '@css-render/vue3-ssr', '@juggle/resize-observer']
        : ['@juggle/resize-observer'],
  },
  vite: {
    envDir: '~/env', // 指定env文件夹
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
          : [],
    },
  },
  publicRuntimeConfig: envData, // 把env放入这个里面，通过useRuntimeConfig获取
  css: ['@/styles/rest.css', '@/assets/font/iconfont.css'],
  components: {
    global: true,
    dirs: ['~/components'],
  },
  server: {
    port: 8082,
  },
});
