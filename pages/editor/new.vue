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
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item label="上传文件" path="age" label-placement="left" class="width100">
          <P class="img-tips">图片上传格式支持 JPEG、JPG、PNG</P>
          <!-- <n-input v-model:value="valueRef" />
          图片上传格式支持 JPEG、JPG、PNG -->
          <n-upload
            action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
            :default-file-list="fileList"
            list-type="image-card"
          >
            点击上传
          </n-upload>
        </n-form-item>

        <n-form-item label="分类" path="age" label-placement="left">
          <n-cascader
            v-model:value="model.age"
            placeholder="请选择分类"
            :options="selectOptions"
            :show-path="true"
          />
        </n-form-item>

        <n-form-item label="标签" path="articleList" label-placement="left" class="width100 tag">
          <n-tag v-for="(item,index) in model.articleList" :key="item.id" closable size="large" @close="handleClose(index)">
            {{item.title}}
          </n-tag>
          <n-tooltip v-if="isShowAdd" :style="{ minWidth: '200px',backgroundColor: '#fff',color:'#333' }" :show-arrow="false" :show="topicList.length > 0" trigger="click">
            <template #trigger>
              <n-input v-model:value="title" placeholder="搜索话题" @input="handleInput">
                <template #prefix>
                  <n-icon :component="Search" />
                </template>
              </n-input>
            </template>
            <div>
              <p class="topic-item-p" v-for="(item,index) in topicList" :key="index" @click="selTopicClick(item)">{{item}}</p>
            </div>
          </n-tooltip>
          <n-button v-if="model.articleList.length < 5" @click="addArticleClick">+ 添加话题</n-button>
        </n-form-item> 
      </n-form>
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
import { UploadFileInfo,FormRules,FormItemRule,NButton, NInput, NFormItem,NUpload,NForm,NCascader,NTag,CascaderOption,NTooltip,NIcon  } from 'naive-ui';
// import { getCategory } from '@/api/article';
import { Search } from '@vicons/ionicons5'
import { Ref } from 'vue';

interface IArticleItem{
  title:string;
  id:number
}
interface IModelType{
  age: string | null;
  articleList:IArticleItem[]
}
definePageMeta({
  layout: false,
  middleware: ['auth'], // 用户登录验证
});

const model = ref<IModelType>({
      age: null,
      articleList:[]
    })
const rules:FormRules = {
  age: [
    {
      required: true,
      validator (rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('需要年龄')
        } else if (!/^\d*$/.test(value)) {
          return new Error('年龄应该为整数')
        }
        return true
      },
      trigger: ['blur']
    }
  ],
  articleList:[{
    required: true,
    trigger: ['blur'],
    message: '请输入表签',
    type:'array',
  }]
};
const fileList = ref<UploadFileInfo[]>([
  {
    id: 'c',
    name: '我是自带url的图片.png',
    status: 'finished',
    url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
}])
const isShowAdd = ref(false);
const title = ref('');
const selectOptions:CascaderOption[]  = [
  {
    label: '虚拟创作',
    value: '1',
    children:[{
      label: '虚拟创作1-1',
      value: '1-1',
      },{
        label: '虚拟创作1-2',
      value: '1-1',
      }]
  },
  {
    label: '包含理财',
    value: '2',
    children:[]
  },
  {
    label: '包含剧透',
    value: '3',
    children:[]
  }
]
const topicAllList:Ref = ref(['虚拟创作1-1虚拟创作1-1虚拟创作1-1虚拟创作1-1虚拟创作1-1','双十一','电车好还是油车好','一','充电小贴士一','充电小贴士hhhhh','快乐肥仔','快乐宅家','快乐宅家快乐宅家快乐宅家快乐宅家快乐宅家快乐宅家快乐宅家快乐宅家快乐宅家']);
const topicList:Ref = ref([])
const handleGoHome = () => {
  navigateTo('/');
};
// 话题输入框内容变化
const handleInput = (val) => {
  if(!val){
    topicList.value = [];
    return;
  }
  topicList.value = topicAllList.value.filter((item)=>{
    return item.indexOf(val) >= 0;
  })
}

// 弹窗选中话题
const selTopicClick = (val) => {
  title.value = val;
  const index = model.value.articleList.findIndex(item => item.title === title.value);
  if(index >= 0){
    // message.error('此标题已存在，请重新输入')
    throw new Error('此标题已存在，请重新输入');
  }
  isShowAdd.value = false;
  model.value.articleList.push({
    title:title.value,
    id:Date.now()
  });
  title.value = '';
  topicList.value = [];
}
// 话题标签删除
const handleClose = (index:number):void=>{
  model.value.articleList.splice(index,1)
}
// 点击添加话题按钮
const addArticleClick = () => {
  isShowAdd.value = true;
}

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
  :deep(.n-form-item-blank){
    flex-wrap: wrap;
  }
  .img-tips{
    width: 100%;
    margin: 10px 0;
  }
}
:deep(.n-form-item-blank){
  width: 400px;
}

.width100{
  :deep(.n-form-item-blank){
    width: 100%;
  }

}
.n-form{
  width: 80%;
  min-width: 600px;
}
.tag{
  :deep(.n-input){
    width: 200px;
    margin-right: 10px;
   margin-bottom: 10px;

  }
  :deep(.n-tag){
    margin-right: 10px;
   margin-bottom: 10px;
  }
  :deep(.n-button){
    margin-bottom: 10px;
  }
}
.topic-item-p{
  margin: 5px 0;
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
