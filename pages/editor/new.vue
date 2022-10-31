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
      <div class="title">
        <input type="text" placeholder="请输入标题(最多 100 个字)" />
      </div>
      <!-- <clientOnly>
        <Editor />
      </clientOnly> -->

      <div class="content-setting">发布设置</div>

      <n-form-item label="上传文件" :rule="rule" label-placement="left">
        <n-input v-model:value="valueRef" />
        图片上传格式支持 JPEG、JPG、PNG
      </n-form-item>

      <n-form-item label="分类" :rule="rule" label-placement="left">
        <n-input v-model:value="valueRef" />
      </n-form-item>

      <n-form-item label="标签" :rule="rule" label-placement="left">
        <n-input v-model:value="valueRef" />
      </n-form-item>
    </div>

    <div class="release-setting">
      <div class="content">
        <div class="left">
          <span>发布设置</span>
        </div>
        <div class="right">
          <n-button strong secondary class="preview">预览</n-button>
          <n-button type="primary">发布</n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NButton, NInput, NFormItem } from 'naive-ui';
import { getCategory } from '@/api/article';

definePageMeta({
  layout: false,
  middleware: ['auth'], // 用户登录验证
});

const { data } = await getCategory();

console.log(data.value, 'data');

const valueRef = ref('');
const rule = {
  required: true,
  trigger: ['input', 'blur'],
  validator() {
    if (valueRef.value !== '') {
      return new Error('error');
    }
  },
};

const handleGoHome = () => {
  navigateTo('/');
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
    width: 1250px;
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
  width: 1250px;
  margin: 20px auto 70px;
  padding: 0 15px;
  background: #fff;
  .title {
    width: 100%;
    height: 78px;
    border-bottom: 1px solid #f1f1f1;
    input {
      width: 100%;
      height: 100%;
      font-size: 32px;
      &::placeholder {
        font-weight: 600;
        font-size: 32px;
        letter-spacing: 2px;
      }
    }
  }
  .content-setting {
    color: #444444;
    line-height: 61px;
    font-size: 17px;
    font-weight: 500;
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
    width: 1250px;
    height: 100%;
    margin: 0 auto;
    padding: 0 20px;
    .left {
      line-height: 52px;
      color: #8590a6;
    }
    .right {
      .preview {
        margin-right: 15px;
      }
    }
  }
}
</style>
