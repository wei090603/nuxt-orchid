<template>
  <n-dropdown trigger="hover" :options="userOptions" @select="handleSelect">
    <n-avatar style="cursor: pointer" round size="large" :src="imgUrl + userInfo?.avatar" />
  </n-dropdown>
</template>

<script lang="ts" setup>
import { NAvatar, NDropdown, createDiscreteApi } from 'naive-ui';

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;

const userInfo = useUserInfo();

const userOptions = [
  {
    label: '我的主页',
    key: 'center',
  },
  {
    label: '退出',
    key: 'logout',
  },
];

const handleSelect = (k: any) => {
  switch (k) {
    case 'logout':
      const { dialog } = createDiscreteApi(['dialog']);
      dialog.warning({
        content: '是否要退出登录？',
        positiveText: '退出',
        negativeText: '取消',
        onPositiveClick: async () => {
          await useLogout();
        },
      });
      break;
    case 'center':
      navigateTo({
        path: `/user/${userInfo.value?.id}`,
      });
      break;
  }
};
</script>
