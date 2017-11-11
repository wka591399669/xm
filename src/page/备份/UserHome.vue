<template>
  <div id="UserHome">
    <div class="head">
      <div class="mark">
        <img src="../../assets/img/user/service.png" @click="$router.push('/service')">
        <img src="../../assets/img/user/setting.png" @click="$router.push('/user/setting')">
      </div>
      <div class="userLogo" v-if="!isLogin">
        <img src="../../assets/img/user/userLogo.jpg" alt="">
        <router-link to="/login" tag="p">登录/注册</router-link>
      </div>
      <div class="userLogo is" v-else>
        <img src="../../assets/img/user/userLogo.jpg" alt="">
        <p>{{user_name}}</p>
        <div class="account">
          <p>
            <span>{{all_balance}}</span>
            <span>可用余额</span>
          </p>
          <p>
            <span>{{withdraw_money}}</span>
            <span>可提余额</span>
          </p>
          <p>
            <span>暂未开放</span>
            <span>积分</span>
          </p>
        </div>
      </div>
    </div>
    <ul class="quick">
      <router-link to="/user/recharge" tag="li">
        <img src="../../assets/img/user/recharge.png" alt="">
        <span>充值</span>
      </router-link>
      <router-link to="/user/recharge" tag="li">
        <img src="../../assets/img/user/withdraw.png" alt="">
        <span>提现</span>
      </router-link>
      <router-link to="/user/integral" tag="li">
        <img src="../../assets/img/user/integral.png" alt="">
        <span>积分兑换</span>
      </router-link>
    </ul>
    <group>
      <cell title="积分明细" is-link link="/user/integral">
        <img slot="icon" src="../../assets/img/user/integral2.png">
      </cell>
      <cell title="投注明细" is-link link="/user/betRecord">
        <img slot="icon" src="../../assets/img/user/bet.png">
      </cell>
      <cell title="合买记录" is-link link="/user/webuyRecord">
        <img slot="icon" src="../../assets/img/user/webuy.png">
      </cell>
      <cell title="资金明细" is-link link="/user/Record">
        <img slot="icon" src="../../assets/img/user/record.png">
      </cell>
    </group>
    <group>
      <cell title="优惠活动" is-link link="/activity">
        <img slot="icon" src="../../assets/img/user/activity.png">
      </cell>
      <cell title="消息公告" is-link link="/message">
        <img slot="icon" src="../../assets/img/user/message.png">
      </cell>
    </group>
    <group>
      <cell title="安全中心" is-link link="/user/safe">
        <img slot="icon" src="../../assets/img/user/activity.png">
      </cell>
      <cell title="设置" is-link link="/user/setting">
        <img slot="icon" src="../../assets/img/user/message.png">
      </cell>
    </group>
  </div>
</template>
<script>
import { Cell, Group } from 'vux'
export default {
  name: 'User',
  components: {
    Cell, Group
  },
  data() {
    return {
      isLogin: false
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang.lang
    },
    user_name() {
      return this.$store.state.user.user_name
    },
    all_balance() {
      return this.$store.state.user.all_balance
    },
    withdraw_money() {
      return this.$store.state.user.withdraw_money
    }
  },
  async created() {
    this.$vux.loading.show({
      text: this.lang['loading']
    })
    if (window.localStorage.getItem('token')) {
      this.isLogin = true
      // 获取用户信息
      // 获取提现信息
      await this.$store.dispatch('user/wallet')
      await this.$store.dispatch('user/withdrawInfo')
    } else {
      this.isLogin = false
    }
    this.$vux.loading.hide()
  }
}
</script>

<style lang="less" scoped>
#UserHome {
  .head {
    width: 100%;
    height: 6.267rem;
    position: relative;
    background-image: linear-gradient(0deg,
    rgba(148, 82, 231, 1) 1%,
    rgba(109, 53, 177, 1) 100%),
    linear-gradient( rgba(232, 85, 78, 1),
    rgba(232, 85, 78, 1));
    .mark {
      position: absolute;
      right: 0;
      top: 0;
      img {
        width: 0.48rem;
        height: 0.48rem;
        display: inline-block;
        margin: 0.413rem 0.413rem 0 0;
      }
    }
    .userLogo {
      height: 2.88rem;
      width: 100%;
      text-align: center;
      padding-top: 1.533rem;
      &.is {
        padding-top: 1rem;
      }
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 100%;
        display: inline-block;
      }
      &>p {
        text-align: center;
        color: #fff;
        font-size: 0.4rem;
        margin-top: 0.45rem;
      }
      .account {
        position: absolute;
        bottom: 0;
        color: #fff;
        overflow: hidden;
        background-color: rgba(255, 255, 255, 0.1);
        height: 1.84rem;
        width: 100%;
        margin-top: 0.56rem;
        p {
          float: left;
          width: 33.3333%;
          text-align: center;
          span {
            display: block;
          }
          span:nth-child(1) {
            font-size: 0.48rem;
            margin-top: 0.2rem;
            line-height: 0.8rem;
          }
          span:nth-child(2) {
            font-size: 0.293rem;
          }
        }
      }
    }
  }
  .quick {
    overflow: hidden;
    li {
      float: left;
      width: 33.3333%;
      height: 1.307rem;
      background-color: #fff;
      text-align: center;
      color: #333;
      font-size: 0.4rem;
      line-height: 1.307rem;
      position: relative;
      &:nth-child(1):before,
      &:nth-child(2):before {
        content: '';
        height: 0.4rem;
        width: 1px;
        background-color: #dcdcdc;
        position: absolute;
        right: 0;
        top: 0.5rem;
      }
      img {
        vertical-align: middle;
        width: 0.453rem;
        display: inline-block;
      }
    }
  }
}
</style>


