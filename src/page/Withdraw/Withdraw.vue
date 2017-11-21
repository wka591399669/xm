<template>
  <div id="Withdraw">
    <XHeader :left-options="{backText: ''}">提现</XHeader>
    <div class="info">
      <p>可提金额</p>
      <p>{{withdrawInfo.canOutAmount}}</p>
    </div>
    <div class="bank" @click="showUserBank=true" v-if="checkBank.bank">
      <img :src="require(`../../assets/img/bank/${checkBank.bank}.png`)" alt="">      
      <p>
        <span>{{checkBank.bankName}}</span>
        <span>{{checkBank.bank}}</span>        
      </p>
      <img class="next" src="../../assets/img/next.png" alt="">
    </div>
    <div class="bank" @click="showUserBank=true" v-else>
      <img src="../../assets/img/bank/nobank.png" alt="">
      <p>
        <span>添加银行卡</span>
        <span>请添加银行卡收款</span>
      </p>
      <img class="next" src="../../assets/img/next.png" alt="">
    </div>
    <div class="money">
      <p>提现金额</p>
      <div class="iptBox">
        <img class="rmb" src="../../assets/img/user/rmb.png" alt="">
        <input type="tel" :placeholder="`最低提现额度${withdrawInfo.minAccOutAmount}`" v-model="money">
        <div class="ps">提现密码<input type="password" v-model="password" placeholder="请输入提现密码"></div>
      </div>
    </div>
    <span class="btn" @click="toWithdraw">申请提现</span>

    <!-- 用户银行卡列表 -->
    <popup class="bankPopup" v-model="showUserBank" height="100%">
      <XHeader @on-click-back="showUserBank=false" :left-options="{backText: '',preventGoBack:true}">选择银行卡</XHeader>
      <ul>
        <li v-for="(it,i) in userBankList" :key="i" @click="handleBankCheck(it)">
          <p>{{it.bankName}}<span>{{it.bank}}</span></p>
          <p>
            <span>****</span>
            <span>****</span>
            <span>****</span>
            <span>{{it.bankAccount.substr(it.bankAccount.length - 4)}}</span>
          </p>
        </li>
      </ul>
      <div @click="showAddBank=true" class="addBank"><img src="../../assets/img/bank/add.png" alt="">添加银行卡</div>
    </popup>

    <!-- 添加银行卡 -->
    <popup class="addBankPopup" v-model="showAddBank" height="100%">
      <XHeader @on-click-back="showAddBank=false" :left-options="{backText: '',preventGoBack:true}">选择银行卡</XHeader>
      <div class="main">
        <div v-if="!addBankInfo.bankType" class="bank" @click="showAddBankList=true">
          <img src="../../assets/img/bank/nobank.png" alt="">
          <p>
            <span>添加银行卡</span>
            <span>请添加银行卡收款</span>
          </p>
          <img class="next" src="../../assets/img/next.png" alt="">
        </div>
        <div v-else class="bank" @click="showAddBankList=true">
          <img :src="require(`../../assets/img/bank/${addBankInfo.bankType}.png`)" alt="">
          <p>
            <span>{{addBankInfo.bankName}}</span>
            <span>{{addBankInfo.bankType}}</span>
          </p>
          <img class="next" src="../../assets/img/next.png" alt="">
        </div>
        

        <Group labelWidth="1.55rem">
          <x-input v-model="addBankCard" title="银行卡号" placeholder="请输入银行卡号"></x-input>
          <x-input v-model="addBankRealName" title="真实姓名" placeholder="请输入真实姓名"></x-input>
        </Group>

        <div class="btn">
          <x-button @click.native="bindBankCard">添加</x-button>        
        </div>
      </div>
    </popup>

    <!-- 银行卡列表 -->
    <popup class="bankListPopup" v-model="showAddBankList" height="100%">
      <XHeader @on-click-back="showAddBankList=false" :left-options="{backText: '',preventGoBack:true}">选择银行</XHeader>
      <ul>
        <li v-for="(it,i) in bankList" :key="i" @click="handleAddBankList(it)">
          <img :src="require(`../../assets/img/bank/${it.bankType}.png`)" alt="">
          {{it.bankName}}
        </li>
      </ul>
      
    </popup>
  </div>
</template>
<script>
import { XHeader, Cell, Group, Popup, XInput, XButton } from 'vux';
export default {
  name: 'Withdraw',
  components: {
    XHeader,
    Cell,
    Group,
    Popup,
    XInput,
    XButton
  },
  data() {
    return {
      money: '',
      password: '',
      withdrawInfo: {}, // 提现信息
      checkBank: {}, // 已选的用户银行卡
      userBankList: [], // 用户银行卡列表
      showUserBank: false, // 显示用户银行卡列表
      showAddBank: false, // 显示添加银行卡
      bankList: [], // 可添加银行卡列表
      addBankInfo: {}, // 要添加的银行卡信息
      addBankCard: '', // 要添加的银行卡号
      addBankRealName: '', // 添加的真是姓名
      showAddBankList: false // 显示可添加银行卡列表
    };
  },
  async created() {
    await this.getInfo();
    await this.getUserBank();
    await this.getBankList();
  },
  methods: {
    // 获取银行卡列表
    async getBankList() {
      let res = await this.$http('/queryBankList');
      this.bankList = res.returnList;
    },
    // 获取用户银行卡列表
    async getUserBank() {
      let res = await this.$http('/queryUserBankList');
      this.userBankList = res.returnList;
    },
    // 获取提现信息
    async getInfo() {
      let res = await this.$http('/queryAccOutCondition');
      console.log(res);
      // 没修改提现密码
      if (!res.returnMap.isPassword) {
        this.$vux.toast.show({
          text: '请先修改提现密码'
        });
        this.$router.push('/moneyPassword');
        return;
      }
      // 完善信息
      if (!res.returnMap.isHasRealName) {
        this.$vux.toast.show({
          type: 'text',
          text: '请先完善信息'
        });
        this.$router.push('/info');
        return;
      }
      this.withdrawInfo = Object.assign({}, res.returnMap);
    },
    // 选择提现银行卡
    handleBankCheck(it) {
      this.checkBank = it;
      this.showUserBank = false;
    },
    // 选择需要添加的银行卡
    handleAddBankList(it) {
      this.addBankInfo = Object.assign({}, it);
      this.showAddBankList = false;
    },
    // 绑定银行卡
    async bindBankCard() {
      this.$vux.loading.show({
        text: 'Loading'
      });
      let req = {
        bankType: this.addBankInfo.bankType,
        bankAccountName: this.addBankRealName,
        bankAccount: this.addBankCard
      };
      let res = await this.$http('/userBindCard', {
        body: req
      });
      this.$vux.loading.hide();
      if (res.returnCode === '0000') {
        this.$vux.toast.show({
          text: '添加成功',
          type: 'success'
        });
        this.showAddBank = false;
        this.getUserBank();
      } else {
        this.$vux.toast.show({
          text: res.returnMessage,
          type: 'warn'
        });
      }
    },
    // 发起提现
    async toWithdraw() {
      if (!this.checkBank.bank || !this.money || !this.password) {
        this.$vux.toast.show({
          text: '请完善信息',
          type: 'warn'
        });
        return;
      }
      let res = await this.$http('/userAccOut', {
        body: {
          bankId: this.checkBank.bankId,
          outAmount: this.money,
          outPassword: this.password
        }
      });
      if (res.returnCode === '0000') {
        this.$vux.toast.show({
          text: '申请成功',
          type: 'success'
        });
        this.showAddBank = false;
        this.$router.go(-1);
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
@import url('./Withdraw.less');
</style>


