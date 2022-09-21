<template>
  <NConfigProvider inline-theme-disabled>
    <n-message-provider>
      <NuxtLayout>
        <NuxtPage></NuxtPage>
      </NuxtLayout>
      <LoginRegister />
    </n-message-provider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider } from 'naive-ui';
</script>
