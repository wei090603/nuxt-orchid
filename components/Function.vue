<template>
  <div class="function">
    <div class="sticky">
      <div class="author" v-if="!isLogin">
        <div class="author-bg">
          <div class="avatar">
            <img src="@/assets/images/logo.png" alt="" />
          </div>
        </div>
        <div class="text">
          <h4>
            <a href="javascript:;">兰苑</a>
            <div class="medal"></div>
          </h4>
          <p>也许，这将是最大的兰花交流平台</p>
        </div>

        <div class="fun">
          <div class="login" @click="handleLoginClick">登录</div>
          <span></span>
          <div class="register">注册</div>
        </div>
      </div>

      <div class="containerA">
        <div class="title">
          <h3>
            <i class="iconfont icon-suijishushengcheng"></i>
            签到
          </h3>
        </div>
        <div class="sign">
          <div class="first-line">
            <div class="icon-text">
              <span class="hello" data-v-68373e0a="">下午好！</span>
            </div>
            <button
              class="btn sign-btn"
              :class="{ 'is-sign': userInfo?.isSign }"
              @click="handleGoSign"
            >
              {{ userInfo?.isSign ? '已' : '去' }}签到
            </button>
          </div>
          <div class="second-line">点亮你在社区的每一天</div>
        </div>
      </div>

      <div class="containerA">
        <!-- 标题 -->
        <div class="title">
          <h3>
            <i class="iconfont icon-suijishushengcheng"></i>
            热门文章
          </h3>
        </div>

        <div class="random_Alist">
          <ul>
            <li v-for="item in articleHotList" :key="item.id">
              <i class="iconfont icon-xiangyoujiantou"></i>
              <nuxt-link target="_blank" :to="{ path: `/article/${item.id}` }">
                {{ item.title }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- 标签栏 -->
      <div class="containerA">
        <!-- 标题 -->
        <div class="title">
          <h3>
            <i class="iconfont icon-tuya_huabanfuben"></i>
            热门标签
          </h3>
        </div>
        <!-- 标签 -->
        <div class="containerA_Tags">
          <nuxt-link
            :to="{ path: `/article`, query: { tag: item.id } }"
            v-for="item in tagHotList"
            :key="item.id"
          >
            {{ item.name }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getArticleHot, getHotTag } from '@/api/home';
const isLogin = useIsLogin();
const userInfo = useUserInfo();

const state = reactive({
  tagHotList: [],
  articleHotList: [],
});

const [tagData, articleHot] = await Promise.all([getHotTag(), getArticleHot()]);

Object.assign(state, {
  tagHotList: tagData.data.value,
  articleHotList: articleHot.data.value,
});

const handleLoginClick = () => {
  useShowModal();
};

const handleGoSign = () => {
  if (isLogin.value) {
    navigateTo({
      path: '/my/sign',
    });
  } else {
    useShowModal();
  }
};

const { tagHotList, articleHotList } = toRefs(state);
</script>

<style lang="less" scoped>
/* 功能模块 */
.function {
  flex: 1;
  margin-left: 20px;
}

.function .sticky {
  position: sticky;
  top: 70px;

  .author-bg {
    position: relative;
    width: 100%;
    height: 150px;
    background: url(@/assets/images/userBg.jpg) no-repeat;
    background-size: 100% 100%;
    transition: all 0.3s;
  }
  .author {
    overflow: hidden;
    padding-bottom: 20px;
    box-shadow: 0 1px 3px rgb(26 26 26 / 20%);
    background-color: var(--Yuexing-bg);
    border-radius: 3px;
    transition: all 0.3s;
    margin-bottom: 20px;

    .author-bg .avatar {
      position: absolute;
      top: 70%;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 80px;
      line-height: 80px;
      background-color: #fff;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s;
      &:hover {
        transform: translateX(-50%) rotate(180deg);
      }
      img {
        width: 90%;
        height: 90%;
        border-radius: 50%;
      }
    }
    .text {
      text-align: center;
      margin-top: 50px;
    }
  }
}

/* 勋章 */
.function .author .text .medal {
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-left: 5px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

/* 作者名称 */
.function .author .text h4 {
  display: flex;
  justify-content: center;
  margin: 10px 0;
  font-size: 16px;
  font-weight: 500;
}

.function .author .text h4 a {
  color: var(--Yuexing-a);
  transition: all 0.3s;
  font-size: 18px;
}

/* 作者个性签名 */
.function .author .text p {
  padding: 0 10px;
  color: var(--Yuexing-a-vice);
  font-size: 14px;
  line-height: 20px;
  transition: all 0.3s;
}

/* 快捷操作 */
.function .author .fun {
  position: relative;
  height: 40px;
  line-height: 40px;
  margin-top: 20px;
  padding: 0 10px;
}

/* 快捷选项按钮 */
.function .author .fun div {
  float: left;
  width: 125px;
  color: #fff;
  text-align: center;
  border-radius: 3px;
}

/* 登录 */
.function .author .login {
  flex: 1;
  background-color: #539dfd;
  margin-right: 10px;
  transition: all 0.3s;
}

/* 注册 */
.function .author .register {
  flex: 1;
  background-color: #18a058;
  transition: all 0.3s;
}

/* 鼠标经过快捷选项时改变样式 */
.function .author .login:hover {
  background-color: #81aafa;
}

.function .author .register:hover {
  background-color: var(--Yuexing-color);
}

.function .author .fun a {
  display: inline-block;
  width: 100%;
  height: 100%;
  color: #fff !important;
  font-weight: 700;
}

.function .author .fun span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: var(--Yuexing-bg);
  transition: all 0.3s;
}

/* 签到 */
.sign {
  .first-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    .icon {
      margin-right: 12px;
      margin-top: 2px;
    }
    .icon-text {
      display: flex;
      .hello {
        margin-top: 2px;
        color: #1d2129;
        font-size: 18px;
        font-weight: 500;
      }
    }
    .sign-btn {
      border-radius: 50px;
      height: 32px;
      width: 72px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background: var(--Yuexing-color);
      color: #fff;
      font-size: 14px;
      font-weight: 400;
      white-space: nowrap;
      border: none;
      &.is-sign {
        color: var(--Yuexing-color);
        border: 1px solid var(--Yuexing-color);
        background-color: rgba(30, 128, 255, 0.05);
      }
    }
  }
  .second-line {
    margin-bottom: 2px;
    margin-left: 36px;
    color: #4e5969;
    font-size: 14px;
    font-weight: 400;
    display: flex;
    align-items: center;
  }
}

