//首先引入useState、useCookie
import { useState } from 'nuxt/app';

export const useUserInfo = () =>
  useState('userInfo', () => ({
    id: 1,
    account: 'test',
  }));

export const useIsLogin = () => useState('isLogin', () => false);
