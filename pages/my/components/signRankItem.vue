<template>
  <div class="sgin-item">
    <div class="l">
      <div class="rank">{{ index >= 3 ? index + 1 : '' }}</div>
      <div class="avatar">
        <n-image width="40" height="40" :src="imgUrl + item.avatar" />
      </div>
      <div class="userInfo">
        <span class="nick-name">{{ item.nickName }}</span>
        <span class="sign">{{ item.signText }}</span>
      </div>
    </div>
    <div class="point-box">
      <span class="point">{{ item.favs }}</span>
      <span class="count" v-if="item.count">总计签到{{ item.count }}次</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IItem {
  avatar: string;
  nickName: string;
  signText: string;
  favs: number;
  count: number;
}

interface IProps {
  item: IItem;
  index: number;
}

withDefaults(defineProps<IProps>(), {});

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;
</script>

<style lang="less" scoped>
.sgin-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eff0f1;
  .l {
    display: flex;
    align-items: center;
    .rank {
      width: 14px;
      height: 18px;
      margin-right: 10px;
    }
    .avatar {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .sign {
      color: #999;
    }
  }
  .point-box {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-direction: column;
    .count {
      font-size: 14px;
    }
    .point {
      font-size: 16px;
    }
  }
  &:nth-of-type(1) {
    .rank {
      background: url('@/assets/images/hot1.png') no-repeat center;
      background-size: 100%;
    }
  }
  &:nth-of-type(2) {
    .rank {
      background: url('@/assets/images/hot2.png') no-repeat center;
      background-size: 100%;
    }
  }
  &:nth-of-type(3) {
    .rank {
      background: url('@/assets/images/hot3.png') no-repeat center;
      background-size: 100%;
    }
  }
  .userInfo {
    display: flex;
    flex-direction: column;
  }
}
</style>
