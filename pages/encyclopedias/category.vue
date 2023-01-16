<template>
  <div class="category">
    <div class="content">
      <div
        class="item"
        v-for="item in data"
        :key="item.id"
        :class="{ active: item.id === (categoryId || 9) }"
        @click="emits('update:categoryId', item.id)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCategoryList } from '@/api/encyclopedias';

interface IProps {
  categoryId: number | null;
}

withDefaults(defineProps<IProps>(), {});

const emits = defineEmits(['update:categoryId']);

const { data } = await getCategoryList();
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
      cursor: pointer;
      &:hover {
        color: var(--Yuexing-color);
      }
      &:first-child {
        margin-left: 0px;
      }
      &.active {
        color: var(--Yuexing-color);
      }
    }
  }
}
</style>
