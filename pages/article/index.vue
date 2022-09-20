<template>
  <div class="wrapper">
    <span v-for="item in tagHotList" :key="item.id" v-if="tagHotList.length">
      {{ item.id }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { getHotTag } from '@/api/home';

const tagHotList = ref([]);

const getHotTagList = async () => {
  const { data } = await getHotTag();
  tagHotList.value = data;
  console.log(tagHotList.value, 'tagHotList.value');
};

await getHotTagList();
</script>

<style lang="less" scoped>
.wrapper {
  padding: 150px;
}
</style>
