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

    <Creative class="creative-box" />

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
    padding: 0 10px 10px;
    margin-bottom: 10px;
    box-shadow: rgb(0 0 0 / 20%) 0px 1px 3px;
  }

  .activity-box {
    width: 100%;
    height: 63px;
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

  .notice-title {
    font-size: 16px;
    font-weight: 600;
    color: #666;
  }
}
</style>
