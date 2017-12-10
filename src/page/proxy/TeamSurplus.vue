<template>
  <div id="TeamSurplus">
    <XHeader :left-options="{backText: '',preventGoBack:true}" @on-click-back="$router.push('/user')"> 
     <div @click="show=!show">
         {{topMenu[index].memuName}}
      </div> 
      <div slot="right" @click="queryShow=!queryShow">
       筛选
      </div>
    </XHeader>
    <div class="main">
       <NotFound v-if="!list.length" noHeader='1'></NotFound>
       <ul v-else>
        <li class="title">
          <span>账号</span><span>充值总额</span><span>彩票盈亏</span><span>余额</span>
        </li>
        <li v-for="(it,i) in list" :key="i" class="body" @click="openSurplusDetail(i)">
          <span>{{it.userId}}</span><span :class="{'red':parseFloat(it.teamInAmount) > 0}">{{it.teamInAmount}}</span>
          <span :class="{'red':parseFloat(it.teamSurplusAmount) > 0}">{{it.teamSurplusAmount}}</span><span :class="{'red':parseFloat(it.teamAccount) > 0}">{{it.teamAccount}}</span>
        </li> 
         
      </ul>
    </div>
    <popup v-model="show" class="menu" position="top" >
      <ul> 
        <router-link :to="`${it.menuUrl}`" tag="li" v-for="(it,i) in topMenu" :key="i">
          <li>{{topMenu[i].memuName}}</li>
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
      <div class="queryUser">下级账号<input type="text" v-model="queryUserId" /></div>
      <div class="sub" @click="getTeamSurplusInfo">确定</div>
    </popup>
    
     <!-- 团队盈亏详情 -->
    <popup class="surplusDetailPopup" v-model="surplusDetailShow" height="100%">
      <XHeader @on-click-back="leaveSurplusDetail" :left-options="{backText: '',preventGoBack:true}">
        帐变详情
      </XHeader>
      <div v-if="surplusInde!=-1"> 
        <ul>
          <li>
            <span>账号</span>
            <span>{{list[surplusInde].userId}}</span> 
          </li> 
          <li>
            <span>充值总额</span>
            <span>{{list[surplusInde].teamInAmount}}</span> 
          </li> 
          <li>
            <span>提现总额</span>
            <span>{{list[surplusInde].teamOutAmount}}</span> 
          </li> 
          <li>
            <span>消费总额</span>
            <span>{{list[surplusInde].teamStakeTotal}}</span> 
          </li> 
          <li>
            <span>中奖总额</span>
            <span>{{list[surplusInde].teamWinAccount}}</span> 
          </li> 
          <li>
            <span>返点总额</span>
            <span>{{list[surplusInde].teamRakeOff}}</span> 
          </li> 
          <li>
            <span>佣金总额</span>
            <span>{{list[surplusInde].rewardAgent}}</span> 
          </li>  
          <li>
            <span>彩票盈亏</span>
            <span>{{list[surplusInde].teamSurplusAmount}}</span> 
          </li>       
          <li>
            <span>余额</span>
            <span>{{list[surplusInde].teamAccount}}</span> 
          </li>  
        </ul>
      </div> 
      <div class="queryLowerUserClass" v-if="surplusInde!=-1 && list[surplusInde].userType=='80'" @click="queryLowerUserInfo(`${list[surplusInde].userId}`)">
        查看下级
      </div>
    </popup> 
  </div>
</template>
<script>
import NotFound from '../NotFound/NotFound';
import { Popup, Range, XHeader,Datetime,Group, XButton } from 'vux';
 
export default {
  name: 'TeamSurplus',
  components: {
    Popup,
    Range,
    XHeader,
    NotFound,
    Datetime,
    Group, 
    XButton 
  },
  data() {
    return {
      topMenu:[{'memuName':'团队信息',menuUrl:'/teamInfo'},{'memuName':'团队投注',menuUrl:'/teamOrder'},
      {'memuName':'团队帐变',menuUrl:'/teamsurplus'},{'memuName':'团队盈亏',menuUrl:'/teamSurplus'},
      {'memuName':'用户管理',menuUrl:'/teamUser'},{'memuName':'注册用户',menuUrl:'/teamReg'}],
      show:false,
      queryShow:false,
      list: [], // info
      startDate:this.DataTime.getDay(-1),
      endDate:this.DataTime.getDay(0),
      
      surplusDetailShow:false, 
      surplusInde:-1,

      index:3,
      queryUserId:''
     
    };
  },
  async created() {
    this.$vux.loading.show({
      text: 'Loading'
    });
    await this.getTeamSurplusInfo(); 
    this.$vux.loading.hide();
  },
  methods: {
    async getTeamSurplusInfo() {
     
      let res = await this.$http('/queryUserTeamSurplusInfo', {
        body: {
          startDate: this.startDate.replace(/-/g,''),
          endDate: this.endDate.replace(/-/g,''),
          queryUserId:this.queryUserId
        }
      });
      if(this.queryShow){
        this.queryShow=!this.queryShow;
      } 
      this.list = res.returnList;
       
    }, 
     // 退出帐变详情
    leaveSurplusDetail() {
      document.body.style.overflow = 'auto';
      this.surplusDetailShow = false;
    },
    //打开帐变详情
    openSurplusDetail(v){
      this.surplusInde=v;
      this.surplusDetailShow=true;
    },
    //查看下级
    queryLowerUserInfo(lowerUserId){
      this.surplusDetailShow=false;
      this.queryUserId=lowerUserId;
      this.surplusInde=-1;
      this.getTeamSurplusInfo();
    }
  }
};
</script>
<style lang="less">
@import url('./TeamSurplus.less');
</style>
