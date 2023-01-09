<template>
  <div class="nav-sub">
    <div class="content">
      <div
        class="item"
        v-for="item in msgOptions"
        :key="item.key"
        @click="navigate(item)"
        :class="{ active: item.key == activeName }"
      >
        {{ item.label }}
      </div>
    </div>

    <div class="main"><NuxtPage /></div>
  </div>
</template>

<script lang="ts" setup>
import { msgOptions } from '@/constants/message';

const route = useRoute();

const activeName = computed(() => route.name);

const navigate = (item) => {
  navigateTo({
    name: item.key,
  });
};

//用户权限验证
definePageMeta({
  middleware: ['auth'],
});
</script>

<style lang="less" scoped>
.nav-sub {
  position: fixed;
  left: 0;
  top: 60px;
  width: 100%;
  height: 40px;
  z-index: 10;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  background: #fff;
  .content {
    display: flex;
    align-items: center;
    line-height: 1;
    width: 1100px;
    height: 100%;
    margin: 0 auto;
    .item {
      display: flex;
      align-items: center;
      margin: 0 20px;
      cursor: pointer;
      &:first-child {
        margin-left: 0px;
      }
      &.active {
        color: var(--Yuexing-color);
      }
    }
  }
}

.main {
  width: 960px;
  height: auto;
  margin: 15px auto 0;
  background: #fff;
}
</style>
