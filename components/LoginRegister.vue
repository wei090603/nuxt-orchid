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
          <div class="wx-way" v-if="loginWayActive === 0">
            <div class="code"></div>
            <div class="tip">wx微信扫码登录</div>
          </div>
          <div class="email-way" v-if="loginWayActive === 1">
            <n-space vertical>
              <n-input v-model:value="account" placeholder="请输入邮箱" size="large" />
              <n-input  v-model:value="account" placeholder="请输入验证码" size="large" />
              <div class="tip">新邮箱将自动注册</div>
            </n-space>
            <n-button color="#1abc9c" type="info" block size="large" @click="handleLoginBtn">登录</n-button>
          </div>
          <div class="account-way" v-if="loginWayActive === 2">
            <n-space vertical>
              <n-input v-model:value="account" placeholder="用户名/手机号/邮箱" size="large" />
              <n-input type="password" v-model:value="password" placeholder="请输入密码" size="large" />
              <div class="tip">忘记密码？</div>
            </n-space>
            <n-button color="#1abc9c" type="info" block size="large" @click="handleLoginBtn">登录</n-button>
          </div>
          <div class="select-way">
            <span @click="handleLoginWay(index)" :class="{active: loginWayActive===index}" v-for="(item, index) in loginWayList" :key="index">{{item}}</span>
          </div>
          <div class="service">继续即代表同意<span>《服务协议》</span>和<span>《隐私政策》</span></div>
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script lang="ts" setup>
// import { useMessage } from 'naive-ui'
import { NModal, NInput, NButton, NSpace } from 'naive-ui';
import { login, userInfo } from '~~/api/home';
import { setStorage } from '~~/utils/storage';

type IProps = {
  isShowModal: boolean
}

withDefaults(defineProps<IProps>(),{
  isShowModal: false
})

const emit = defineEmits(['update:isShowModal'])

const env = useRuntimeConfig();
const baseUrl: string = env.public.VITE_API_URL;

const state = reactive({
  account: '',
  password: '',
  loginWayActive: 0, // 登录方式
  loginWayList: ['微信登录', '免密码登录', '密码登录'],
})


// const message = useMessage()

const onNegativeClick = () => {
  // message.success('Cancel')
  emit('update:isShowModal')
}

const onPositiveClick  = () => {
  // message.success('Submit')
  emit('update:isShowModal')
}

const handleLoginWay = (index: number) => {
  state.loginWayActive = index
}

const handleLoginBtn = async () => {
  const data = await login({account: state.account, password: state.password})
  setStorage('token', data.value.token)
}



const { account, password, loginWayList, loginWayActive } = toRefs(state)
</script>

<style scoped>
.op-box {
  width: 500px;
  height: 450px;
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
  height: 400px;
}

.content {
  width: 330px;
  height: 100%;
  padding-top: 40px;
}

.code {
  width: 140px;
  height: 140px;
  margin: 0 auto;
  background: #000;
}
.wx-way .tip {
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

.email-way .tip{
  color: #6c757d;
  margin-bottom: 10px;
  font-size: 15px;
}

.account-way .tip{
  color: #1abc9c;
  margin-bottom: 10px;
  font-size: 15px;
  text-align: right;
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
.select-way span:nth-child(2) {
  border-left: 1px solid #dee2e6!important;
  border-right: 1px solid #dee2e6!important;
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