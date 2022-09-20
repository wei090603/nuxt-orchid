import { useRefreshUserInfo } from '~~/composables/useAuth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log(333333);
  await useRefreshUserInfo();
});
