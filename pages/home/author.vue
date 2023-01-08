<template>
  <div class="author-main">
    <div class="sign">
      <div class="first-line">
        <div class="icon-text">
          <span class="hello">下午好！</span>
          <p>集天下兰花品种，打造兰花专业社区</p>
        </div>
        <button class="sign-btn" @click="handleGoSign">去签到</button>
      </div>
    </div>

    <div class="creative-box">
      <div class="creative-title">创作中心</div>
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

      <div class="btn">进入创作中心 ></div>
    </div>

    <div class="activity-box">活动卡片位</div>

    <!-- <div class="user-card">
      <div class="item">
        <span class="count">1</span>
        <span class="label">关注</span>
      </div>
      <div class="item">
        <span class="count">2</span>
        <span class="label">赞过</span>
      </div>
      <div class="item">
        <span class="count">3</span>
        <span class="label">收藏</span>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
const isLogin = useIsLogin();
const userInfo = useUserInfo();

const handleGoSign = () => {
  if (isLogin.value) {
    navigateTo({
      path: '/my/sign',
    });
  } else {
    useShowModal();
  }
};
</script>

<style lang="less" scoped>
.author-main {
  width: 300px;
  height: 100%;
  margin-left: 15px;
  .sign {
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: rgb(0 0 0 / 20%) 0px 1px 3px;
    .first-line {
      display: flex;
      justify-content: space-between;
      .icon-text {
        display: flex;
        flex-direction: column;
        .hello {
          color: #1d2129;
          font-size: 18px;
          font-weight: 500;
        }
        p {
          font-size: 12px;
          color: #666;
        }
      }
      .sign-btn {
        border-radius: 4px;
        height: 36px;
        width: 74px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(26, 188, 156, 0.3);
        background-color: rgba(26, 188, 156, 0.05);
        color: var(--Yuexing-color);
        cursor: pointer;
        &.is-sign {
          color: #fff;
          border: 1px solid var(--Yuexing-color);
          background-color: rgba(30, 128, 255, 1);
        }
      }
    }
  }
  .creative-box {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: rgb(0 0 0 / 20%) 0px 1px 3px;
    .creative-title {
      padding-bottom: 10px;
      color: #444;
      font-size: 14px;
      font-weight: 500;
    }
    .nav-top {
      display: flex;
      margin-bottom: 10px;
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
  }

  .activity-box {
    width: 100%;
    height: 75px;
    padding: 10px;
    box-shadow: rgb(0 0 0 / 20%) 0px 1px 3px;
  }

  .user-card {
    display: flex;
    width: 100%;
    border-bottom: 1px solid rgba(228, 230, 235, 0.5);
    margin: 10px 0;
    padding-bottom: 10px;
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .label {
        color: #8a919f;
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
      }
    }
  }
  .btn {
    box-sizing: border-box;
    min-width: 0px;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    border: 1px solid var(--Yuexing-color);
    color: var(--Yuexing-color);
    border-radius: 4px;
    cursor: pointer;
    height: 40px;
    font-size: 14px;
  }
  .notice-title {
    font-size: 16px;
    font-weight: 600;
    color: #666;
  }
}
</style>
