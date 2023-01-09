<template>
  <div class="wrapper">
    <LoadingGroup :pending="pending" :error="error" :isEmpty="data.length === 0">
      <div class="dynamic-container">
        <div class="dynamic-item">
          <div class="source-header">沉默王二 赞了这篇文章</div>

          <div class="content-wrapper">
            <div class="article-header">
              <div class="author-info author-bar">
                <div class="popover-box user-popover">
                  <a href="/user/3518877442254759" target="_blank" rel="" class="user-link">
                    <img
                      src="https://p3-passport.byteimg.com/img/user-avatar/57119c7e9db623b30c8d9a0d3851f73f~100x100.awebp"
                      alt="楼仔的头像"
                      class="lazy avatar"
                      loading="lazy"
                    />
                  </a>
                </div>
                <div class="author-info-content">
                  <div class="author-info-head">
                    <div class="popover-box user-popover">
                      <!---->
                      <a href="/user/3518877442254759" target="_blank" rel="" class="username">
                        楼仔
                      </a>
                    </div>
                  </div>
                  <div class="meta-box">
                    <div class="position ellipsis">一枚小小的Go/Java代码搬运工 @ 武汉小米科技</div>
                    <div class="dot">·</div>
                    6天前
                  </div>
                </div>
                <n-button class="btn" type="primary" ghost>关注</n-button>
              </div>
            </div>
            <div class="post-item-content">
              <a href="/post/7153214385236738055" target="_blank" class="post-link">
                <div class="post-item-title">
                  <h3>76 张图，剖析 Spring AOP 源码，小白居然也能看懂，大神，请收下我的膝盖！</h3>
                </div>
                <div class="rich-content">
                  <div class="post-item-excerpt">111</div>
                </div>
              </a>
            </div>
          </div>

          <div class="action-box post-item-actions">
            <div class="action like-action">
              <div class="action-title-box">
                <span class="icon like-icon"></span>
                <span class="action-title">22</span>
              </div>
            </div>
            <div class="action comment-action">
              <div class="action-title-box">
                <span class="icon comment-icon"></span>
                <span class="action-title">3</span>
              </div>
            </div>
            <div class="action share-action">
              <div class="action-title-box">
                <span class="icon share-icon"></span>
                <span class="action-title">分享</span>
              </div>
            </div>
          </div>
        </div>

        <div class="dynamic-item">
          <div class="action-item content-item" rank="16">
            <div class="author-info">
              <div class="popover-box user-popover">
                <a href="/user/958429870690413" target="_blank" rel="" class="user-link">
                  <img
                    src="https://p3-passport.byteimg.com/img/user-avatar/b6bfc3ccd6d610412b216b9c346ef533~100x100.awebp"
                    alt="沉默王二的头像"
                    class="lazy avatar avatar"
                    loading="lazy"
                  />
                </a>
              </div>
              <div class="author-info-content">
                <div class="author-info-head">
                  <div class="popover-box user-popover author-info-item">
                    <a href="/user/958429870690413" target="_blank" rel="" class="username">
                      沉默王二
                    </a>
                  </div>
                  <span>关注了</span>
                  <div class="popover-box user-popover author-info-item">
                    <a href="/user/377887729916126" target="_blank" rel="" class="username">
                      一灰灰
                    </a>
                  </div>
                </div>
                <div class="meta-box">
                  <div class="position ellipsis">微信搜 @ 沉默王二</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoadingGroup>
  </div>
</template>

<script lang="ts" setup>
import { getArticle } from '~~/api/user';

const route = useRoute();

const id = route.params.id as string;

const { pending, data, error } = await getArticle(Number(id), { page: 1, limit: 10 });
console.log(data.value, 'data');
</script>

<style lang="less" scoped>
.dynamic-item {
  width: auto;
  height: auto;
  background-color: #fff;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 0.2rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  .source-header {
    padding: 0 20px;
    display: flex;
    height: 43px;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    font-size: 13px;
    color: #8a9aa9;
    box-sizing: border-box;
  }

  .article-header {
    position: relative;
    padding: 16px 20px 0;
    .author-info {
      display: flex;
      align-items: center;
      .avatar {
        flex: 0 0 auto;
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
      .author-info-content {
        margin-left: 15px;
        font-size: 15px;
        color: #8a9aa9;
        .meta-box {
          display: flex;
          align-items: center;
          margin: 0.3rem 0 0;
          font-size: 13px;
          color: #8a9aa9;
          cursor: default;
        }
      }
      .btn {
        margin: 0 0 0 auto;
      }
    }
  }

  .post-item-content {
    margin-left: 60px;
    padding: 6px 20px 10px;
    .post-link {
      display: block;
      .post-item-title h3 {
        margin: 0;
        display: inline;
        font-size: 17px;
        color: #17181a;
        line-height: 1.5;
      }
      .rich-content {
        margin-top: 3px;
        padding: 3px 0;
        display: flex;
        .post-item-excerpt {
          margin-right: 16px;
          font-size: 15px;
          color: #5c6066;
          line-height: 1.53;
          flex: 1 1 auto;
        }
      }
    }
  }

  .action-box {
    display: flex;
    position: relative;
    margin-top: 3px;
    height: 34px;
    border-top: 1px solid #ebebeb;
    .action {
      flex: 1 1 33.333%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      height: 100%;
      cursor: pointer;
      user-select: none;
      &:not(:last-child):after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -1rem;
        width: 1px;
        height: 2rem;
        background-color: #ebebeb;
      }
      &:not(:last-child):after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -1rem;
        width: 1px;
        height: 2rem;
        background-color: #ebebeb;
      }
    }
  }

  .content-item {
    .author-info {
      padding: 16px 20px;
      display: flex;
      align-items: center;
      .avatar {
        flex: 0 0 auto;
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
      .author-info-content {
        width: calc(100% - 65px);
        margin-left: 1rem;
        font-size: 15px;
        color: #8a9aa9;
        .author-info-head {
          display: flex;
          align-items: center;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
