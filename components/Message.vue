<template>
  <n-dropdown trigger="hover" :options="msgOptions" @select="handleSelect">消息</n-dropdown>
</template>

<script lang="ts" setup>
import { msgOptions } from '@/constants/message';

const handleSelect = (k: string) => {
  navigateTo({
    name: k,
  });
};
</script>
