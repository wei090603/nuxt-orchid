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
    <LoadingGroup :pending="pending" :error="error" :isEmpty="data.length === 0">
      <div class="link">
        <img
          src="https://p3-passport.byteimg.com/img/user-avatar/fd2e197538e10388982140ac8096344e~100x100.awebp"
          alt="百年孤独html的头像"
          class="lazy avatar avatar"
          loading="lazy"
        />
        <div class="info-box">
          <a href="/user/1679709498507783" target="_blank" rel="" class="username">
            <span class="name" style="max-width: 128px">百年孤独html</span>
          </a>
          <div class="detail">前端工程师</div>
        </div>
        <button class="follow-btn active">已关注</button>
      </div>
    </LoadingGroup>
  </div>
</template>

<script lang="ts" setup>
import { value } from 'dom7';
import { getUserFollow } from '~~/api/user';

const route = useRoute();

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
console.log(id, 'id');

const active = ref(1);

const { pending, data, error } = await getUserFollow(id);

const handleTabClick = (value: number) => {
  active.value = value;
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
  .follow-btn {
    flex: 0 0 auto;
    margin: 0 0 0 1rem;
    padding: 0;
    width: 7.5rem;
    height: 2.5rem;
    font-size: 1rem;
    color: #92c452;
    background-color: #fff;
    border: 1px solid #92c452;
    border-radius: 2px;
    &.active {
      color: #fff;
      background-color: #92c452;
    }
  }
}
</style>
