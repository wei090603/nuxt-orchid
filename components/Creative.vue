<template>
  <div class="creative-wrap">
    <div class="title">
      <h3>
        <i class="iconfont icon-suijishushengcheng"></i>
        创作中心
      </h3>
    </div>
    <div class="nav-top">
      <NuxtLink class="item" :to="{ path: '/editor/new' }">
        <span class="icon"><i class="iconfont icon-bianjiwenzhang_huaban"></i></span>
        <span class="label">写文章</span>
      </NuxtLink>
      <div class="item">
        <span class="icon"><i class="iconfont icon-video"></i></span>
        <span class="label">发视频</span>
      </div>
      <NuxtLink class="item" :to="{ path: '/my/sign' }" target="_blank">
        <span class="icon"><i class="iconfont icon-jifen"></i></span>
        <span class="label">赚积分</span>
      </NuxtLink>
      <NuxtLink class="item" :to="{ path: '/my/lottery' }" target="_blank">
        <span class="icon"><i class="iconfont icon-choujiang"></i></span>
        <span class="label">抽奖</span>
      </NuxtLink>
    </div>

    <div class="btn">
      <nuxt-link :to="{ path: '/creator' }">进入创作中心 ></nuxt-link>
    </div>
  </div>
</template>

<style lang="less" scoped>
.creative-wrap {
  width: 100%;
  background: #fff;

  .title {
    color: #444;
    font-size: 14px;
    font-weight: 500;

    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
  }
  .nav-top {
    display: flex;
    margin-bottom: 15px;
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &:last-child {
        margin-right: 0;
      }
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-bottom: 12px;
        i {
          font-size: 24px;
        }
      }
      .label {
        color: #444;
        font-size: 12px;
        line-height: 1;
        text-align: center;
      }
      &:nth-child(1) {
        .icon {
          background: #e1edff;
          color: rgb(0, 102, 255);
        }
      }
      &:nth-child(2) {
        .icon {
          background: #fff3e2;
          color: rgb(255, 150, 7);
        }
      }
      &:nth-child(3) {
        .icon {
          background: #fef9e2;
          color: rgb(244, 200, 7);
        }
      }
      &:nth-child(4) {
        .icon {
          color: rgb(38, 191, 191);
          background: #e5f7f7;
        }
      }
    }
  }
  .btn {
    border: 1px solid var(--Yuexing-color);
    color: var(--Yuexing-color);
    border-radius: 4px;
    height: 40px;
    font-size: 14px;
    a {
      color: var(--Yuexing-color);
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      display: flex;
      height: 100%;
    }
  }
}
</style>
