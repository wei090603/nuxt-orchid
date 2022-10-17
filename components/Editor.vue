<template>
  <div class="editor-box">
    <Toolbar
      style="border-bottom: 1px solid #f1f1f1"
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
  </div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css'; // 引入 css

import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('<p>hello</p>');

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>';
  }, 1500);
});

const toolbarConfig = {};
const editorConfig = { placeholder: '请输入内容...' };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const mode = 'default'; // 或 'simple'
</script>

<style lang="less" scoped>
.editor-box {
  border-bottom: 1px solid #f1f1f1;
}
</style>
