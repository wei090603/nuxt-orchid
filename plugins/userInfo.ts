export default defineNuxtPlugin(() => {
  const token = useCookie('token');
  const isLogin = useIsLogin();
  addRouteMiddleware(
    'userInfo',
    async () => {
      if (token.value && !isLogin.value) {
        await useRefreshUserInfo();
      }
    },
    { global: true }
  );

  addRouteMiddleware('named-test', () => {
    console.log(
      'this named middleware was added in a plugin and would override any existing middleware of the same name'
    );
  });
});
