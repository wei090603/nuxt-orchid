<template>
  <div class="comments">
    <div class="title">
      <i class="iconfont icon-pinglun"></i>
      <span>评论</span>
    </div>

    <div class="content">
      <div class="avatar-box">
        <img class="avatar" src="http://127.0.0.1:4000/uploads/default_avatar.png" />
      </div>
      <div class="firt-form">
        <CommentInput
          v-if="isLogin"
          @handleCommentClick="handleCreateComment"
          v-model:content="content"
          v-model:focused="focused"
          v-model:placeholder="placeholder"
        />
        <div class="login-guide" v-if="!isLogin">
          <div class="login-guide-text">看完啦，</div>
          <div class="login-guide-button">登录</div>
          <div class="login-guide-text">分享一下感受吧～</div>
        </div>
      </div>
    </div>

    <div class="title-all">全部评论 {{ data.total }}</div>
    <div class="comment-list" v-if="data.list.length > 0">
      <div class="comment-item" v-for="item in data.list" :key="item.id">
        <div class="avatar">
          <img :src="imgUrl + item.user.avatar" />
        </div>
        <div class="content-box">
          <div class="user-box">
            <span class="name">{{ item.user.nickName }}</span>
            <time :datetime="item.createdAt">{{ item.createdAt }}</time>
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="action-box">
            <div class="item dig-item">
              点赞
              <span v-if="item.likeCount > 0">{{ item.likeCount }}</span>
            </div>
            <div v-show="currentReply === item.id" class="item cancel" @click="handleCancelClick">
              取消回复
            </div>
            <div
              v-show="currentReply !== item.id"
              class="item"
              @click="handleCommentClick(item.id)"
            >
              回复
              <span v-if="item.children.length > 0">{{ item.children.length }}</span>
            </div>
          </div>
          <div class="comment-form" v-show="currentReply === item.id">
            <CommentInput
              @handleCommentClick="handleSubComment"
              v-model:content="content"
              v-model:focused="focused"
              v-model:placeholder="placeholder"
            />
          </div>

          <div class="sub-comment-list" v-if="item.children.length">
            <div class="sub-comment-item" v-for="children in item.children" :key="children.id">
              <div class="avatar">
                <img :src="imgUrl + item.user.avatar" />
              </div>
              <div class="content-box">
                <div class="content-wrapper">
                  <div class="user-box">
                    <div class="name">
                      {{ children.user.nickName }}
                      <span v-if="children.reply.id !== item.user.id">
                        <span class="reply">回复</span>
                        {{ children.reply.nickName }}
                      </span>
                    </div>
                    <time :datetime="item.createdAt">
                      {{ children.createdAt }}
                    </time>
                  </div>
                  <div class="content">{{ children.content }}</div>
                  <div class="action-box">
                    <div class="item dig-item">
                      点赞
                      <span v-if="children.likeCount > 0">{{ children.likeCount }}</span>
                    </div>
                    <div
                      v-show="currentReply === children.id"
                      class="item cancel"
                      @click="handleCancelClick"
                    >
                      取消回复
                    </div>
                    <div
                      v-show="currentReply !== children.id"
                      class="item"
                      @click="handleSubCommentClick(children.id, item.id, children.user.id)"
                    >
                      回复
                    </div>
                  </div>
                </div>

                <div class="comment-form focused reply" v-show="currentReply === children.id">
                  <CommentInput
                    @handleCommentClick="handleSubComment"
                    v-model:content="content"
                    v-model:focused="focused"
                    v-model:placeholder="placeholder"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createDiscreteApi } from 'naive-ui';
import { getCommentList, createComment, createSubComment } from '@/api/article';
import CommentInput from './commentInput.vue';

const route = useRoute();
const isLogin = useIsLogin();

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;

const id = route.params.id as string;

const placeholder = ref(true);
const focused = ref(false);

const content = ref<string>('');
// 当前选中得回复id
const currentReply = ref<number>(0);
// 回复的一级id
const parentId = ref<number>(0);
// 回复用户id
const replyId = ref<number>(0);

