<template>
  <div id="JoinOrderDetail">
    <XHeader :left-options="{backText: ''}">合买详情</XHeader> 
    <div class="headerInfo">
      <div>
        <p>{{info.gameTypeName}}</p>
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
    <div class="box">
      <span class="title" @click="data1=!data1">
        方案信息
        <img v-if="data1" src="../../assets/img/up.png" alt="">
        <img v-else src="../../assets/img/down.png" alt="">
      </span>
      <div v-if="data1" class="con">
        <ul class="tb-l">
          <li>
            <span>总金额</span><span>{{info.totalAmount}}</span>
          </li>
          <li>
            <span>总注数</span><span>{{info.totalCount}}</span>
          </li>
          <li>
            <span>投注时间</span><span>{{info.joinOrderDate}}</span>
          </li>
          <li>
            <span>投注类型</span><span>{{info.isTrack==0?"合买":"合买/追号"}}</span>
          </li>
          <li>
            <span>截至时间</span><span>{{info.closeTime}}</span>
          </li>
          <li>
            <span>发起人</span><span>{{info.sponsorsName}}</span>
          </li>
          <li>
            <span>盈利佣金</span><span>{{info.hireAmount}}</span>
          </li>
          <li>
            <span>方案类型</span><span>{{openLevelName[info.openLevel]}}</span>
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
      <span class="title" v-if="info.isTrack==1" @click="data4=!data4">
        追号信息
        <img v-if="data4" src="../../assets/img/up.png" alt="">
        <img v-else src="../../assets/img/down.png" alt="">
      </span>
      <div v-if="data4" class="con">
        <ul class="tb-h">
          <li>
            <span>期号</span>
            <span v-for="(it,i) in trackInfo" :key="i">{{it.issueID}}</span>
          </li>
          <li>
            <span>开奖号码</span>
            <span v-for="(it,i) in trackInfo.trackIssueList" :key="i">{{it.result}}</span>
          </li>
          <li>
            <span>状态</span>
            <span v-for="(it,i) in trackInfo.trackIssueList" :key="i">{{it.stateName}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="box">
      <span class="title"  @click="data3=!data3">
        参与用户
        <img v-if="data3" src="../../assets/img/up.png" alt="">
        <img v-else src="../../assets/img/down.png" alt="">
      </span>
      <div v-if="data3" class="con">
        <ul class="tb-h">
          <li>
            <span>用户名</span>
            <span v-for="(it,i) in joinUserInfo" :key="i">{{it.userID}}</span>
          </li>
          <li>
            <span>认购时间</span>
            <span v-for="(it,i) in joinUserInfo" :key="i">{{it.buyDate}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="show" v-if="info.state==0" >
        <p>
            <span>剩余份数：{{info.remainingNum}}份</span>
            <span>认购<input type="number" v-model="buyNum" > 份</span>
        </p>

        <div>￥{{info.remainingNum}}元</div>
        <div @click="buyJoinOrder" >立即投注</div>
    </div> 
  </div>
</template>
<script>
import { XHeader, XCircle } from 'vux';

export default {
  name: 'JoinOrderDetail',
  components: {
    XHeader,
    XCircle
  },
  created() {
    this.getData();
  },
  data() {
    return {
      openLevelName:["完全公开","截止后公开","仅跟单人可看","完全保密"],
      buyNum:"",
      info: {},
      trackInfo: {},
      joinUserInfo: {},
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
        console.log(this.$route.params.id);

        let res = await this.$http('/queryJoinOrderDetailInfo', {
            body: {
            joinOrderId: this.$route.params.id
            }
        });
        if (res.returnCode == '0000') { 
            this.info = Object.assign({}, res.returnMap.joinOrderDetai);
            this.trackInfo = Object.assign({}, res.returnMap.trackIssue);
            this.joinUserInfo = Object.assign({}, res.returnMap.joinOrderUserInfo);
            console.log(this.joinUserInfo);
            
        } else {
            this.$vux.toast.show({
            text: res.returnMessage,
            type: 'warn'
            });
        } 
        this.$vux.loading.hide();
    },
    async buyJoinOrder() {
        this.$vux.loading.show({
            text: 'Loading'
        }); 
        let res = await this.$http('/buyJoinOrder', {
            body: {
            joinOrderId: this.$route.params.id,
            buyNum:this.buyNum
            }
        });
        if (res.returnCode == '0000') { 
            this.$vux.toast.show({
                text: '下单成功',
                type: 'success'
            });
            this.buyNum="";
            this.getData();
        } else {
            this.$vux.toast.show({
            text: res.returnMessage,
            type: 'warn'
            });
        } 
        this.$vux.loading.hide();
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./JoinOrderDetail.less');
</style>

