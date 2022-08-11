<template>
  <n-modal v-model:show="isShowModal">
    <div class="op-box">
      <div class="header">
        <span class="title">注册登录</span>
        <span class="close"></span>
      </div>      
      <div class="content-box">
        <div class="content">
          <h3 class="title">注册登录</h3>
          <div class="wx-way">wx</div>
          <div class="email-way">email</div>
          <div class="select-way">
            <span>微信登录</span>
            <span>密码登录</span>
          </div>
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script lang="ts" setup>
// import { useMessage } from 'naive-ui'
import { NModal } from 'naive-ui'

type IProps = {
  isShowModal: boolean
}

withDefaults(defineProps<IProps>(),{
  isShowModal: true
})

const emit = defineEmits(['update:isShowModal'])


// const message = useMessage()

const onNegativeClick = () => {
  // message.success('Cancel')
  emit('update:isShowModal')
}

const onPositiveClick  = () => {
  // message.success('Submit')
  emit('update:isShowModal')
}
</script>

<style scoped>
.op-box {
  width: 500px;
  height: 500px;
  background: #fff;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ccc;
  padding: 0px 20px;
}
.title {
  font-size: 16px;
  color: #252219;
}
.close {
  position: relative;
  margin: 3px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  box-sizing: border-box;
  background: red;
}

.content-box {
  display: flex;
  justify-content: center;
  height: 450px;
}

.content {
  width: 370px;
  height: 100%;
  padding-top: 60px;
}

.content .title {
  text-align: center;
  color: #252219;
  font-size: 20px;
  font-weight: 500;
}

.select-way {

}
</style>