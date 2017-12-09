<template>
  <div id="TeamOrder">
    <XHeader :left-options="{backText: '',preventGoBack:true}" @on-click-back="$router.push('/user')"> 
     <div @click="show=!show">
         {{topMenu[index].memuName}}
      </div> 
      <div slot="right" @click="queryShow=!queryShow">
       筛选
      </div>
    </XHeader>
    <div class="main">
       <NotFound v-if="!(list != undefined && list.length>0)" noHeader='1'></NotFound>
       <ul v-else>
        <li class="title">
          <span>用户</span><span>订单号</span><span>中奖奖金</span><span>中奖状态</span>
        </li>
        <li v-for="(it,i) in list" :key="i" class="body" @click="openOrderDetail(i)">
          <span>{{it.userID}}</span><span>{{it.batchOrderID}}</span>
          <span>{{it.winAmount}}</span><span>{{it.stateName}}</span>
        </li>  
      </ul>
      <Pages @change="getTeamOrderInfo" :startRow="startRow" :pageSize="pageSize" :totalCount="totalCount"></Pages>
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
      <div class="stateTypeClass">
        <span>中奖情况</span>
        <ul>
          <li >
            <span v-for="(it,i) in isWinType" :key="i"  @click="winTypeInde=i" :class="{'select':i==winTypeInde}">{{it.winTypeName}}</span>
          </li>
        </ul>
      </div> 
      <div class="stateTypeClass">
        <span>状态</span>
        <ul>
          <li >
            <span v-for="(it,i) in stateType" :key="i"  @click="selectStateType(i)" :class="{'select':i==stateTypeInde}">{{it.stateName}}</span>
          </li>
        </ul>
      </div> 
      <div class="queryUser">订单编号<input type="text" v-model="queryBatchOrderId" /></div>
      <div class="queryUser">下级账号<input type="text" v-model="queryUserId" /></div>
      
      <div class="queryTypeClass">
        <span>搜索类型</span>
        <ul>
          <li >
            <span v-for="(it,i) in queryTypeList" :key="i"  @click="queryTypeInde=i" :class="{'select':i==queryTypeInde}">{{it.queryTypeName}}</span>
          </li>
        </ul>
      </div> 
      
      <div class="gameTypeClass">
        <span>彩票种类</span>
        <ul>
          <li v-if="gameTypeList != undefined && gameTypeList.length >0" >
            <span  v-for="(it,i) in gameTypeList" :key="i"  @click="gameTypeInde=i" :class="{'select':i==gameTypeInde}">{{it.gameTypeName}}</span>
          </li>
        </ul>
      </div> 
      <div class="sub" @click="getTeamOrderInfo(0)">确定</div>
    </popup>
     <!-- 投注记录详情 -->
    <popup class="orderDetailPopup" v-model="orderDetailShow" height="100%">
      <XHeader @on-click-back="leaveOrderDetail" :left-options="{backText: '',preventGoBack:true}">
        投注详情
      </XHeader>
      <div v-if="orderInde!=-1"> 
        <ul>
          <li>
            <span>用户</span>
            <span>{{list[orderInde].userID}}</span> 
          </li> 
          <li>
            <span>订单号</span>
            <span>{{list[orderInde].batchOrderID}}</span> 
          </li> 
          <li>
            <span>时间</span>
            <span>{{list[orderInde].orderTime}}</span> 
          </li> 
          <li>
            <span>彩种/起始期数</span>
            <span>{{list[orderInde].gameTypeName}}/{{list[orderInde].issue}}</span> 
          </li> 
          <li>
            <span>总金额</span>
            <span>{{list[orderInde].totalStake}}</span> 
          </li> 
          <li>
            <span>中奖金额</span>
            <span>{{list[orderInde].winAmount}}</span> 
          </li> 
          <li>
            <span>中奖状态</span>
            <span>{{list[orderInde].stateName}}</span> 
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
      stateType:[{'stateName':'全部',stateValue:'-1'},{'stateName':'正常',stateValue:'0'},
      {'stateName':'撤单',stateValue:'90'}],
      isWinType:[{'winTypeName':'全部',winTypeValue:''},{'winTypeName':'中奖',winTypeValue:'0'},
      {'winTypeName':'未中奖',winTypeValue:'1'}],
      queryTypeList:[{'queryTypeName':'团队',queryTypeValue:'0'},{'queryTypeName':'个人',queryTypeValue:'1'}],
      stateTypeInde:0,
      winTypeInde:0,
      queryTypeInde:0,
      gameTypeInde:0,
      show:false,
      queryShow:false,
      orderDetailShow:false, 
      list: [], // info
      orderInde:-1,
      startDate:this.DataTime.getDay(-1),
      endDate:this.DataTime.getDay(0),
      index:1,
      queryBatchOrderId:'',
      queryUserId:'',
      gameTypeList:[],
      totalCount: 0, // 总条数
      pageSize: 10, // 查询条数
      startRow: 0 // 起始条数 
    };
  },
   computed: {
    queryGameType() {
      console.log(this.gameTypeList);
      if(this.gameTypeList != undefined && this.gameTypeList.length>0){
        return this.gameTypeList[this.gameTypeInde].gameType;
      }
      return '';
    }
   }, 
  async created() {
    this.$vux.loading.show({
      text: 'Loading'
    });
    await this.getGameTypeList();
    this.$vux.loading.hide();
  },
  methods: {
    async getTeamOrderInfo(v) {

      if (v != undefined) {
        this.startRow = v;
      }
     
      let res = await this.$http('/queryTeamBatchCathecticListInfo', {
        body: {
          startDate: this.startDate.replace(/-/g,''),
          endDate: this.endDate.replace(/-/g,''),
          queryType:this.queryTypeList[this.queryTypeInde].queryTypeValue,
          lowerUserID:this.queryUserId,
          orderState:this.stateType[this.stateTypeInde].stateValue,
          batchOrderId:this.queryBatchOrderId,
          startRow: this.startRow,
          pageSize: this.pageSize,
          gameType:this.queryGameType,
          isWin:this.isWinType[this.winTypeInde].winTypeValue
        }
      });
      if(this.queryShow){
        this.queryShow=!this.queryShow;
      }
      if(res.returnCode=='0000'){
        this.list = res.returnMap.buyList;
        this.totalCount = res.totalCount;
      }else{
         this.$vux.toast.show({
            text: res.returnMessage,
            type: 'warn'
          });
      }
    },
    selectStateType(index){
      this.stateTypeInde=index;
    },
    async getGameTypeList(){
      let res = await this.$http('/queryGameTypeListByParentId');
      this.gameTypeList=res.returnList;
    
      this.gameTypeList.unshift({"gameType":"","gameTypeName":"全部"}); 
      this.getTeamOrderInfo();  
    },
     // 退出投注详情
    leaveOrderDetail() {
      document.body.style.overflow = 'auto';
      this.orderDetailShow = false;
    },
    //打开投注详情
    openOrderDetail(v){
      this.orderInde=v;
      this.orderDetailShow=true;
    }
  }
};
</script>
<style lang="less">
@import url('./TeamOrder.less');
</style>
