<template>
  <div class="wrapper">
    签到

    <n-button type="primary" @click="handleSignClick">立即签到</n-button>
  </div>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui';
import { sign } from '@/api/user';

const userInfo = useUserInfo();

console.log(userInfo.value, 'userInfo');

const handleSignClick = async () => {
  await sign();
};
</script>

<style lang="less" scoped></style>
