<template>
  <div id="BetRecord">
    <XHeader :left-options="{backText: ''}">
      合买记录
     <!--  <a slot="right" @click="queryShowPop">筛选</a> -->
    </XHeader>
    <NotFound v-if="!list.length" noHeader='1'></NotFound>
    <ul v-else>
      <router-link :to="`/JoinOrderDetail/${it.joinOrderId}`" tag="li" v-for="(it,i) in list" :key="i" v-if="list.length">
          <p>
            <span>发起合买<em>{{it.buyNum}}</em>份</span>
            <span>{{it.openDate.slice(0,4)}}-{{it.openDate.slice(4,6)}}-{{it.openDate.slice(7,9)}}</span>
            <span>{{it.openDate.slice(0,2)}}:{{it.openDate.slice(2,4)}}:{{it.openDate.slice(4,6)}}</span>
          </p>
          <p>
            <span><em>{{it.winAmount}}</em></span>
            <span><em>{{it.stateName}}</em></span>
          </p>
      </router-link>
    </ul>
    <Pages @change="getData" :startRow="startRow" :pageSize="pageSize" :totalCount="totalCount"></Pages>
    <!-- 投注記錄-->
    <popup v-model="queryShow" class="query" >
      <div class="queryDate">
          <group title="时间">
            <datetime v-model="startDate"  class="selectStartDatetime"></datetime>
            <span class="queryMiddle">—</span>
            <datetime v-model="endDate"   class="selectEndDatetime"></datetime>
          </group>
      </div> 
      <div class="queryUser">
        <span>状态</span>
        <ul>
          <li @click="award=!award" :class="{'select':award}">已中奖</li>
          <li @click="noAward=!noAward" :class="{'select':noAward}">未中奖</li>
        </ul>
      </div>
      <div class="accTypeClass">
        <span>彩种</span>
        <ul>
          <li >
            <span v-for="(it,i) in gameTypeList" :key="i" @click="selectGameType(i)" :class="{'select':i==gameNum}">{{it.gameTypeName}}</span>
          </li>
        </ul>
      </div> 
      <div class="option">
        <div class="reset" @click="resetC">重置</div>
        <div class="sub" @click="getData(0)">确定</div>
      </div>
    </popup>
  </div>
</template>
<script>
import NotFound from '../NotFound/NotFound';
import Pages from '../../components/Pages/Pages';
import { XHeader,Popup,Group,Datetime} from 'vux';
export default {
  name: 'BetRecord',
  components: {
    XHeader,
    NotFound,
    Pages,
    Popup,
    Group,
    Datetime
  },
  computed: {},
  async created() {
    await this.getData();
    await this.getUserInfo();
    await this.getGameType();
  },
  data() {
    return {
      userInfo: {},
      state: ['下单成功', '已中奖', '未中奖', '已取消'],
      list: [], // info
      totalCount: 0, // 总条数
      pageSize: 10, // 查询条数
      startRow: 0, // 起始条数
      queryShow:false,
      startDate:this.DataTime.getDay(-1),
      endDate:this.DataTime.getDay(0),
      queryUserId:false,
      gameTypeList:[],
      gameNum:0,
      award:false,
      noAward:false
    };
  },
  methods: {
    async getUserInfo() {
      console.log(this.$route.params.gameType);
      let res = await this.$http('/queryUserCommonInfo', {
        body: {
          userId: window.localStorage.getItem('userId'),
          token: window.localStorage.getItem('token')
        }
      });
      this.userInfo = Object.assign({}, res.returnMap);
    },
    async getData(v) {
      this.$vux.loading.show({
        text: 'Loading'
      });
      if (v != undefined) {
        this.startRow = v;
      }
      let res = await this.$http('/queryUserJoinOrder', {
        body: {
          startRow: this.startRow,
          pageSize: this.pageSize
        }
      });
      this.list = res.returnList;
      this.totalCount = res.totalCount;
      this.$vux.loading.hide();
    },
    queryShowPop(){
      this.queryShow =!this.queryShow;
      /* this.getGameType(); */
    },
    async getGameType(v) {
      this.$vux.loading.show({
        text: 'Loading'
      });
      let res = await this.$http('/queryGameTypeListByParentId', {});
      this.gameTypeList = res.returnList;
      this.$vux.loading.hide();
    },
    selectGameType(index){
      this.gameNum = index;
    },
    resetC(){
      this.gameNum = 0;
      this.award = false;
      this.noAward=false;
    }
  }
};
</script>
<style lang="less">
@import url('../Join/JoinRcord.less');
</style>
