//用户登录操作权限控制中间件
import { createDiscreteApi } from "naive-ui";
import { getStorage } from "~~/utils/storage";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = getStorage("token");
  const user = useUser();
  //未登录
  if (!token) {
    if (process.client) {
      const { message } = createDiscreteApi(["message"]);
      message.error("请先登录");
    }
    console.log('login')
    // return navigateTo("/login?from=" + route.fullPath);
  }

  //未绑定手机号
  // const phone = user.value?.phone;
  // if (!phone && route.name != "bindphone") {
  //   const { message } = createDiscreteApi(["message"]);
  //   //处于客户端
  //   if (process.client) {
  //     message.error("请先绑定手机号");
  //   }

  //   return navigateTo("/bindphone?from=" + route.fullPath);
  // }
});