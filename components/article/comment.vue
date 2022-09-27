<template>
  <div class="comments">
    <div class="title">
      <i class="iconfont icon-pinglun"></i>
      <span>评论</span>
    </div>
    <div class="content">
      <div class="avatar-box">
        <img
          class="avatar"
          src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/58aaf1326ac763d8a1054056f3b7f2ef.svg"
        />
      </div>
      <div class="form-box">
        <div :class="[{ focused: focused }, 'input-box']">
          <div
            contenteditable="true"
            spellcheck="false"
            placeholder="来发一针见血的评论吧!"
            @blur="handleBlurInput"
            @input="handleInputEvent"
            @focus="handleFocusInput"
            disabled="disabled"
            :class="[{ empty: placeholder }, 'rich-input']"
            v-html="content"
          ></div>
          <div class="login-guide" v-if="!isLogin">
            <div class="login-guide-text">看完啦，</div>
            <div class="login-guide-button">登录</div>
            <div class="login-guide-text">分享一下感受吧～</div>
          </div>
        </div>

        <div class="action-box" v-if="isLogin">
          <div class="emoji-container emoji-btn">表情包</div>
          <div class="submit">
            <n-button type="primary" @click="handleCreateComment">发表评论</n-button>
          </div>
        </div>
      </div>
    </div>

    <div class="comment-list-wrapper">
      <div class="title">全部评论 {{ data.total }}</div>
      <div class="comment-list">
        <div
          class="comment-item"
          v-if="data.list.length > 0"
          v-for="item in data.list"
          :key="item.id"
        >
          <div class="avatar">
            <img :src="imgUrl + item.user.avatar" />
          </div>
          <div class="content-box">
            <div class="comment-main">
              <div class="user-box">
                <span class="name">{{ item.user.nickName }}</span>
                <time :datetime="item.createdAt">
                  {{ item.createdAt }}
                </time>
              </div>
              <div class="content">{{ item.content }}</div>
              <div class="action-box">
                <div class="item dig-item">赞：{{ item.likeCount }}</div>
                <div class="item">评论：{{ item.children.length }}</div>
              </div>
              <div class="comment-form focused reply">
                <div data-v-48a7e3c5="" class="form-box">
                  <div class="input-box">
                    <div
                      contenteditable="true"
                      spellcheck="false"
                      placeholder="来发一针见血的评论吧!"
                      @blur="content = $event.target.innerHTML"
                      @input="handleInputEvent"
                      disabled="disabled"
                      :class="[{ empty: placeholder }, 'rich-input']"
                      v-html="content"
                    ></div>
                  </div>
                </div>
                <div class="action-box">
                  <div class="emoji-container emoji-btn">表情包</div>
                  <div class="submit">
                    <n-button type="primary" @click="handleCreateComment">发表评论</n-button>
                  </div>
                </div>
              </div>
            </div>

            <div class="sub-comment-wrapper" v-if="item.children.length">
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
                      <div class="item dig-item">赞：{{ children.likeCount }}</div>
                      <div class="item">回复</div>
                    </div>
                  </div>
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
import { createDiscreteApi, NButton } from 'naive-ui';
import { getCommentList, createComment } from '@/api/article';

const { message } = createDiscreteApi(['message']);

const route = useRoute();
const isLogin = useIsLogin();

const env = useRuntimeConfig();
const imgUrl: string = env.public.VITE_FILE_URL;

const id = route.params.id as string;

const content = ref('');
const placeholder = ref(true);
const focused = ref(false);

const { data, refresh } = await getCommentList(id);

const handleCreateComment = async () => {
  try {
    await createComment({ articleId: id, content: content.value });
    refresh();
    content.value = '';
    placeholder.value = true;
    message.success('评论成功');
  } catch (_error) {}
};

const handleInputEvent = (event) => {
  placeholder.value = !event.target.innerHTML;
};

const handleFocusInput = () => {
  focused.value = true;
};

const handleBlurInput = (event) => {
  focused.value = false;
  content.value = event.target.innerHTML;
};
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
    .form-box {
      flex: 1 1 auto;
      position: relative;
      .input-box {
        font-size: 0;
        transition: all 0.3s;
        background: #f2f3f5;
        border: 1px solid #f2f3f5;
        border-radius: 4px;
        position: relative;
        &.focused {
          border-color: var(--Yuexing-color);
          background: #fff;
        }
        .rich-input {
          position: relative;
          padding: 8px 12px;
          color: #252933;
          outline: none;
          min-height: 64px;
          box-sizing: border-box;
          line-height: 22px;
          font-size: 14px;
          resize: both;
          &.empty {
            &::before {
              content: attr(placeholder);
              position: absolute;
              pointer-events: none;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
              color: #8a919f;
            }
          }
        }
      }
      .login-guide {
        width: 100%;
        height: 100%;
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
      .action-box {
        display: flex;
        align-items: center;
        margin-top: 8px;
        .submit {
          flex: 0 0 auto;
          margin-left: auto;
        }
      }
    }
  }
  .comment-list-wrapper {
    padding-top: 40px;
    .title {
      position: relative;
      line-height: 30px;
      font-weight: 600;
      font-size: 18px;
      color: #252933;
      width: 100%;
      justify-content: space-between;
      padding-bottom: 8px;
    }
    .comment-list {
      .comment-item {
        display: flex;
        padding: 16px 0;
        border-bottom: 1px dashed #ebebeb;
        font-size: 14px;
        transition: all 0.3s;
        &:last-of-type {
          border-bottom: 0;
        }

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
          padding-top: 5px;
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
            }
          }

          .comment-form {
            display: flex;
            position: relative;
            padding-top: 2rem;
            border-radius: 2px;
            flex-direction: column;

            .form-box {
              flex: 1 1 auto;
              position: relative;
              .input-box {
                font-size: 0;
                transition: all 0.3s;
                background: #f2f3f5;
                border: 1px solid #f2f3f5;
                border-radius: 4px;
                position: relative;
                .rich-input {
                  position: relative;
                  padding: 8px 12px;
                  color: #252933;
                  outline: none;
                  min-height: 64px;
                  box-sizing: border-box;
                  line-height: 22px;
                  font-size: 14px;
                  resize: both;
                  &.empty {
                    &::before {
                      content: attr(placeholder);
                      position: absolute;
                      pointer-events: none;
                      -webkit-user-select: none;
                      -moz-user-select: none;
                      -ms-user-select: none;
                      user-select: none;
                      color: #8a919f;
                    }
                  }
                }
              }
              .login-guide {
                width: 100%;
                height: 100%;
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
            .action-box {
              display: flex;
              align-items: center;
              margin-top: 8px;
              .submit {
                flex: 0 0 auto;
                margin-left: auto;
              }
            }
          }

          .sub-comment-wrapper {
            padding: 16px;
            .sub-comment-item {
              display: flex;
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
                      padding: 0 12px;
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
  }
}
</style>
