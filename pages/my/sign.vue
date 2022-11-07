<template>
  <div class="wrapper-sign">
    <div class="tab-header">
      <span class="title">每日签到</span>
      <div class="rules">签到规则</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { sign, signRecord } from '@/api/user';

const userInfo = useUserInfo();

console.log(userInfo.value, 'userInfo');

const { pending, data, error } = await signRecord();

console.log(data.value, 'data');

const handleSignClick = async () => {
  await sign();
};
</script>

<style lang="less" scoped>
.wrapper-sign {
}

.tab-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 16px;
  border-bottom: 1px solid #e5e6eb;
  .title {
    white-space: nowrap;
    font-size: 18px;
    font-weight: 500;
    color: #1d2129;
  }
  overflow: hidden;
  .rules {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: #4e5969;
    cursor: pointer;
    white-space: nowrap;
  }
}
</style>
