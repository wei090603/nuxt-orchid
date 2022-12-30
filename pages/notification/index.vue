<template>
  <LoadingGroup :pending="pending" :error="error" :isEmpty="data.length === 0"></LoadingGroup>
</template>

<script lang="ts" setup>
import { getUserLike } from '@/api/user';

const route = useRoute();

const id = route.params.id as string;

const { pending, data, error } = await getUserLike('2');
</script>
