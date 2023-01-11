<template>
  <div class="wrapper">
    <div class="header">
      <div class="container">
        <div class="left">
          <span class="logo" @click="handleGoHome"></span>
          <i></i>
          <div class="page-title">写文章</div>
        </div>
        <div class="right"><Avatar /></div>
      </div>
    </div>
    <div class="main">
      <n-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <n-form-item label="" path="title" label-placement="left">
          <n-input
            class="title"
            type="text"
            v-model:value="form.title"
            placeholder="请输入标题(最多 100 个字)"
          />
        </n-form-item>

        <n-form-item label="" path="content" label-placement="left">
          <Editor v-model:contentValue="form.content" />
        </n-form-item>

        <div class="content-setting">发布设置</div>
        <n-form-item label="上传封面图" path="coverPicture" label-placement="left">
          <div>
            <ClientOnly>
              <n-upload
                class="upload"
                :action="actionUrl"
                :default-file-list="fileList"
                list-type="image-card"
                @preview="handlePreview"
                :on-finish="onFinish"
                :headers="{}"
                :max="1"
              ></n-upload>
            </ClientOnly>
            <div class="img-tips">图片上传格式支持 JPEG、JPG、PNG</div>
          </div>
        </n-form-item>

        <n-form-item label="分类" path="categoryId" label-placement="left">
          <n-cascader
            v-model:value="form.categoryId"
            placeholder="请选择分类"
            :options="selectOptions"
            label-field="title"
            value-field="id"
            check-strategy="child"
          />
        </n-form-item>

        <n-form-item label="标签" path="tag" label-placement="left" class="tag">
          <n-tag
            v-for="(item, index) in form.tag"
            :key="item.id"
            closable
            size="large"
            @close="handleClose(index)"
          >
            {{ item.name }}
          </n-tag>
          <n-tooltip
            v-if="isShowAdd"
            :style="{ minWidth: '200px', backgroundColor: '#fff', color: '#333' }"
            :show-arrow="false"
            :show="topicList.length > 0"
            trigger="click"
          >
            <template #trigger>
              <n-input placeholder="搜索话题" @input="handleInput">
                <template #prefix>
                  <n-icon :component="Search" />
                </template>
              </n-input>
            </template>
            <div>
              <p
                class="topic-item-p"
                v-for="(item, index) in topicList"
                :key="index"
                @click="selTopicClick(item)"
              >
                {{ item.name }}
              </p>
            </div>
          </n-tooltip>
          <n-button v-if="form.tag.length < 5" @click="addArticleClick">+ 添加话题</n-button>
        </n-form-item>
      </n-form>
    </div>

    <n-modal v-model:show="showModal" preset="card" style="width: 600px" title="图片查看">
      <img :src="previewImageUrl" style="width: 100%" />
    </n-modal>

    <div class="release-setting">
      <div class="content">
        <div class="left">
          <span>发布设置</span>
          <span class="content-length" v-show="contentLength > 0">字数：{{ contentLength }}</span>
        </div>
        <div class="right">
          <n-button strong secondary class="preview">预览</n-button>
          <n-button type="primary" @click="publishClick">发布</n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UploadFileInfo, FormRules, CascaderOption, FormInst, useMessage } from 'naive-ui';
import { getCategory, getTag, addArticle } from '@/api/article';
import { Search } from '@vicons/ionicons5';

interface ITagItem {
  id: number;
  name: string;
}

interface IArticleForm {
  title: string;
  content: string;
  coverPicture: string;
  categoryId: string | null;
  status: number;
  type: number;
  tag: ITagItem[];
}

definePageMeta({
  layout: false,
  middleware: ['auth'], // 用户登录验证
});
const router = useRouter();
const env = useRuntimeConfig();
const actionUrl: string = env.public.VITE_FILE_ACTION_URL;
const fileUrl: string = env.public.VITE_FILE_URL;

const form = ref<IArticleForm>({
  title: '',
  content: '',
  coverPicture: '',
  categoryId: null,
  status: 1,
  type: 1,
  tag: [],
});

const rules: FormRules = {
  title: [
    {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入标题',
    },
  ],
  content: [
    {
      required: true,
      trigger: ['blur'],
      message: '请输入内容',
    },
  ],
  coverPicture: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: '请添加文章封面图',
    },
  ],
  categoryId: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: '请选择分类',
      type: 'number',
    },
  ],
  tag: [
    {
      required: true,
      trigger: ['blur'],
      message: '请添加话题',
      type: 'array',
    },
  ],
};

const fileList = ref<UploadFileInfo[]>([]);

const showModal = ref(false);

