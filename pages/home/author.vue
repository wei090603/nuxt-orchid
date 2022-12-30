<template>
  <div class="author-main">
    <div class="">尊敬的我就看看用户：下午好</div>
    <div class="user-card">
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
    </div>

    <div class="nav-top">
      <div class="item">
        <span class="icon">
          <n-icon size="40">
            <game-controller-outline />
          </n-icon>
        </span>
        <span class="label">写文章</span>
      </div>
      <div class="item">
        <span class="icon">
          <n-icon size="40">
            <game-controller-outline />
          </n-icon>
        </span>
        <span class="label">发视频</span>
      </div>
      <div class="item">
        <span class="icon">
          <n-icon size="40">
            <game-controller-outline />
          </n-icon>
        </span>
        <span class="label">写想法</span>
      </div>
      <div class="item">
        <span class="icon">
          <n-icon size="40">
            <game-controller-outline />
          </n-icon>
        </span>
        <span class="label">赚积分</span>
      </div>
    </div>

    <div class="btn">进入创作中心</div>

    <h4 class="notice">公告须知</h4>
  </div>
</template>

<style lang="less" scoped>
.author-main {
  width: 300px;
  height: 100%;
  margin-left: 15px;
  padding: 0 14px;
  border: 1px solid #dedede;
  border-radius: 4px;
  .nav-top {
    display: flex;
    width: 100%;
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
    }
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
    margin: 0px 0px 18px;
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
  .notice {
    font-size: 16px;
    font-weight: 600;
    color: #666;
  }
}
</style>
