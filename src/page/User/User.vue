<template>
  <div id="User">
    <div class="head">
      <div class="mark">
        <img src="../../assets/img/user/setting.png" @click="$router.push('/setting')">
      </div> 
      <div class="userLogo" v-if="!isLogin">
        <img src="../../assets/img/user/userLogo.png" alt="">
        <router-link to="/login" tag="p">登录/注册</router-link>
      </div>
      <div class="userLogo is" v-else>
        <img src="../../assets/img/user/userLogo.png" @click="$router.push('/info')" alt="">
        <p>{{loginInfo.userName}}</p>
        <div class="account">
          <p>
            <span>{{loginInfo.amount}}</span>
            <span>可用余额</span>
          </p>
          <p>
            <span>{{loginInfo.amountCanOut}}</span>
            <span>可提余额</span>
          </p>
          <p>
            <span>{{loginInfo.surplus}}</span>
            <span>当日盈亏</span>
          </p>
        </div>
      </div>
    </div>
    <ul class="quick">
      <router-link to="/recharge" tag="li">
        <img src="../../assets/img/user/recharge.png" alt="">
        <span>充值</span>
      </router-link>
      <router-link to="/withdraw" tag="li">
        <img src="../../assets/img/user/withdraw.png" alt="">
        <span>提现</span>
      </router-link>
      <!-- <router-link to="/integral" tag="li">
        <img src="../../assets/img/user/integral.png" alt="">
        <span>积分兑换</span>
      </router-link> -->
    </ul>
    <group>
      <!-- <cell title="积分明细" is-link link="/integral">
        <img slot="icon" src="../../assets/img/user/integral3.png">
      </cell> --> 
      <cell title="个人消息" is-link link="/message">
        <img slot="icon" src="../../assets/img/user/message2.png"> 
         <span slot="value" style="color:red;">{{messageCount>0?messageCount:""}}</span> 
      </cell>
      <cell title="投注记录" is-link link="/betRecord">
        <img slot="icon" src="../../assets/img/user/record2.png">
      </cell>
      <!-- <cell title="合买记录" is-link link="/joinRecord">
        <img slot="icon" src="../../assets/img/user/join.png">
      </cell> -->
      <cell title="资金明细" is-link link="/moneyRecord">
        <img slot="icon" src="../../assets/img/user/money.png">
      </cell>
      <cell title="我的回水" is-link link="/backWater">
        <img slot="icon" src="../../assets/img/user/backwater.png">
      </cell>
      
      <cell title="代理中心" is-link link="/teamInfo" v-if="loginInfo.userType==80">
        <img slot="icon" src="../../assets/img/user/mine_proxy.png">
      </cell>
    </group>
    <group>
      <cell title="优惠活动" is-link link="/activity">
        <img slot="icon" src="../../assets/img/user/safe.png">
      </cell>
      <a target="_blank" :href="serviceLink">
        <cell title="联系客服" is-link>
          <img slot="icon" src="../../assets/img/user/service2.png">
        </cell>
      </a>
    </group>
  </div>
</template>
<script>
import { Cell, Group } from 'vux';
export default {
  name: 'User',
  components: {
    Cell,
    Group
  },
  data() {
    return {
      serviceLink: '',
      isLogin: false,
      loginInfo: {
        userName: '', // 用户名
        amount: 0.0, // 可用金额
        amountCanOut: 0.0, // 可提金额
        surplus: 0.0, // 当日盈亏
        userType: 0 // 用户类型
      },
      messageCount:0
    };
  },
  computed: {},
  async created() {
    this.$vux.loading.show({
      text: 'Loading'
    });
    await this.getUserInfo();
    await this.service();
    await this.getUserSystemMessageCount();
    this.$vux.loading.hide();
  },
  methods: {
    async getUserInfo() {
      if (window.localStorage.getItem('token')) {
        this.isLogin = true;
        let res = await this.$http('/queryUserCommonInfo', {
          body: {
            userId: window.localStorage.getItem('userId'),
            token: window.localStorage.getItem('token')
          }
        });
        this.loginInfo = Object.assign(this.loginInfo, res.returnMap);
      }
    },
    // 获取客服地址
    async service() {
      let res = await this.$http('/queryCustomerServiceInfo');
      this.serviceLink = res.returnMap.customerServiceUrl;
    },
    // 获取消息条数
    async getUserSystemMessageCount() {
      let res = await this.$http('/queryUserSystemMessageCount');
      this.messageCount = res.totalCount;
      console.log(this.messageCount);
    }
  }
};
</script>

<style lang="less" scoped>
@import url('./User.less');
</style>


