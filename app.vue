<template>
  <NConfigProvider inline-theme-disabled>
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </NConfigProvider>
</template>

<script setup>
import { NConfigProvider } from 'naive-ui';
</script>