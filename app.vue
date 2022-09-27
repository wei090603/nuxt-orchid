<template>
  <NConfigProvider inline-theme-disabled>
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
    <LoginRegister />
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider } from 'naive-ui';
</script>
