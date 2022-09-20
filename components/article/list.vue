<template>
  <div class="list">
    <!-- 列表 -->
    <ul>
      <li v-for="item in articleData.list" :key="item.id">
        <NuxtLink
          class="item"
          target="_blank"
          :to="{ path: `/article/${item.id}` }"
        >
          <!-- 文章缩略图 -->
          <div class="left">
            <img :src="imgUrl + item.coverPicture" alt="" />
            <span class="tags_blue">{{ item.category.title }}</span>
          </div>

          <!-- 文章内容 -->
          <div class="right">
            <!-- 文章标题 -->
            <h2>
              <!-- <span class="tags_purple">精品</span>
                    <span class="tags_red">置顶</span>
                    <span class="tags_yellow">推荐</span> -->
              {{ item.title }}
            </h2>

            <!-- 文章摘要 -->
            <p class="summary">
              {{ item.summary }}
            </p>

            <!-- 文章信息 -->
            <div class="meta">
              <!-- 作者头像 -->
              <div class="author">
                <img :src="imgUrl + item.author.avatar" alt="" />
                <span>{{ item.author.nickName }}</span>
              </div>

              <div class="interact">
                <span @click.stop="handleLikeClick(item)">
                  <i class="iconfont icon-dianzan"></i>
                  {{ item.likeCount }}
                </span>
                <span>
                  <i class="iconfont icon-huo"></i>
                  {{ item.commentCount }}
                </span>
                <!-- 文章发布时间 -->
                <span>
                  <i class="iconfont icon-shijian"></i>
                  {{ item.createdAt }}
                </span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { getArticle, articleLike, articleLikeDel } from '@/api/article';

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;

const articleData = reactive({
  list: [],
  total: 0,
  page: 1,
});
const { data } = await getArticle({ page: articleData.page, size: 10 });

articleData.total = data.value.total;
articleData.list = data.value.list;

// 文章点赞
const handleLikeClick = async (item) => {
  if (item.isLike) {
    try {
      await articleLikeDel(data.value.id);
      data.value.handed = false;
      data.value.likeCount -= 1;
    } catch (_error) {
      // data.articleList[index].likeCount = 0
    }
  } else {
    try {
      await articleLike({ articleId: data.value.id });
      data.value.like = true;
      data.value.likeCount += 1;
    } catch (_error) {}
  }
};
</script>

<style lang="less" scoped>
.list {
  overflow: hidden;
  width: 1250px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(26 26 26 / 20%);
  transition: all 0.3s;
  ul li {
    position: relative;
    width: 100%;
    height: 160px;
    padding: 0 15px;
    background-color: #fff;
    transition: all 0.3s;
    &::after {
      content: '';
      position: absolute;
      left: 0px;
      width: 5px;
      height: 0px;
      border-radius: 3px;
      background-color: var(--Yuexing-color);
      transition: all 0.3s;
      top: 20px;
    }
    &:hover::after {
      height: 30px;
    }
    &:hover .left span {
      right: 10px;
    }
    &:hover {
      background-color: #fafafa;
    }
    .item {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 15px 0;
      border-bottom: 1px solid #ededed;
    }
    .left {
      overflow: hidden;
      position: relative;
      width: 250px;
      height: 100%;
      border-radius: 3px;
      cursor: pointer;
      &::before {
        content: '';
        position: absolute;
        width: 60px;
        top: -100px;
        left: -70px;
        height: 200%;
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 0.2),
          transparent
        );
        transform: rotate(40deg);
        cursor: pointer;
      }
      span {
        position: absolute;
        top: 10px;
        right: -70px;
        transition: all 0.4s;
        font-size: 12px;
      }
      a {
        display: block;
        height: 100%;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
      .tags_blue {
        background-color: var(--Yuexing-color);
        padding: 4px;
        color: #fff;
        border-radius: 3px;
        font-size: 14px;
        font-family: '黑体';
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20px;
      height: 100%;
      h2 {
        width: 100%;
        font-size: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 3px;
      }
      p {
        color: var(--Yuexing-a-vice) !important;
        font-size: 14px;
        transition: all 0.3s;
        /* 多行文本溢出省略号显示 */
        display: -webkit-box !important;
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
      .meta {
        display: flex;
        justify-content: space-between;
        .author {
          font-size: 14px;
          img {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            vertical-align: bottom;
            margin-right: 5px;
          }
        }
        .interact {
          span {
            margin: 0 14px;
            i {
              margin-right: 3px;
            }
          }
        }
      }
    }
    &:last-child {
      border: 0;
    }
  }
}

/* 鼠标经过图片动画 */
@keyframes imgMove {
  0% {
    left: -70px;
  }

  100% {
    left: 340px;
  }
}
</style>
