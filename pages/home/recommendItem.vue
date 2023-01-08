<template>
  <div class="item" @click="emits('handleItemClick', item)">
    <img :src="imgUrl + item.coverPicture" alt="" />
    <div class="title">{{ item.title }}</div>
    <div class="user">
      <span class="name">{{ item.author?.nickName }}</span>
      <span class="time">· {{ dayjs(item.createdAt).format('YYYY-MM-DD') }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // 导入本地化语言
dayjs.locale('zh-cn'); // 使用本地化语言

interface IProps {
  item: any;
}
const props = withDefaults(defineProps<IProps>(), {});

const emits = defineEmits(['handleItemClick']);

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;
</script>

<style lang="less" scoped>
.item {
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 175px;
    border-radius: 5px;
  }
  .title {
    width: 100%;
    height: 48px;
    margin-top: 10px;
    font-size: 15px;
    display: -webkit-box !important;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    transition: all 0.5s;
    color: #18191c;
    &:hover {
      color: var(--Yuexing-color);
    }
  }

  .user {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 4px;
    color: #9499a0;
    &:hover {
      color: var(--Yuexing-color);
    }
    .name {
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      text-overflow: -o-ellipsis-lastline;
      text-overflow: ellipsis;
      word-break: break-word !important;
      word-break: break-all;
      line-break: anywhere;
      -webkit-line-clamp: 1;
      display: inline-flex;
    }
    .time {
      margin-left: 4px;
    }
  }
}
</style>
