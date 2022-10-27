<template>
  <NConfigProvider inline-theme-disabled>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <LoginRegister />
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';
</script>
