<template>
  <n-result status="500" title="错误提示" :description="error.message">
    <template #footer>
      <n-button @click="handleError">回到首页</n-button>
    </template>
  </n-result>
</template>

<script setup>
import { NButton, NResult } from "naive-ui";
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>
