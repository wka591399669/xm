<template>
  <div id="Recharge">
    <XHeader :left-options="{backText: ''}">充值</XHeader>
    <div class="info">当前帐号：<span>{{user.userName}}</span></div>
    <div class="money">
      <p>充值金额</p>
      <div class="iptBox">
        <img class="rmb" src="../../assets/img/user/rmb.png" alt="">
        <input type="tel" placeholder="最低充值额度100" v-model="money">
      </div>
      <div class="checker">
        <span :class="{'sel':money==100}" @click="money=100">100</span>
        <span :class="{'sel':money==500}" @click="money=500">500</span>
        <span :class="{'sel':money==1000}" @click="money=1000">1000</span>
      </div>
    </div>
    <div v-if="thirdList.length">
      <p class="title">在线充值</p>
      <group>
        <cell @click.native="handleThird(it)" v-for="(it,i) in thirdList" :key="i" :title="it.langValue" is-link></cell>
      </group>
    </div>
    <div v-if="banklist.length">
      <p class="title">银行支付</p>
      <group>
        <cell @click.native="popupReceipt(it)" v-for="(it,i) in banklist" :key="i" :title="it.bankName" is-link></cell>
      </group>
    </div>
    <!-- 第三方支付选择类型 -->
    <popup class="receipt" v-model="showThirdType" height="100%">
      <XHeader @click.native="showThirdType=false" :left-options="{backText: '',preventGoBack:true}">{{third.langValue}}</XHeader>
      <!-- 快冲宝 -->
      <div class="radio">
        <div @click="sel=it.key" v-for="it in kuaichongbao" :key="it.key">
          <img :src="require(`../../assets/img/user/${it.img}.png`)">
          <p>
            <span>{{it.value}}</span>
            <span>保存二维码，打开{{it.value}}进行扫一扫支付</span>
          </p>
          <img v-if="sel==it.key" class="sel" src="../../assets/img/user/sel.png" alt="">
          <img v-else class="nosel" src="../../assets/img/user/nosel.png" alt="">
        </div>        
      </div>
      <x-button class="btn" @click.native="createAccountIn">提交</x-button>
    </popup>
    <!-- 展示二维码 -->
    <popup class="receipt" v-model="showERcode" height="100%">
      <XHeader @click.native="showERcode=false" :left-options="{backText: '',preventGoBack:true}">{{third.langValue}}</XHeader>
      <div class="ercodeShow">
        <img :src="ERcode" alt="">
        <p>充值金额：<span>￥{{money}}</span></p>
        <p>扫描二维码完成支付</p>
      </div>
      <div class="ERcodeInfo">
        <p>温馨提示</p>
        <p>1、使用另一台手机的微信APP，扫描上方二维码；或截图并传送至电脑，打开微信APP后扫描付款;</p>
        <p>2、完成支付，您的帐号将立即充值到账。</p>
      </div>
    </popup>
    <!-- 展示充值信息 -->
    <popup class="receipt" v-model="showThirdInfo" height="100%">
      <XHeader @click.native="showThirdInfo=false" :left-options="{backText: '',preventGoBack:true}">{{receiptInfo.bankInfo.bankName}}</XHeader>
      <p class="moneyTop">充值：<span>￥{{money}}</span></p>
      <div class="infoTip">
        <p>请在完成转账后，填写一下信息</p>
        <p>收款人信息</p>
      </div>
      <Group labelWidth="1.55rem">
        <x-input title="收款人" v-model="receiptInfo.bankInfo.accountName" disabled placeholder-align="right" text-align="right"></x-input>
        <x-input title="收款帐号" v-model="receiptInfo.bankInfo.accountId" disabled placeholder="请输入存款姓名" placeholder-align="right" text-align="right"></x-input>
        <x-input title="收款方式" v-model="receiptInfo.bankInfo.bankName" disabled placeholder="请输入存款帐号" placeholder-align="right" text-align="right"></x-input>
      </Group>
      <div class="hint">
        <p>温馨提示</p>
        <p>1.请向上面显示的银行卡充值/转账；</p>
        <p>2.充值或转账后请填写回执；</p>
        <p>3.本站将根据您的回执信息与银行核对，确认收到款项，将及时为您充值入账；</p>
        <p>4.一般支付宝及部分银行卡支付到账时间为3-5分钟；</p>
        <p>5.如48小时未入账，请联系客服为您查询；</p>
      </div>
      <x-button class="btn" @click.native="showReceipt=true">填写回执</x-button>
    </popup>
    <!-- 回执单 -->
    <popup class="receipt" v-model="showReceipt" height="100%">
      <XHeader @click.native="showReceipt=false" :left-options="{backText: '',preventGoBack:true}">{{receiptInfo.bankInfo.bankName}}</XHeader>
      <p class="moneyTop">充值：<span>￥{{money}}</span></p>
      <div class="infoTip">
        <p>请在完成转账后，填写一下信息</p>
        <p>存款人信息</p>
      </div>
      <Group labelWidth="1.55rem">
        <x-input title="用户帐号" v-model="user.userName" disabled placeholder-align="right" text-align="right"></x-input>
        <x-input title="存款姓名" v-model="receiptInfo.name" placeholder="请输入存款姓名" placeholder-align="right" text-align="right"></x-input>
        <x-input title="存款帐号" v-model="receiptInfo.account" placeholder="请输入存款帐号" placeholder-align="right" text-align="right"></x-input>
        <x-input title="充值时间" v-model="time" disabled placeholder-align="right" text-align="right"></x-input>
      </Group>
      <x-button class="btn" @click.native="saveReceipt">提交</x-button>
    </popup>
  </div>
