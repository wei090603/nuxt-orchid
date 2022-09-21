//用户状态信息模块
import { createDiscreteApi } from 'naive-ui';
import { getMeUserInfo, loginOut } from '~~/api/user';
export const useUserInfo = () => useState('userInfo', () => null);

export const useIsLogin = () => useState('isLogin', () => false);

// 更新用户信息
export const useRefreshUserInfo = async () => {
  const token = useCookie('token');
  const userInfo = useUserInfo();
  const isLogin = useIsLogin();
  // 用户已登录，直接获取用户信息
  if (token.value) {
    let { data, error } = await getMeUserInfo();
    if (data.value) {
      userInfo.value = data.value.userInfo;
      isLogin.value = true;
    }
  }
};

//退出登录
export async function useLogout() {
  await loginOut();
  const user = useUserInfo();
  const isLogin = useIsLogin();
  user.value = null;
  isLogin.value = false;

  const token = useCookie('token');
  if (token.value) {
    token.value = null;
  }

  const { message } = createDiscreteApi(['message']);
  message.success('退出登录成功');
  //回到首页
  const route = useRoute();
  if (route.path != '/') {
    navigateTo('/', { replace: true });
  }
}

//限定用户登录且绑定手机号才能进行操作
export function useHasAuth(callback = null) {
  const route = useRoute();
  const user = useUser();
  const token = useCookie('token');
  const { message } = createDiscreteApi(['message']);
  //未登录
  if (!token.value) {
    message.error('请先登录');
    return navigateTo('/login?from=' + route.fullPath);
  }

  //未绑定手机号
  const phone = user.value?.phone;
  if (!phone && route.name != 'bindphone') {
    message.error('请先绑定手机号');
    return navigateTo('/bindphone?from=' + route.fullPath);
  }
  if (callback && typeof callback == 'function') {
    callback();
  }
}

//点赞/取消点赞公共方法
export function useHandleSupportPost() {
  const supportLoading = ref(false);
  const handleSupport = (item) => {
    //用户登录才能操作
    useHasAuth(async () => {
      //行为判断
      let type = item.issupport ? 'unsupport' : 'support';
      let msg = item.issupport ? '取消点赞' : '点赞';

      supportLoading.value = true;
      const { error } = await usePostSupportApi(item.id, type);
      supportLoading.value = false;

      //操作失败
      if (error.value) return;

      //操作成功
      if (type === 'unsupport') {
        item.support_count--;
      } else {
        item.support_count++;
      }

      item.issupport = !item.issupport;

      const { message } = createDiscreteApi(['message']);
      message.success(msg + '成功！');
    });
  };

  return {
    supportLoading,
    handleSupport,
  };
}
