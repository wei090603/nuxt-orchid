<template>
  <div class="editor-box">
    <client-only>
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 400px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { IEditorConfig } from '@wangeditor/editor';
type InsertFnType = (url: string, alt: string, href: string) => void;

const emits = defineEmits(['update:contentValue']);

const props = withDefaults(defineProps<{ contentValue: string }>(), {});

const env = useRuntimeConfig();
const actionUrl: string = env.public.VITE_FILE_ACTION_URL;
const fileUrl: string = env.public.VITE_FILE_URL;

const token = useCookie<string>('token');

const valueHtml = ref<string>(props.contentValue);

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

const toolbarConfig = {};

// 初始化 MENU_CONF 属性
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  // const editorConfig = {                       // JS 语法
  MENU_CONF: {},
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

watch(
  () => valueHtml.value,
  (newVal) => {
    emits('update:contentValue', newVal);
  }
);

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
  editor.setHtml('');
};

// 修改 uploadImage 菜单配置
editorConfig.MENU_CONF['uploadImage'] = {
  server: actionUrl,
  fieldName: 'file',
  // 自定义增加 http  header
  headers: {
    token: token,
  },
  // 自定义插入图片
  customInsert(res: any, insertFn: InsertFnType) {
    // res 即服务端的返回结果
    console.log(res, 'res');
    if (res.code === 200) {
      // 从 res 中找到 url alt href ，然后插入图片
      insertFn(fileUrl + res.data.url, res.data.filename, '');
    }
  },
};

const mode = 'default'; // 或 'simple'
</script>

<style lang="less" scoped>
.editor-box {
  border-bottom: 1px solid #f1f1f1;
}
</style>
