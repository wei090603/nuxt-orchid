<template>
  <n-button
    style="margin-bottom: 12px"
    @click="handleClick"
  >
    上传文件
  </n-button>
  <n-upload
    ref="uploadRef"
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-upload="false"
    multiple
    @change="handleChange"
  >
    <n-button>选择文件</n-button>
  </n-upload>
</template>

<script setup lang="ts">
import type { UploadFileInfo, UploadInst } from 'naive-ui'

const fileListLengthRef = ref(0)
const uploadRef = ref<UploadInst | null>(null)

const handleChange = (options: { fileList: UploadFileInfo[] }) => {
  fileListLengthRef.value = options.fileList.length
}
const handleClick = () => {
  uploadRef.value?.submit()
}
</script>