<template>
  <div id="Login">
    <div class="header">
      <img src="../../assets/img/user/close3.png" @click="$router.go(-1)">
      <div class="register">
        <span>注册</span>
      </div>
    </div>
    <div class="main">
        <div>
          <Group labelWidth="1.55rem">
            <x-input v-model="register.username" title="用户名" name="mobile" placeholder="请输入您的用户名"></x-input>
            <x-input type="password" v-model="register.password" title="密码" name="mobile" placeholder="请输入密码"></x-input>
            <x-input type="password" v-model="register.repassword" title="确认密码" name="mobile" placeholder="再次输入密码"></x-input>
            <x-input v-model="register.code" title="验证码" class="weui-vcode">
              <img slot="right" :src="`${authApi}?ID=${authUUID}`" alt="">
            </x-input>
          </Group>
          <div class="btn">
            <x-button @click.native="doRegister">注册</x-button>        
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import $ from 'jquery';
import { Group, XInput, XButton } from 'vux';
const uuidv4 = require('uuid/v4');
export default {
  name: 'LowerLogin',
  components: {
    Group,
    XInput,
    XButton
  },
  data() {
    return {
      authApi: SETTING.apiHost + '/getAttach.do',
      type: 1,
      login: {
        username: '',
        password: ''
      },
      authUUID: '',
      authImg: '',
      register: {
        username: '',
        password: '',
        repassword: '',
        code: ''
      }
    };
  },
  created() {
    this.authUUID = uuidv4();
    this.loginOut();
  },
  methods: {
    check(n) {
      this.type = n;
      this.clearAll();
    }, 
    loginOut() {
      window.localStorage.clear(); 
    },
    // 登录
    async doLogin() {
      this.$vux.loading.show({
        text: 'Loading'
      });
      let req = {
        userId: this.login.username,
        password: this.login.password,
        browerType: 'Andriod'
      };
      let res = await this.$http('/login', {
        body: req
      });
      this.$vux.loading.hide();
      if (res.returnCode !== '0000') {
        this.$vux.toast.show({ 
          type: 'text',
          text: res.returnMessage,
          time: 1500
        });
      } else {
        window.localStorage.setItem('token', res.returnMap.token);
        window.localStorage.setItem('userId', this.login.username);
        window.localStorage.setItem(
          'thirdToken',
          res.returnMap.userInfo.thirdToken
        );
        window.localStorage.setItem(
          'thirdAccId',
          res.returnMap.userInfo.thirdAccId
        );
        window.localStorage.setItem(
          'thirdUserName',
          res.returnMap.userInfo.thirdUserName
        );
        this.connectNim();
        this.$router.go(-1);
      }
    },
    async doRegister() {
      if (this.register.username == null || this.register.username.length<6) {
        this.$vux.toast.show({
          text: '用户名不能为空且长度需大于6位数',
          type: 'warn'
        });
        return;
      }
      if (this.register.password == null || this.register.password.length<6) {
        this.$vux.toast.show({
          text: '密码不能为空且长度需大于6位数',
          type: 'warn'
        });
        return;
      }
      if (this.register.password !== this.register.repassword) {
        this.$vux.toast.show({
          text: '两次输入的密码不一致',
          type: 'warn'
        });
        return;
      }
      console.log(this.register.username);
      let res = await this.$http('/userReg', {
        body: {
          userId: this.register.username,
          password: this.register.password,
          userName: this.register.username,
          attach: this.register.code,
          ID: this.authUUID,
          u:this.$route.params.name
        }
      });
      if (res.returnCode == '0000') {
        this.$vux.toast.show({
          text: '注册成功',
          type: 'success'
        });
        window.localStorage.setItem('token', res.returnMap.token);
        window.localStorage.setItem('userId', this.register.username);
        window.localStorage.setItem('thirdToken',res.returnMap.userInfo.thirdToken);
        window.localStorage.setItem('thirdAccId', res.returnMap.userInfo.thirdAccId);
        window.localStorage.setItem('thirdUserName',res.returnMap.userInfo.thirdUserName);
        this.connectNim();
        this.$router.push("/user"); 
      } else {
        this.$vux.toast.show({
          text: res.returnMessage,
          type: 'warn'
        });
      }
    },
    clearAll() {
      this.login = {
        username: '',
        password: ''
      };
      this.register = {
        username: '',
        password: '',
        code: ''
      };
    }
  }
};
</script>
<style lang="less">
@import url('./Login.less');
</style>