const previewImageUrl = ref('');

const isShowAdd = ref(false);
const selectOptions = ref<CascaderOption[]>([]);

const topicList = ref<{ id: number; name: string }[]>([]);

const contentLength = computed(() => {
  const re1 = new RegExp('<.+?>', 'g'); //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
  const msg = form.value.content.replace(re1, ''); //执行替换成空字符
  return msg.length;
});

const handleGoHome = () => {
  navigateTo('/');
};

// 话题输入框内容变化 匹配标签
const handleInput = async (val: string) => {
  if (!val) {
    topicList.value = [];
    return;
  }
  const { data } = await getTag(val);
  topicList.value = data.value;
};

// 弹窗选中话题
const selTopicClick = (row: ITagItem) => {
  const index = form.value.tag.findIndex((item) => item.name === row.name);
  if (index >= 0) {
    message.error('该话题已存在，请重新添加');
    return false;
  }
  isShowAdd.value = false;
  form.value.tag.push(row);
  topicList.value = [];
};

// 话题标签删除
const handleClose = (index: number): void => {
  form.value.tag.splice(index, 1);
};

// 点击添加话题按钮
const addArticleClick = () => {
  isShowAdd.value = true;
};

// 分类列表
const { data: categoryList } = await getCategory();
selectOptions.value = categoryList.value;

const formRef = ref<FormInst | null>(null);

const message = useMessage();

// 发布
const publishClick = async () => {
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      await addArticle(form.value);
      message.success('发布成功');
      router.push({ path: '/published' });
    } else {
      message.error('验证失败，请填写完整信息');
    }
  });
};

const onFinish = (options: { file: UploadFileInfo; event?: ProgressEvent }) => {
  const res = JSON.parse(options.event?.target?.response);
  if (res?.code === 200) {
    const time = Date.now() + '';
    fileList.value.push({
      id: time,
      name: time,
      status: 'finished',
      url: fileUrl + res.data.url,
      type: 'image/*',
    });
    form.value.coverPicture = res.data.url;
  }
};

const handlePreview = () => {
  previewImageUrl.value = fileUrl + form.value.coverPicture;
  showModal.value = true;
};
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #f1f1f1;
  background: #fff;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    .left {
      display: flex;
      align-items: center;
      .logo {
        display: block;
        width: 50px;
        height: 50px;
        cursor: pointer;
        background: url(@/assets/images/logo.png) no-repeat center;
        background-size: 100%;
      }
      i {
        height: 30px;
        width: 1px;
        margin-left: 17px;
        margin-right: 16px;
        background-color: #ebebeb;
      }
      .page-title {
        font-weight: 600;
        font-size: 16px;
      }
    }
    .right {
      display: flex;
      align-items: center;
    }
  }
}

.main {
  width: 1200px;
  margin: 20px auto 70px;
  padding: 0 15px;
  background: #fff;
  .title {
    width: 100%;
    height: 78px;
    font-size: 32px;
    border: none;
    border-bottom: 1px solid #f1f1f1;
    :deep(.n-input__input-el) {
      width: 100%;
      height: 100%;
    }
    &::placeholder {
      font-weight: 600;
      font-size: 32px;
      letter-spacing: 2px;
    }
  }
  .content-setting {
    color: #444444;
    line-height: 61px;
    font-size: 17px;
    font-weight: 500;
  }
  .upload {
    width: 152px;
    height: 102px;
    :deep(.n-upload-trigger.n-upload-trigger--image-card) {
      width: 152px;
      height: 102px;
    }
    :deep(.n-upload-file-list .n-upload-file.n-upload-file--image-card-type) {
      width: 152px;
      height: 102px;
    }
  }
  .img-tips {
    width: 100%;
    margin-bottom: 10px;
    margin-top: 5px;
    color: #999999;
    font-size: 12px;
  }
}

.n-form {
  width: 100%;
  min-width: 600px;
  .n-cascader {
    width: 300px;
  }
}

.tag {
  :deep(.n-input) {
    width: 200px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  :deep(.n-tag) {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  :deep(.n-button) {
    margin-bottom: 10px;
  }
}

.topic-item-p {
  margin: 5px 0;
  cursor: pointer;
  &:hover {
    color: #1abc9c;
  }
}

.release-setting {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 52px;
  border-top: 1px solid #ebebeb;
  background: #fff;
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding: 0 20px;
    .left {
      line-height: 52px;
      color: #8590a6;
      .content-length {
        margin-left: 15px;
      }
    }
    .right {
      .preview {
        margin-right: 15px;
      }
    }
  }
}
</style>