</template>
<script>
import { XHeader, Cell, Group, Popup, XInput, XButton, Radio } from 'vux';

export default {
  name: 'Recharge',
  components: {
    XHeader,
    Cell,
    Group,
    Popup,
    XInput,
    XButton,
    Radio
  },
  data() {
    return {
      // 用户信息
      user: {},
      time: '', // 充值的时间
      money: null, // 充值金额
      banklist: [], // 银行充值列表
      thirdList: [], // 第三方在线充值
      showThirdInfo: false, // 展示充值信息
      showReceipt: false, // 展示填写回执单
      receiptInfo: {
        // 填写回执的信息
        bankInfo: {}, // 银行信息
        name: '', // 姓名
        account: '' // 帐号
      },

      // 显示第三方在线充值选择方式
      showThirdType: false,
      third: {}, // 当前选择的第三方充值
      showERcode: false, // 显示二维码界面
      ERcode: '', // 二维码地址
      thirdType: '',
      kuaichongbao: [
        {
          key: 2,
          value: '支付宝',
          img: 'kuaichongbao1'
        },
        {
          key: 5,
          value: '微信支付',
          img: 'kuaichongbao2'
        },
        {
          key: 4,
          value: '手机QQ支付',
          img: 'kuaichongbao3'
        }
      ],
      sel: 2
    };
  },
  async created() {
    this.$vux.loading.show({
      text: 'Loading'
    });
    await this.getUserInfo();
    await this.getRechargeList();
    this.$vux.loading.hide();
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      if (window.localStorage.getItem('token')) {
        this.isLogin = true;
        let res = await this.$http('/queryUserCommonInfo', {
          body: {
            userId: window.localStorage.getItem('userId'),
            token: window.localStorage.getItem('token')
          }
        });
        this.user = Object.assign({}, res.returnMap);
        console.log(res);
        // this.loginInfo = Object.assign(this.loginInfo,res.returnMap)
      }
    },
    // 获取充值列表
    async getRechargeList() {
      let res = await this.$http('/queryAccInBankList', {});
      console.log(res);
      this.banklist = res.returnMap.bankList;
      this.thirdList = res.returnMap.thirdPaymentList;
    },
    // 第三方选择方式
    async handleThird(it) {
      this.third = Object.assign({}, it);
      this.showThirdType = true;
    },
    // 生成订单获取二维码
    async createAccountIn() {
      this.$vux.loading.show({
        text: 'Loading'
      });
      let res = await this.$http('/accountInOnline', {
        body: {
          rechargeAmount: this.money,
          rechargePayType: this.third.payType,
          bankType: this.sel
        }
      });
      this.$vux.loading.hide();
      this.showERcode = true;
      this.ERcode = res.returnMap.paramsMap.imgUrl;
    },
    // 展示充值信息
    popupReceipt(v) {
      let t = new Date();
      this.time = `${t.getFullYear()}-${t.getMonth() +
        1}-${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;
      if (this.money < v.InMin) {
        this.$vux.toast.show({
          text: `最小充值金额${v.InMin}`,
          type: 'warn'
        });
        return false;
      }
      if (this.money > v.InMax) {
        this.$vux.toast.show({
          text: `最大充值金额${v.InMax}`,
          type: 'warn'
        });
        return false;
      }
      this.receiptInfo.bankInfo = Object.assign({}, v);
      this.showThirdInfo = true;
    },
    // 发送回执单
    async saveReceipt() {
      if (!this.receiptInfo.name || !this.receiptInfo.account) {
        this.$vux.toast.show({
          text: '请填写回执信息',
          type: 'warn'
        });
        return;
      }
      let res = await this.$http('/createAccountInByOffLine', {
        body: {
          rechargeAmount: this.money,
          bankType: this.receiptInfo.bankInfo.bankType,
          bankAccount: this.receiptInfo.account,
          bankAccountName: this.receiptInfo.name
        }
      });
      if (res.returnCode == '0000') {
        this.showThirdInfo = false;
        this.showReceipt = false;
        this.money = null;
        this.receiptInfo = {
          bankInfo: {},
          account: '',
          name: ''
        };
        this.$vux.toast.show({
          text: '提交成功',
          type: 'success'
        });
      } else {
        this.$vux.toast.show({
          text: res.returnMessage,
          type: 'warn'
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./Recharge.less');
</style>