const { data, refresh } = await getCommentList(id);

const handleCreateComment = async () => {
  const { message } = createDiscreteApi(['message']);
  try {
    await createComment({ articleId: id, content: content.value });
    refresh();
    content.value = '';
    placeholder.value = true;
    message.success('评论成功');
  } catch (_error) {}
};

// 点击评论回复按钮
const handleCommentClick = (id: number) => {
  if (!isLogin.value) {
    useShowModal();
    return false;
  }
  currentReply.value = id;
};

// 点击二级评论回复按钮
const handleSubCommentClick = (id: number, parent: number, reply: number) => {
  if (!isLogin.value) {
    useShowModal();
    return false;
  }
  currentReply.value = id;
  parentId.value = parent;
  replyId.value = reply;
};

// 提交二级评论
const handleSubComment = async () => {
  const { message } = createDiscreteApi(['message']);
  try {
    await createSubComment({
      articleId: id,
      content: content.value,
      parentId: parentId.value,
      replyId: replyId.value,
    });
    refresh();
    currentReply.value = 0;

    message.success('评论成功');
  } catch (_error) {}
};

// 取消评论
const handleCancelClick = () => {
  currentReply.value = 0;
  parentId.value = 0;
  content.value = '';
};

watch(
  () => currentReply.value,
  () => {
    parentId.value = 0;
    content.value = '';
    placeholder.value = true;
  }
);
</script>

<style lang="less" scoped>
.comments {
  margin-top: 20px;
  padding: 20px;
  background: #fff;
  .title {
    padding-bottom: 15px;
    font-size: 18px;
    border-bottom: 1px solid #ededed;
    font-weight: 600;
    i {
      font-size: 18px;
    }
  }

  .content {
    display: flex;
    align-items: flex-start;
    margin-top: 20px;
    .avatar-box {
      flex: 0 0 auto;
      .avatar {
        margin-right: 16px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .firt-form {
      flex: 1 1 auto;
      position: relative;
      .login-guide {
        width: 100%;
        min-height: 60px;
        background-color: #f2f3f5;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        color: #252933;
        font-size: 15px;
        font-weight: 400;
        .login-guide-button {
          color: #1e80ff;
          font-weight: 500;
          cursor: pointer;
          margin: 0 4px;
        }
      }
    }
  }

  .title-all {
    width: 100%;
    font-weight: 600;
    font-size: 18px;
    color: #252933;
    padding-bottom: 8px;
    padding-top: 40px;
  }
  .comment-list {
    .comment-item {
      display: flex;
      font-size: 14px;
      padding-top: 15px;
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        img {
          width: 100%;
        }
      }

      .content-box {
        width: 100%;
        margin-left: 15px;
        .user-box {
          display: flex;
          align-items: center;
          .name {
            font-weight: 500;
            font-size: 15px;
            color: #252933;
            max-width: 128px;
            line-height: 26px;
          }
          time {
            margin-left: auto;
            font-size: 14px;
            color: #8a919f;
            line-height: 22px;
          }
        }
        .content {
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          font-size: 14px;
          color: #515767;
          margin-top: 8px;
          -webkit-line-clamp: 6;
        }
        .action-box {
          display: flex;
          align-items: center;
          margin-top: 8px;
          user-select: none;
          .item {
            margin-right: 16px;
            line-height: 22px;
            font-size: 14px;
            cursor: pointer;
            color: #8a919f;
            &:hover {
              color: var(--Yuexing-color);
            }
            &.cancel {
              color: var(--Yuexing-color);
            }
          }
        }
        .comment-form {
          padding-top: 1rem;
        }

        .sub-comment-list {
          padding: 15px;
        }
        .sub-comment-item {
          display: flex;
          margin-bottom: 10px;
          .avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            img {
              width: 100%;
            }
          }
          .content-box {
            flex: 1 1 auto;
            margin-left: 12px;
            .user-box {
              .name {
                max-width: fit-content;
                .reply {
                  padding: 0 8px;
                  font-size: 14px;
                  line-height: 22px;
                  color: #8a919f;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
