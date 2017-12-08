<template>
  <div id="TeamCashFlow">
    <XHeader :left-options="{backText: ''}"> 
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
          <span>账号</span><span>订单号</span><span>收入</span><span>支付</span>
        </li>
        <li v-for="(it,i) in list" :key="i" class="body">
          <span>{{it.userID}}</span><span>{{it.batchOrderId}}</span>
          <span>{{it.accountIn}}</span><span>{{it.accountOut}}</span>
        </li>  
      </ul>
      <Pages @change="getTeamCashFlowInfo" :startRow="startRow" :pageSize="pageSize" :totalCount="totalCount"></Pages>
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
          queryUserId:this.queryUserId,
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
    }
  }
};
</script>
<style lang="less">
@import url('./TeamCashFlow.less');
</style>
