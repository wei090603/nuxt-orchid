<template>
  <div class="wrapper">
    <div class="sub-tab">
      <div class="left">关注</div>
      <div class="right">
        <span
          v-for="item in tabList"
          :key="item.value"
          :class="{ active: active === item.value }"
          @click="handleTabClick(item.value)"
        >
          {{ item.label }}
        </span>
      </div>
    </div>
    <LoadingGroup :isEmpty="data.length === 0">
      <div class="link" v-for="item in data" :key="item.id" @click="handleGoDetail(item.id)">
        <img
          :src="imgUrl + item.avatar"
          :alt="item.nickName + '的头像'"
          class="lazy avatar avatar"
          loading="lazy"
        />
        <div class="info-box">
          <NuxtLink :to="`/user/${item.id}`" target="_blank" class="username">
            <span class="name" style="max-width: 128px">{{ item.nickName }}</span>
          </NuxtLink>
          <div class="detail">{{ item.sign }}</div>
        </div>
        <template v-if="item.id !== myInfo?.id">
          <n-button
            strong
            secondary
            type="primary"
            v-if="item.isFollow"
            @click.stop="handleFollowDelClick(item)"
          >
            已关注
          </n-button>
          <n-button type="primary" ghost v-else @click.stop="handleFollowClick(item)">
            关注
          </n-button>
        </template>
      </div>
    </LoadingGroup>
  </div>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui';
import { getUserFollow, postFollow, deleteFollow } from '@/api/user';

const route = useRoute();
const isLogin = useIsLogin();
const myInfo = useUserInfo();

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;

const tabList = [
  {
    label: '我关注的',
    value: 1,
  },
  {
    label: '关注者',
    value: 2,
  },
];

const id = route.params.id as string;

const isMe = computed(() => isLogin.value && +id === myInfo.value?.id);

const active = ref(1);
const followList = ref([]);

const { pending, data, refresh } = await getUserFollow(id, { type: active.value });

const handleTabClick = (value: number) => {
  active.value = value;
  refresh();
};

// 关注
const handleFollowClick = async (item) => {
  if (isLogin.value) {
    await postFollow({ followId: item.id });
    item.isFollow = true;
  } else {
    useShowModal();
  }
};

const handleFollowDelClick = async (item) => {
  if (isLogin.value) {
    await deleteFollow(item.id);
    item.status = false;
  } else {
    useShowModal();
  }
};

const handleGoDetail = (id: number) => {
  window.open(`/user/${id}`, '_blank');
};
</script>

<style lang="less" scoped>
.sub-tab {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #e4e6eb;
  background: #fff;
  padding: 0 15px;

  .right {
    span {
      position: relative;
      font-size: 14px;
      color: #72777b;
      margin-right: 20px;
      cursor: pointer;
      &.active {
        color: #000;
      }
      &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: -1rem;
        margin-top: -0.5em;
        width: 1px;
        height: 1em;
        background-color: #b2bac2;
        opacity: 0.5;
      }
      &:last-child {
        margin-right: 0px;
      }
    }
  }
}

.link {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background-color: #fff;
  border-bottom: 1px solid rgba(230, 230, 231, 0.5);
  .avatar {
    flex: 0 0 auto;
    margin-right: 15px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .info-box {
    flex: 1 1 auto;
    min-width: 0;
    .name {
      font-size: 16px;
      font-weight: 600;
      color: #2e3135;
    }
    .detail {
      margin-top: 5px;
      font-size: 12px;
      font-weight: 500;
      color: #b9c0c8;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
