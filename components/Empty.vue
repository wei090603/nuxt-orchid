<template>
  <n-empty :description="desc" size="large" class="py-10"></n-empty>
</template>

<script lang="ts" setup>
import { NEmpty } from 'naive-ui';
type IProps = {
  desc: string;
};
withDefaults(defineProps<IProps>(), {
  desc: '暂无数据',
});
</script>
