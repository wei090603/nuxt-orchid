<template>
  <NConfigProvider inline-theme-disabled :locale="zhCN">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <LoginRegister />
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';
import { zhCN } from 'naive-ui';
</script>
