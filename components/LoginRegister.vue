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
          <div class="wx-way">
            <div class="code"></div>
            <div class="tip">wx微信扫码登录</div>
          </div>
          <div class="email-way">
            <n-form-item label="这是个 FormItem" :rule="rule">
              <n-input v-model:value="account" />
            </n-form-item>
          </div>
          <div class="select-way">
            <span class="active">微信登录</span>
            <span class="two">免密码登录</span>
            <span>密码登录</span>
          </div>
          <div class="service">继续即代表同意<span>《服务协议》</span>和<span>《隐私政策》</span></div>
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

const state = reactive({
  account: '',
  password: ''
})

const rule ={
  trigger: ['input', 'blur'],
  validator () {
    if (state.account.length !== 13) {
      return new Error('test')
    }
  }
}

// const message = useMessage()

const onNegativeClick = () => {
  // message.success('Cancel')
  emit('update:isShowModal')
}

const onPositiveClick  = () => {
  // message.success('Submit')
  emit('update:isShowModal')
}

const { account } = toRefs(state)
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
  width: 330px;
  height: 100%;
  padding-top: 40px;
}

.code {
  width: 160px;
  height: 160px;
  margin: 0 auto;
  background: #000;
}
.tip {
  text-align: center;
  color: #252219;
  font-size: 16px;
  margin-top: 10px;
}

.content .title {
  text-align: center;
  color: #252219;
  font-size: 22px;
  font-weight: 500;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.select-way {
  display: flex;
  margin-top: 25px;
}
.select-way span {
  flex: 1;
  padding: 0 10px;
  color: #1abc9c;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}

.select-way span.active {
  color: #252219;
}

.select-way .two {
  border-left: 1px solid #dee2e6!important;
  border-right: 1px solid #dee2e6!important;
}

.service {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #6c757d!important;
}
.service span {
  color: #1abc9c;
}
</style>