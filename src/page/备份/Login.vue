<template>
  <div id="Login">
    <img class="close" src="../../assets/img/user/close.png" @click="$router.go(-1)">
    <img class="logo" src="../../assets/img/user/logo.png" alt="">
    <group labelWidth="1.387rem">
      <x-input :title="lang['user_name']" v-model="name" :placeholder="lang['user_name_write']"></x-input>
      <x-input :title="lang['password']" v-model="password" :placeholder="lang['password_write']" type="password"></x-input>
      <x-input :title="lang['verify']" v-model="vcode" :placeholder="lang['verify_placeholder']" class="weui-cell_vcode" :min="4" :max="4">
        <img slot="right" class="weui-vcode-img" :src="verify.images" @click="getCode">
      </x-input>
    </group>
    <div class="big-btn">
      <x-button v-if="!loading" type="primary" @click.native="doLogin">{{lang['login']}}</x-button>
      <x-button v-else type="primary" show-loading @click.native="loading=!loading">{{lang['login']}}</x-button>
    </div>
    <p class="register">{{lang['noUsername']}}？
      <router-link to="register" tag="span">{{lang['quickRegister']}}</router-link>
    </p>
    <div class="thirdLogin">
      <LoadMore :show-loading="false" :tip="lang['useOtherLogin']"></LoadMore>
      <img src="../../assets/img/user/wechat.png" alt="">
    </div>
  </div>
</template>
<script>
import { Group, XInput, XButton, LoadMore } from 'vux'
export default {
  name: 'Login',
  components: {
    Group, XInput, XButton, LoadMore
  },
  data() {
    return {
      loading: false,
      name: '',
      password: '',
      vcode: ''
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang.lang
    },
    verify() {
      return this.$store.state.user.verify
    }
  },
  created() {
    window.localStorage.getItem('token') ? this.$router.go(-1) : this.getCode()
  },
  methods: {
    getCode() {
      this.$store.dispatch('user/verify')
    },
    doLogin() {
      if (this.name === '' || this.password === '' || this.vcode === '') {
        return this.$vux.toast.show({
          type: 'warn',
          text: this.lang['writeError']
        })
      }
      this.loading = true
      this.$store.dispatch('user/doLogin', {
        name: this.name,
        password: this.password,
        vcode: this.vcode
      }).then(res => {
        this.loading = false
        if (res.state !== 0) {
          this.getCode()
          this.$vux.toast.show({
            type: 'warn',
            text: res.message
          })
        } else {
          this.$vux.toast.show({
            type: 'success',
            text: this.lang['login'] + this.lang['success']
          })
          this.$store.dispatch('user/bindUser', {
            expiration: res.data.auth.expiration,
            token: res.data.auth.token
          })
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        }
      })
    }
  }
}
</script>
<style lang="less">
#Login {
  margin: 0;
  position: relative;
  background-color: #fff;
  padding: 0 1rem;
  box-sizing: border-box;
  text-align: center;
  min-height: 100vh;
  .close {
    position: absolute;
    margin: 0.4rem;
    width: 0.373rem;
    height: 0.373rem;
    top: 0;
    left: 0;
  }
  .logo {
    display: inline-block;
    width: 2.867rem;
    height: 3rem;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
  }
  .weui-cells:before {
    border: 0;
  }
  .weui-cell:before {
    left: 0;
  }
  .weui-cell {
    padding: 10px 0;
  }
  .weui-label {
    text-align: left;
    font-size: 0.36rem;
    color: #d6a23e;
  }
  .big-btn {
    margin-top: 1rem;
  }
  .register {
    font-size: 0.373rem;
    color: #898989;
    span {
      color: #d6a23e;
    }
  }
  .thirdLogin {
    margin-top: 2.32rem;
    .weui-loadmore {
      margin-bottom: 0.4rem;
    }
    img {
      width: 0.933rem;
      height: 0.933rem;
      display: inline-block;
    }
  }
  .weui-cells {
    font-size: 0.36rem;
  }
  .vux-x-input.weui-cell_vcode {
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
  }
}
</style>