/* 随机文章 */
.containerA {
  width: 280px;
  margin-bottom: 20px;
  padding: 0 10px 20px;
  background-color: var(--Yuexing-bg);
  border-radius: 3px;
  box-shadow: 0 1px 3px rgb(26 26 26 / 20%);
  transition: all 0.3s;
}

/* 标题 */
.function .containerA .title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.function .containerA .title h3 {
  color: var(--Yuexing-a);
  transition: all 0.3s;
}

.function .containerA .title i {
  font-size: 20px;
}

/* 随机文章列表 */
.function .containerA .random_Alist ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}

.function .containerA .random_Alist ul li:hover i,
.function .containerA .random_Alist ul li:hover a {
  color: var(--Yuexing-color);
  transform: translateX(5px);
}

/* 右箭头 */
.function .containerA .random_Alist ul li i {
  color: var(--Yuexing-a-vice);
  font-size: 13px;
  margin-right: 5px;
  transition: all 0.3s;
}

/* 文本 */
.function .containerA .random_Alist ul li a {
  display: inline-block;
  width: 100%;
  /* 单行文本溢出省略号显示 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.3s;
  color: var(--Yuexing-a-vice);
  font-size: 14px;
}

/* 标签栏 */
.function .containerA .containerA_Tags a {
  display: inline-block;
  padding: 10px;
  margin: 3px 4px 3px 0;
  border: 1px solid #f3f4f9;
  border-radius: 3px;
  color: var(--Yuexing-a-vice);
  font-size: 13px;
}

.function .containerA .containerA_Tags a:hover {
  color: var(--Yuexing-color);
  border: 1px solid var(--Yuexing-color);
}
</style>
