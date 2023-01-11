<template>
  <div class="msg-box" @click="handleToClick">
    <span class="icon"><i class="iconfont icon-xiaoxi1"></i></span>
    <span class="label">创作中心</span>
  </div>
</template>

<script lang="ts" setup>
const handleToClick = () => {
  navigateTo('/creator');
};
</script>

<style lang="less" scoped>
.msg-box {
  display: flex;
  flex-direction: column;
  height: 40px;
  margin-right: 24px;
  cursor: pointer;
  justify-content: center;
  text-align: center;
  align-items: center;
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
