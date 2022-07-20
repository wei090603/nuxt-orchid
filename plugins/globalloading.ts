import {
  createDiscreteApi,
  ConfigProviderProps,
  darkTheme,
  lightTheme,
} from "naive-ui";

export default defineNuxtPlugin((nuxtApp) => {
  const bar = ref(null);
  nuxtApp.hook("app:mounted", (e) => {
    const { loadingBar } = createDiscreteApi(["loadingBar"]);
    bar.value = loadingBar;
  });
  nuxtApp.hook("page:start", (e) => {
    bar.value?.start();
  });
  nuxtApp.hook("page:finish", (e) => {
    setTimeout(() => {
      bar.value?.finish();
    }, 150);
  });
  nuxtApp.hook("app:error", (e) => {
    // 客户端关闭 loading
    if (process.client) {
      setTimeout(() => {
        bar.value?.finish();
      }, 150);
    }
  });
});
