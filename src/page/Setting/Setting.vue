<template>
  <div id="Setting">
    <XHeader :left-options="{backText: ''}">设置</XHeader>
    <group>
      <cell title="修改登录密码" is-link link="/password"></cell>
      <cell title="修改提现密码" is-link link="/moneyPassword"></cell>
      <cell title="设置密保问题" is-link link="/question"></cell>
    </group>
    <group>
      <cell title="帮助中心" is-link link="/help"></cell>
      <a :href="serviceLink" target="_blank">
        <cell title="联系客服" is-link></cell>
      </a>
    </group>
    <div class="big-btn">
      <x-button v-if="!loading" type="primary" @click.native="loginOut">退出登录</x-button>
      <x-button v-else type="primary" show-loading @click.native="loginOut">退出登录</x-button>
    </div>

  </div>
</template>
<script>
import { XHeader, Cell, Group, XButton } from 'vux';
export default {
  name: 'Setting',
  components: {
    XHeader,
    Cell,
    Group,
    XButton
  },
  data() {
    return {
      loading: false,
      serviceLink: ''
    };
  },
  computed: {
    lang() {
      return this.$store.state.lang.lang;
    }
  },
  created() {
    this.service();
  },
  methods: {
    loginOut() {
      window.localStorage.clear();
      this.$router.go(-1);
    },
    // 获取客服地址
    async service() {
      let res = await this.$http('/queryCustomerServiceInfo');
      this.serviceLink = res.returnMap.customerServiceUrl;
    }
  }
};
</script>

