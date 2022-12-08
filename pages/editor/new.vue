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
      
      <n-form ref="formRef" :model="model" :rules="rules">
        
        <n-form-item label="" class="width100" path="title" label-placement="left">
          <div class="title">
            <n-input type="textarea" v-model:value="model.title" placeholder="请输入标题(最多 100 个字)" />
          </div>
        </n-form-item>
        <!-- <clientOnly>
          <Editor />
        </clientOnly> -->
        <div class="content-setting">发布设置</div>

        <n-form-item label="上传文件" path="age" label-placement="left" class="width100">
          <p class="img-tips">图片上传格式支持 JPEG、JPG、PNG</p>
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

        <n-form-item label="分类" path="categoryId" label-placement="left">
          <n-cascader
            v-model="model.categoryId"
            placeholder="请选择分类"
            :options="selectOptions"
            check-strategy = "all"
            @update:value="handleUpdateValue"
          />
        </n-form-item>

        <n-form-item label="标签" path="tag" label-placement="left" class="width100 tag">
          <n-tag v-for="(item,index) in articleList" :key="item.id" closable size="large" @close="handleClose(index)">
            {{item.name}}
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
              <p class="topic-item-p" v-for="(item,index) in topicList" :key="index" @click="selTopicClick(item)">{{item.name}}</p>
            </div>
          </n-tooltip>
          <n-button v-if="articleList.length < 5" @click="addArticleClick">+ 添加话题</n-button>
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
          <n-button type="primary" @click="publishClick">发布</n-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { UploadFileInfo,FormRules,NButton, NInput, NFormItem,NUpload,NForm,NCascader,NTag,CascaderOption,NTooltip,NIcon  } from 'naive-ui';
import { getCategory,getTag,addArticle } from '@/api/article';
import { Search } from '@vicons/ionicons5'
import { Ref } from 'vue';
import { val } from 'dom7';

interface ITagItem{
  id:number
  name:string
}
interface IArticleForm {
  title:string;
  content:string;
  image: string[],
  categoryId: string | null,
  status: number,
  type: number,
  tag: string[]
}
definePageMeta({
  layout: false,
  middleware: ['auth'], // 用户登录验证
});

const model = ref<IArticleForm>({
    title:'',
    content:'',
    image: [],
    categoryId: null,
    status: 1,
    type: 1,
    tag: []
  })
const rules:FormRules = {
  title:[{
    required: true,
    trigger: ['blur'],
    message: '请输入标题',
  }],
  categoryId: [
    {
      required: true,
      trigger: ['blur'],
      message: '请选择分类',
    }
  ],
  tag:[{
    required: true,
    trigger: ['blur'],
    message: '请输入表签',
    type:'array',
  }]
};
const articleList = ref<ITagItem[]>([])
const fileList = ref<UploadFileInfo[]>([
  {
    id: 'c',
    name: '我是自带url的图片.png',
    status: 'finished',
    url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
}])
const isShowAdd = ref(false);
const title = ref('');
const selectOptions:Ref<CascaderOption[]>  = ref([])

const topicList:Ref = ref([])
const handleGoHome = () => {
  navigateTo('/');
};
// 话题输入框内容变化
const handleInput = async (val:string) => {
  if(!val){
    topicList.value = [];
    return;
  }
  const {data} = await getTag(val);
  topicList.value = data.value;
}

// 弹窗选中话题
const selTopicClick = (val:ITagItem) => {
  title.value = val.name;
  const index = articleList.value.findIndex(item => item.name === title.value);
  if(index >= 0){
    // message.error('此标题已存在，请重新输入')
    throw new Error('此标题已存在，请重新输入');
  }
  isShowAdd.value = false;
 articleList.value.push({
    name:title.value,
    id:Date.now()
  });
  model.value.tag.push(val.name)
  title.value = '';
  topicList.value = [];
  console.log(' model.value', model.value)
}
// 话题标签删除
const handleClose = (index:number):void=>{
  articleList.value.splice(index,1);
  model.value.tag.splice(index,1);
}
// 点击添加话题按钮
const addArticleClick = () => {
  isShowAdd.value = true;
}

const getTreeData = (data:any) => {
  const arr = []
  data.forEach((item:any) => {
    const {title,id,children,...other} = item;
    const obj = {
      value:id,
      label:title,
      children:children && children.length > 0 ? getTreeData(children) : undefined,
      ...other
    }
     arr.push(obj);
  });
  return arr;
}
const reqGetCategory= async ()=>{
  const {data} = await getCategory();
  selectOptions.value = getTreeData(data.value);
}
const handleUpdateValue = (value: string, option: CascaderOption) =>{
  console.log(value, option)
  model.value.categoryId = value;
}
const formRef = ref();
// 发布
const publishClick = async () => {
  console.log('mode',model.value)
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      // message.success('验证成功')
      await addArticle(model.value)
    } else {
      console.log(errors)
      // message.error('验证失败')
    }
  })
  
}

onMounted(()=>{
  console.log('onMounted')
  reqGetCategory()
})
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
