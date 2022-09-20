<template>
  <div class="wrapper">
    <n-carousel show-arrow autoplay>
      <img
        v-for="(item, index) in advertiseList"
        :key="index"
        class="carousel-img"
        :src="imgUrl + item.picture"
        :alt="item.title"
      />
      <template #arrow="{ prev, next }">
        <div class="custom-arrow">
          <button type="button" class="curtom-arrow--left" @click="prev">
            <n-icon><ArrowBack /></n-icon>
          </button>
          <button type="button" class="curtom-arrow--right" @click="next">
            <n-icon><ArrowForward /></n-icon>
          </button>
        </div>
      </template>
      <template #dots="{ total, currentIndex, to }">
        <ul class="custom-dots">
          <li
            v-for="index of total"
            :key="index"
            :class="{ ['is-active']: currentIndex === index - 1 }"
            @click="to(index - 1)"
          />
        </ul>
      </template>
    </n-carousel>

    <!-- 主体内容 -->
    <div class="main">
      <div class="container">
        <!-- 文章列表 -->
        <ArticleList />

        <!-- 功能模块 -->
        <div class="function">
          <div class="sticky">
            <!-- 作者详情 -->
            <div class="author">
              <!-- 背景图片 -->
              <div class="author-bg">
                <!-- 头像 -->
                <div class="avatar">
                  <img src="@/assets/images/logo.png" alt="" />
                </div>
              </div>

              <!-- 作者信息 -->
              <div class="text">
                <h4>
                  <a href="javascript:;">悦兴</a>
                  <div class="medal"></div>
                </h4>
                <p>也许，将会是最好用的博客管理系统</p>
              </div>

              <!-- 功能 -->
              <div class="fun">
                <!-- 发布文章 -->
                <div class="login"><a href="javascript:;">登录</a></div>

                <span></span>

                <!-- 登录后台 -->
                <div class="register"><a href="javascript:;">注册</a></div>
              </div>
            </div>

            <div class="sign">签到</div>

            <div class="containerA">
              <!-- 标题 -->
              <div class="title">
                <h3>
                  <i class="iconfont icon-suijishushengcheng"></i>
                  热门文章
                </h3>
              </div>

              <!-- 随机文章 -->
              <div class="random_Alist">
                <ul>
                  <li>
                    <i class="iconfont icon-xiangyoujiantou"></i>
                    <a href="javascript:;">2022 年的 React 生态</a>
                  </li>

                  <li>
                    <i class="iconfont icon-xiangyoujiantou"></i>
                    <a href="javascript:;">
                      字节跳动自研高性能微服务框架 Kitex 的演进之旅
                    </a>
                  </li>

                  <li>
                    <i class="iconfont icon-xiangyoujiantou"></i>
                    <a href="javascript:;">
                      两年前端，广州求职，要价
                      14k，依我说，小伙子可以多要点，涉及组件建设、工程化以及丰富的项目经验
                    </a>
                  </li>

                  <li>
                    <i class="iconfont icon-xiangyoujiantou"></i>
                    <a href="javascript:;">
                      解放双手！推荐一款阿里开源的低代码工具，YYDS！
                    </a>
                  </li>

                  <li>
                    <i class="iconfont icon-xiangyoujiantou"></i>
                    <a href="javascript:;">
                      Web3.0来了，花呗借呗前端团队开源的Web图形引擎会成为元宇宙的技术支撑吗？
                    </a>
                  </li>

                  <li>
                    <i class="iconfont icon-xiangyoujiantou"></i>
                    <a href="javascript:;">
                      超越 Nginx！号称下一代 Web 服务器，用起来够优雅！
                    </a>
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NIcon, NCarousel } from 'naive-ui';
import { ArrowBack, ArrowForward } from '@vicons/ionicons5';
import { getAdvertise, getHotTag } from '@/api/home';

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;

useHead({
  title: '兰花交流',
});

const state = reactive({
  page: 1,
  toatal: 0,
  advertiseList: [],
  tagHotList: [],
});

await getAdvertise({ position: 'home' }).then(({ data }) => {
  state.advertiseList = data;
});

await getHotTag().then(({ data }) => {
  state.tagHotList = data;
});

const { advertiseList, tagHotList } = toRefs(state);
</script>

<style lang="less" scoped>
.wrapper {
  padding-top: 60px;
}

.carousel-img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.custom-arrow {
  display: flex;
  position: absolute;
  bottom: 25px;
  right: 10px;
}

.custom-arrow button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-right: 12px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-width: 0;
  border-radius: 8px;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-arrow button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.custom-arrow button:active {
  transform: scale(0.95);
  transform-origin: center;
}

.custom-dots {
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.custom-dots li {
  display: inline-block;
  width: 12px;
  height: 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background: #fff;
}

/* 主体内容 */
.main {
  padding-top: 10px;
  margin-bottom: 5px;
  .container {
    display: flex;
    justify-content: space-between;
    width: 1250px;
    margin: 0 auto;
  }
}

/* 功能模块 */
.function {
  flex: 1;
  margin-left: 20px;
}

.function .sticky {
  position: sticky;
  top: 70px;
}

/* 背景图片 */
.function .author-bg {
  position: relative;
  width: 100%;
  height: 150px;
  background: url(@/assets/images/userBg.jpg) no-repeat;
  background-size: 100% 100%;
  transition: all 0.3s;
}

/* 作者详情 */
.function .author {
  overflow: hidden;
  padding-bottom: 20px;
  box-shadow: 0 1px 3px rgb(26 26 26 / 20%);
  background-color: var(--Yuexing-bg);
  border-radius: 3px;
  transition: all 0.3s;
}

/* 作者头像 */
.function .author-bg .avatar {
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
}

/* 头像 */
.function .author-bg .avatar img {
  width: 90%;
  height: 90%;
  border-radius: 50%;
}

/* 鼠标经过作者头像就让他旋转 */
.function .author-bg .avatar:hover {
  transform: translateX(-50%) rotate(180deg);
}

/* 作者信息 */
.function .author .text {
  text-align: center;
  margin-top: 50px;
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
  background-color: #5fb878;
  transition: all 0.3s;
}

/* 鼠标经过快捷选项时改变样式 */
.function .author .login:hover {
  background-color: #81aafa;
}

.function .author .register:hover {
  background-color: #81c694;
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
  width: 280px;
  margin-top: 20px;
  padding: 0 10px 20px;
  background-color: var(--Yuexing-bg);
  border-radius: 3px;
  box-shadow: 0 1px 3px rgb(26 26 26 / 20%);
  transition: all 0.3s;
}

/* 随机文章 */
.containerA {
  width: 280px;
  margin-top: 20px;
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

/* 功能模块 */
</style>
