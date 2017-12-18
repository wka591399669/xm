<template>
  <div id="TeamCashFlow">
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
       <NotFound v-if="!list.length" noHeader='1'></NotFound>
       <ul v-else>
        <li class="title">
          <span>账号</span><span>订单号</span><span>收入</span><span>支付</span>
        </li>
        <li v-for="(it,i) in list" :key="i" class="body" @click="openCashFlowDetail(i)">
          <span>{{it.userID}}</span><span>{{it.accountID}}</span>
          <span>{{it.accountIn}}</span><span>{{it.accountOut}}</span>
        </li>  
      </ul>
      <Pages @change="getTeamCashFlowInfo" :startRow="startRow" :pageSize="pageSize" :totalCount="totalCount"></Pages>
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
      <div class="queryUser">下级账号<input type="text" v-model="queryUserId" /></div>
      <div class="accTypeClass">
        <span>帐变类型</span>
        <ul>
          <li >
            <span v-for="(it,i) in accType" :key="i"  @click="selectAccType(i)" :class="{'select':i==accTypeInde}">{{it.accTypeName}}</span>
          </li>
        </ul>
      </div> 
      <div class="sub" @click="getTeamCashFlowInfo(0)">确定</div>
    </popup>
     
     <!-- 团队帐变详情 -->
    <popup class="cashFlowDetailPopup" v-model="cashFlowDetailShow" height="100%">
      <XHeader @on-click-back="leaveCashFlowDetail" :left-options="{backText: '',preventGoBack:true}">
        帐变详情
      </XHeader>
      <div v-if="cashFlowInde!=-1"> 
        <ul>
          <li>
            <span>帐变用户</span>
            <span>{{list[cashFlowInde].userID}}</span> 
          </li> 
          <li>
            <span>订单号</span>
            <span>{{list[cashFlowInde].accountID}}</span> 
          </li> 
          <li>
            <span>时间</span>
            <span>{{list[cashFlowInde].operDate}}</span> 
          </li> 
          <li>
            <span>彩种/起始期数</span>
            <span>{{list[cashFlowInde].gameTypeName}}/{{list[cashFlowInde].issueID}}</span> 
          </li> 
          <li>
            <span>类型</span>
            <span>{{list[cashFlowInde].accountTypeName}}</span> 
          </li> 
          <li>
            <span>收入</span>
            <span>{{list[cashFlowInde].accountIn}}</span> 
          </li> 
          <li>
            <span>支出</span>
            <span>{{list[cashFlowInde].accountOut}}</span> 
          </li>  
          <li>
            <span>余额</span>
            <span>{{list[cashFlowInde].account}}</span> 
          </li>  
        </ul>
      </div>
    </popup>
  </div>
</template>
<script>
import NotFound from '../NotFound/NotFound';
import Pages from '../../components/Pages/Pages';
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
    XButton,
    Pages
  },
  data() {
    return {
      topMenu:[{'memuName':'团队信息',menuUrl:'/teamInfo'},{'memuName':'团队投注',menuUrl:'/teamOrder'},
      {'memuName':'团队帐变',menuUrl:'/teamCashFlow'},{'memuName':'团队盈亏',menuUrl:'/teamSurplus'},
      {'memuName':'用户管理',menuUrl:'/teamUser'},{'memuName':'注册用户',menuUrl:'/teamReg'}],
      accType:[{'accTypeName':'全部',accTypeValue:''},{'accTypeName':'账号充值',accTypeValue:'ACC_IN'},
      {'accTypeName':'账号提现',accTypeValue:'ACC_OUT'},{'accTypeName':'投注扣款',accTypeValue:'ORDER'}],
      accTypeInde:0,
      show:false,
      queryShow:false,
      list: [], // info
      startDate:this.DataTime.getDay(-1),
      endDate:this.DataTime.getDay(0),
      index:2,
      queryUserId:'',
      
      cashFlowDetailShow:false, 
      cashFlowInde:-1,

      totalCount: 0, // 总条数
      pageSize: 10, // 查询条数
      startRow: 0 // 起始条数
     
    };
  },
  async created() {
    this.$vux.loading.show({
      text: 'Loading'
    });
    await this.getTeamCashFlowInfo(); 
    this.$vux.loading.hide();
  },
  methods: {
    async getTeamCashFlowInfo(v) {

      if (v != undefined) {
        this.startRow = v;
      }
     
      let res = await this.$http('/queryTeamCashDetailInfo', {
        body: {
          startDate: this.startDate.replace(/-/g,''),
          endDate: this.endDate.replace(/-/g,''),
          lowerUserID:this.queryUserId,
          accountType:this.accType[this.accTypeInde].accTypeValue,
          startRow: this.startRow,
          pageSize: this.pageSize
        }
      });
      if(this.queryShow){
        this.queryShow=!this.queryShow;
      }
      this.list = res.returnList;
      this.totalCount = res.totalCount;
       
    },
    selectAccType(index){
      this.accTypeInde=index;
    },
     // 退出帐变详情
    leaveCashFlowDetail() {
      document.body.style.overflow = 'auto';
      this.cashFlowDetailShow = false;
    },
    //打开帐变详情
    openCashFlowDetail(v){
      this.cashFlowInde=v;
      this.cashFlowDetailShow=true;
    }
  }
};
</script>
<style lang="less">
@import url('./TeamCashFlow.less');
</style>
