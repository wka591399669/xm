<template>
  <div id="OrderDetail">
    <XHeader v-if="!info.isJoinOrder" :left-options="{backText: ''}">合买详情</XHeader>
    <XHeader v-else :left-options="{backText: ''}">订单详情</XHeader>
    <div class="headerInfo" v-if="!info.isJoinOrder">
      <div>
        <p>{{info.gameTypeName}}}</p>
        <p>第{{info.issueID}}期</p>
      </div>
      <div>
        <XCircle :percent="info.schedule" :trail-width="4" trail-color="#111" :stroke-width="4" stroke-color="#ffed95">
          <span>{{info.schedule}}%</span>
        </XCircle>
        <span>{{info.guaranteeRate}}}%保底</span>
      </div>
      <div>
        <img src="../../assets/img/openA.png" alt="">
        {{info.totalWinAmount}}元
      </div>
    </div>
    <div class="headerInfo" v-else>
      <div>
        <p>{{info.gameTypeName}}</p>
        <p>第{{info.issueID}}期</p>
      </div>
      <div>
        <img src="../../assets/img/openA.png" alt="">
        {{info.totalWinAmount}}元
      </div>
    </div>
    
    <div class="box">
      <span class="title" @click="data1=!data1">
        方案信息
        <img v-if="data1" src="../../assets/img/up.png" alt="">
        <img v-else src="../../assets/img/down.png" alt="">
      </span>
      <div v-if="data1" class="con">
        <ul class="tb-l">
          <li>
            <span>投注金额</span><span>{{info.totalAmount}}</span>
          </li>
          <li>
            <span>投注注数</span><span>{{info.totalStakeCount}}</span>
          </li>
          <li>
            <span>投注时间</span><span>{{info.buyDate}}</span>
          </li>
          <li>
            <span>投注类型</span><span>{{info.buyType}}</span>
          </li>
          <li>
            <span>开奖号码</span><span class="ball">{{info.result}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="box">
      <span class="title" @click="data2=!data2">
        投注详情
        <img v-if="data2" src="../../assets/img/up.png" alt="">
        <img v-else src="../../assets/img/down.png" alt="">
      </span>
      <div v-if="data2" class="con">
        <ul class="tb-h">
          <li>
            <span>玩法</span>
            <span v-for="(it,i) in info.planDetail" :key="i">{{it.itemName}}</span>
          </li>
          <li>
            <span>投注号码</span>
            <span  v-for="(it,i) in info.planDetail" :key="i">{{it.ball}}</span>
          </li>
          <li>
            <span>中奖金额</span>
            <span  v-for="(it,i) in info.planDetail" :key="i">{{it.winAmount}}元</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="box">
      <span class="title" @click="data3=!data3">
        参与用户
        <img v-if="data3" src="../../assets/img/up.png" alt="">
        <img v-else src="../../assets/img/down.png" alt="">
      </span>
      <div v-if="data3" class="con">
        <ul class="tb-h">
          <li>
            <span>用户名</span>
            <span v-for="(it,i) in info.joinOrderUserList" :key="i">{{it.userName}}</span>
          </li>
          <li>
            <span>认购时间</span>
            <span v-for="(it,i) in info.joinOrderUserList" :key="i">{{it.buyDate}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="box">
      <span class="title" v-if="!info.isTrackOrder" @click="data4=!data4">
        追号信息
        <img v-if="data4" src="../../assets/img/up.png" alt="">
        <img v-else src="../../assets/img/down.png" alt="">
      </span>
      <div v-if="data4" class="con">
        <ul class="tb-h">
          <li>
            <span>期号</span>
            <span v-for="(it,i) in info.trackIssueList" :key="i">{{it.issueID}}</span>
          </li>
          <li>
            <span>开奖号码</span>
            <span v-for="(it,i) in info.trackIssueList" :key="i">{{it.result}}</span>
          </li>
          <li>
            <span>状态</span>
            <span v-for="(it,i) in info.trackIssueList" :key="i">{{it.state}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { XHeader, XCircle } from 'vux';

export default {
  name: 'OrderDetail',
  components: {
    XHeader,
    XCircle
  },
  created() {
    this.getData();
  },
  data() {
    return {
      info: {},
      data1: true,
      data2: true,
      data3: true,
      data4: false
    };
  },
  methods: {
    async getData() {
      this.$vux.loading.show({
        text: 'Loading'
      });
      let res = await this.$http('/queryBatchOrderDetail', {
        body: {
          batchOrderId: this.$route.params.id
        }
      });
      this.info = Object.assign({}, res.returnMap.batchOrderInfo);
      this.$vux.loading.hide();
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./OrderDetail.less');
</style>

