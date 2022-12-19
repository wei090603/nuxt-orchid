export default defineNuxtRouteMiddleware(async (to, from) => {
  // 全局用户信息中间件
  const token = useCookie('token');
  const isLogin = useIsLogin();
  if (token.value && !isLogin.value) {
    await useRefreshUserInfo();
  }
});
