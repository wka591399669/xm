<template>
  <div id="TeamInfo">
    <XHeader :left-options="{backText: '',preventGoBack:true}" @on-click-back="$router.push('/user')"> 
     <div @click="show=!show">
         {{topMenu[index].memuName}}
         <img src="../../assets/img/lottery/down.png" alt=""/>
      </div>

      <div slot="right" @click="queryShow=!queryShow">
       筛选
      </div>
    </XHeader>
    <div class="main">
      <ul>
        <li>余额：<span>{{teamInfo.teamAccount}}元</span></li>
        <li @click="showSurplusDetail=!showSurplusDetail" >盈亏：<span>{{teamInfo.teamSurplusAmount}}元</span><img src="../../assets/img/down.png" :class="{'rotate':showSurplusDetail}" ></li>
        <li v-if="showSurplusDetail">28盈亏：<span>{{teamInfo.team28SurplusAmount}}元</span></li>
        <li v-if="showSurplusDetail">彩票盈亏：<span>{{teamInfo.teamOtherSurplusAmount}}元</span></li>
        <li>返点：<span>{{teamInfo.teamRakeOff}}元</span></li>
        <li @click="showOrderDetail=!showOrderDetail" >下单：<span>{{teamInfo.teamOrderAccount}}元</span><img src="../../assets/img/down.png" :class="{'rotate':showOrderDetail}" ></li>
        <li v-if="showOrderDetail" >28投注：<span>{{teamInfo.teamOrder28Account}}元</span></li>
        <li v-if="showOrderDetail" >彩票投注：<span>{{teamInfo.teamOrderOtherAccount}}元</span></li>
        <li>充值：<span>{{teamInfo.teamInAmount}}元</span></li>
        <li>提现：<span>{{teamInfo.teamOutAmount}}元</span></li>
        <li>佣金：<span>{{teamInfo.rewardAgent}}元</span></li>
        <li>奖金：<span>{{teamInfo.teamWinAccount}}元</span></li>
      </ul>
    </div>
    <popup v-model="show" class="menu" position="top" >
      <ul> 
        <router-link :to="`${it.menuUrl}`" tag="li" v-for="(it,i) in topMenu" :key="i">
          {{topMenu[i].memuName}}
          <img src="../../assets/img/next.png" v-if="topMenu[index].memuName==topMenu[i].memuName" alt=""/>
        </router-link> 
      </ul> 
    </popup>
    
    <popup v-model="queryShow" class="query" >
      <div class="queryDate">
          <group title="时间">
            <datetime v-model="startDate"  class="selectStartDatetime"></datetime>
            <span class="queryMiddle">—</span>
            <datetime v-model="endDate"   class="selectEndDatetime"></datetime>
          </group>
      </div> 
      <div class="sub" @click="getTeamInfo">确定</div>
    </popup>
     
  </div>
</template>
<script>
import { Popup, Range, XHeader,Datetime,Group, XButton } from 'vux';
 
export default {
  name: 'TeamInfo',
  components: {
    Popup,
    Range,
    XHeader,
    Datetime,
    Group, 
    XButton 
  },
  data() {
    return {
     topMenu:[{'memuName':'团队信息',menuUrl:'/teamInfo'},{'memuName':'团队投注',menuUrl:'/teamOrder'},
      {'memuName':'团队帐变',menuUrl:'/teamCashFlow'},{'memuName':'团队盈亏',menuUrl:'/teamSurplus'},
      {'memuName':'用户管理',menuUrl:'/teamUser'},{'memuName':'注册用户',menuUrl:'/teamReg'}],
      show:false,
      queryShow:false,
      startDate:this.DataTime.getDay(-1),
      endDate:this.DataTime.getDay(0),
      index:0,
      showOrderDetail:false,
      showSurplusDetail:false,
      teamInfo:{
        teamAccount:0,
        teamSurplusAmount:0,
        teamRakeOff:0,
        teamOrderAccount:0,
        teamInAmount:0,
        teamOutAmount:0,
        rewardAgent:0,
        teamWinAccount:0,
        teamOrderOtherAccount:0,
        teamOrder28Account:0,
        team28SurplusAmount:0,
        teamOtherSurplusAmount:0
      }
     
    };
  },
  async created() {
    this.$vux.loading.show({
      text: 'Loading'
    });
    await this.getTeamInfo(); 
    this.$vux.loading.hide();
  },
  methods: {
    async getTeamInfo() {
     
      let res = await this.$http('/queryUserTeamInfo', {
        body: {
          startDate: this.startDate.replace(/-/g,''),
          endDate: this.endDate.replace(/-/g,'')
        }
      });
      if(this.queryShow){
        this.queryShow=!this.queryShow;
      }
       
      this.teamInfo = Object.assign(this.teamInfo, res.returnMap);
    
    } 
  }
};
</script>
<style lang="less">
@import url('./TeamInfo.less');
</style>
