<template>
  <n-dropdown trigger="hover" :options="msgOptions" @select="handleSelect">
    <div class="msg-box">
      <span class="icon"><i class="iconfont icon-xiaoxi1"></i></span>
      <span class="label">消息</span>
    </div>
  </n-dropdown>
</template>

<script lang="ts" setup>
import { msgOptions } from '@/constants/message';

const handleSelect = (k: string) => {
  navigateTo({
    name: k,
  });
};
</script>

<style lang="less" scoped>
.msg-box {
  display: flex;
  flex-direction: column;
  height: 40px;
  margin: 0 24px;
  cursor: pointer;
  .icon {
    width: 20px;
    height: 20px;
    text-align: center;
    align-items: center;
    i {
      font-size: 18px;
      color: #8a919f;
    }
  }
  .label {
    font-size: 12px;
    margin-top: 2px;
    color: #8590a6;
  }
}
</style>
