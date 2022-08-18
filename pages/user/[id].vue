<template>
<div>
  个人详情页
</div>
</template>

<script lang="ts" setup>
const route = useRoute()

console.log(route.params.id, 'id');
</script>