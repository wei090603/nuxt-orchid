<template>
  <NConfigProvider inline-theme-disabled :locale="zhCN">
    <n-message-provider>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <LoginRegister />
    </n-message-provider>
  </NConfigProvider>
</template>
<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';
import { zhCN } from 'naive-ui';
</script>
