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
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="icon"
                data-v-68373e0a=""
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 2C8 1.72386 7.77614 1.5 7.5 1.5H6.5C6.22386 1.5 6 1.72386 6 2L5.9995 3H3C2.44772 3 2 3.47259 2 4.05556V7H22V4.05556C22 3.47259 21.5523 3 21 3H18V2C18 1.72386 17.7761 1.5 17.5 1.5H16.5C16.2239 1.5 16 1.72386 16 2V3H8V2ZM22 8.5H2V20.9444C2 21.5274 2.44772 22 3 22H21C21.5523 22 22 21.5274 22 20.9444V8.5Z"
                  fill="#FFCF8B"
                  data-v-68373e0a=""
                ></path>
                <rect
                  x="5"
                  y="12"
                  width="3"
                  height="2"
                  rx="1"
                  fill="#FF7D00"
                  data-v-68373e0a=""
                ></rect>
                <rect
                  x="10.5"
                  y="12"
                  width="3"
                  height="2"
                  rx="1"
                  fill="#FF7D00"
                  data-v-68373e0a=""
                ></rect>
                <rect
                  x="5"
                  y="16"
                  width="3"
                  height="2"
                  rx="1"
                  fill="#FF7D00"
                  data-v-68373e0a=""
                ></rect>
                <rect
                  x="10.5"
                  y="16"
                  width="3"
                  height="2"
                  rx="1"
                  fill="#FF7D00"
                  data-v-68373e0a=""
                ></rect>
                <rect
                  x="16"
                  y="12"
                  width="3"
                  height="2"
                  rx="1"
                  fill="#FF7D00"
                  data-v-68373e0a=""
                ></rect>
                <rect
                  x="16"
                  y="16"
                  width="3"
                  height="2"
                  rx="1"
                  fill="#FF7D00"
                  data-v-68373e0a=""
                ></rect>
              </svg>
              <span class="hello" data-v-68373e0a="">下午好！</span>
            </div>
            <button class="btn signin-btn">
              <span class="btn-text" @click="handleGoSign">去签到</span>
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
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNDkuNDIgNjAuMDEiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjI0LjcxIiB5MT0iMS44OSIgeDI9IjI0LjcxIiB5Mj0iMzguOTIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZjc0MTgiLz48c3RvcCBvZmZzZXQ9Ii4xNyIgc3RvcC1jb2xvcj0iI2YxNTYxYSIvPjxzdG9wIG9mZnNldD0iLjQxIiBzdG9wLWNvbG9yPSIjZGYzMTFiIi8+PHN0b3Agb2Zmc2V0PSIuNjQiIHN0b3AtY29sb3I9IiNkMjE2MWQiLz48c3RvcCBvZmZzZXQ9Ii44NCIgc3RvcC1jb2xvcj0iI2NhMDYxZSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2M3MDAxZSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJiIiB4MT0iOS45IiB5MT0iMTkuNDQiIHgyPSI0Mi4yOSIgeTI9IjU0LjEyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZlMTE4Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZiNTFlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PGcgZGF0YS1uYW1lPSLlm77lsYIgMiIgc3R5bGU9Imlzb2xhdGlvbjppc29sYXRlIj48ZyBkYXRhLW5hbWU9IuWbvuWxgiAxIj48cGF0aCBkPSJNMzkuNjggNDBIOS43NGE1IDUgMCAwIDEtNS01VjVhNSA1IDAgMCAxIDUtNWgyOS45NGE1IDUgMCAwIDEgNSA1djMwYTUgNSAwIDAgMS01IDVaIiBzdHlsZT0iZmlsbDp1cmwoI2EpIi8+PHBhdGggZD0iTTQ5LjQyIDM1LjNhMjQuNzEgMjQuNzEgMCAxIDEtMjQuNzEtMjQuNzFBMjQuNzEgMjQuNzEgMCAwIDEgNDkuNDIgMzUuM1oiIHN0eWxlPSJmaWxsOnVybCgjYikiLz48cGF0aCBkPSJtNDIuMTggMTcuODItMzQuOTUgMzVhMjQuNzEgMjQuNzEgMCAxIDAgMzUtMzQuOTVaIiBzdHlsZT0ib3BhY2l0eTouMDMiLz48aW1hZ2Ugd2lkdGg9IjM3IiBoZWlnaHQ9IjM2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2LjEgMTcuNDgpIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUNVQUFBQWtDQVlBQUFBT3d2T21BQUFBQ1hCSVdYTUFBQXNTQUFBTEVnSFMzWDc4QUFBRUYwbEVRVlJZUjdYWXkyNGNWUkRHOFYvYk0yT1RpeFZpRW00aEVZb0JFU2tTUW9CWXNHSEJFckZqaTU4QlA0ZmZ3US9CRmlKMlNJaUFGQzZDQ0NGaU84Z3hDVW1JN1hqR2RyT29jeklYOS9SNHhxR2swZkVrcDd2KzU2dnFxcG91eXJKMEhGdGFMSXIwWjRFU2xsZU9kOVBpT0ZCTGk4VVVHcGpGTlBheGk4N3lTbmxRZDIyZFRReVZGR3BoSHE5Z0R0dFl4eVoySmdXYkdyV2h4cVp3RWd2NENKL2lFN3lMODJqMmhIWXNhNHphVUdYSldSUFA0UXJlRjNEL0N2WHU0U0h1aTVDT1paTXFsVlc2aEtzQzZPWDAvUXBlRjJHZFNLMnhvWHBVbWhjd3J3bkZabkZhRi9TU0FCL2J4OWdYT0t4U2RqNnRIM2JCaEdxTkJWV2gwaFBIb2s0TkF4N0xUMjJpRHhSR1FvMVRoanV0Q3UwdGJDOHRGbTFSWEVjVzJDZDFxZ0lnTzJqcEt0SENpL2dBSCtNdG5CR3cyVXBSUUcvaEszeUJuL0VJQitpZ25kWU0xZ2RhbEdVNVdKa2I0dVJOVVJEUHA3V1ovdjhDM3NNN2VFbUFEdWJNUGg3Z1IzeU4zd1JVUjVTS08ybnRDTkE5UE1iZThrcDVVSHorV1ova0YzRVdNK256UEM2bmRTYnRPeU1lLzNONFJuVytsRUtOdTFoTmExc291SUhmMDdxYlB2ZUVzbmZSeVRrMUs0QSt4SnZpMFc0NXJGUldkS2JuZTVYMUZ0ZFRRb2tjdWw2bDJxTGcvb0pyMkpLZ0NwRVRjM2dWYndzVkdnN25sSXAxbU9VVWFPclBuV2RGWG5ZRTdLWUkzWGVDbzJpa2pmdWltVDVNRzJkMW42ckNhSUJoVm5XQUtYSFFBNkhNbnZDN0xUaktITDVkM01iM1F2SVowZmxQbUJ4b21PVzU2N0h3K1lQd2UxdHdtRXFQWVVmSWVGM0U5bHVSb052aVJFL1REc1I5VjRXZmE4THZwcGpEeWlsSWM4OE8xdExHTC8wL1lJTkEyYythbnZucnlkT3p2Rkx1QzdEQkM1NFdXQWFxT3ZoTzhvK0JSN29HYk0zeHdPcFNwQStJaWpwVEFYWk5KT0xmK2x2RHVMWXJSdVhyNG40NVpJZUd3TXJpMXdPMmpodWlYV3lJWWplSlphVWVpSHZlTVFTSStwRWk5NlRkdEU2cVVMWU10cXZiOHlwdDFKelRGTDN3UWxwYjlkdVBaQ01QVndkVmlGWnpXdlMvMCtuN2NZdnB5T3RIL1pxcG1xa0dyYmV2MWZYRm85d0xvOFBIOE42WGUyYnU5QS9TMms3LzNodW1ERFFueHFBNU5iTjduVkxEVGxicWppRmJZaGJhRUhYc2hIQjZWalQwM3ZHbUpkTGdjbHIva25yZG9GVkNwUlBrZkRvblpxSnAzU2R5U3d4a3QzQVR2NG9mbm1md2hwak5MNHJCTWNNMTlNOW5PVDhQSlg2ZFVpM2QyZWVFVU9hZjlNa3dOOUs2SmtCUDRpY0JkVlUvM0t6RFlhMjBPcWhTcUhJZmY0cFI0eEgrRU1YMHB1NEl1eVVjVG90V2txRXozQUplU05ldmkvd2JXdnZxb05waXh2bEdWT0I1b2RLcWZwZ09EcFpYeW5KcHNkalR6YlhlOEM2SXFiWWo1cWQxUS9JSncxOEZwVjg0VFJHU09SSENIVEVsOXNGVVhGdm9qc01uUmVMUEMyVTJqSGhWVlB0K3F1Zm0wN292eGZZTmdSbTBudXNidXQyZ2JjUkx0U08vTkZ0YUxJcWpnRlRaWUQwYWRaLy9BQXpCb3NuTU94bUxBQUFBQUVsRlRrU3VRbUNDIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6bXVsdGlwbHk7b3BhY2l0eTouMiIvPjxwYXRoIGQ9Im0zOC44NSAzMS05LjA2LTEuMzEtNC4wNS04LjE5YTEuMyAxLjMgMCAwIDAtLjUyLS41MiAxLjE1IDEuMTUgMCAwIDAtMS41My41MmwtNC4wNSA4LjIyTDEwLjU3IDMxYTEuMTkgMS4xOSAwIDAgMC0uNjUuMzMgMS4xNSAxLjE1IDAgMCAwIDAgMS42Mmw2LjU2IDYuMzlMMTUgNDguNGExLjEzIDEuMTMgMCAwIDAgMS42NSAxLjJsOC4xMS00LjI2IDguMTEgNC4yNmExLjEzIDEuMTMgMCAwIDAgMS42NS0xLjJsLTEuNTUtOSA2LjUxLTYuNGExLjA3IDEuMDcgMCAwIDAgLjMzLS42NSAxLjE0IDEuMTQgMCAwIDAtMS0xLjNaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9nPjwvZz48L3N2Zz4=);
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
    .signin-btn {
      border: 1px solid var(--Yuexing-color);
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .btn {
      border-radius: 50px;
      height: 32px;
      width: 72px;
      .btn-text {
        color: var(--Yuexing-color);
        font-size: 14px;
        font-weight: 400;
        white-space: nowrap;
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
