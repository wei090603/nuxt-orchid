<template>
  <div class="category">
    <div class="content">
      <div class="item" v-for="item in data" :key="item.id">{{ item.title }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCategoryTop } from '@/api/article';

const { data } = await getCategoryTop();
</script>

<style lang="less" scoped>
.category {
  position: fixed;
  left: 0;
  top: 60px;
  width: 100%;
  height: 40px;
  z-index: 10;
  background: #fff;
  .content {
    display: flex;
    align-items: center;
    line-height: 1;
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    .item {
      display: flex;
      align-items: center;
      margin: 0 8px;
      &:first-child {
        margin-left: 0px;
      }
    }
  }
}
</style>
