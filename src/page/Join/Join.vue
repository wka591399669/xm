<template>
  <div id="Join">
    <div class="fx40"> 
      <search @on-submit="onSubmit" @on-blur="onBlur" :auto-fixed="false" v-model="queryUserId" ></search>
      <tab :line-width="3" custom-bar-width="0.8rem">
        <tab-item @on-item-click="onTabClick('2')" :selected="tab=='2'">进行中</tab-item>
        <tab-item @on-item-click="onTabClick('3')" :selected="tab=='3'">进度</tab-item>
        <tab-item @on-item-click="onTabClick('4')" :selected="tab=='4'">方案金额</tab-item>
        <tab-item @on-item-click="onTabClick('1')" :selected="tab=='1'">已满员</tab-item>
      </tab>
    </div>
    
    <ul class="main">
      <router-link :to="`/joinOrderDetail/${it.joinOrderId}`" tag="li" v-for="(it,i) in joinOrderList" :key="i">
        <div class="plan">
          <x-circle :percent="it.schedule" :trail-width="5" trail-color="#111" :stroke-width="5" stroke-color="#ffed95">
            <span>
              <p>{{it.schedule}}%</p>
              <p>保{{it.guaranteeRate}}%</p>
            </span>       
          </x-circle>
        </div>
        <p class="title">{{it.gameTypeName}}<span>发起人：{{it.sponsorsName}}</span></p>
        <em class="line"></em>
        <div class="con">
          <p>
            {{it.totalAmount}}元
            <span>总金额</span>
          </p>
          <p>
            {{it.amount}}元
            <span>每份</span>
          </p>
          <p>
            {{it.stateName}}
            <span>是否追号： {{it.isTrack==0?"否":"是"}}</span>
          </p>
        </div>
        <img src="../../assets/img/next.png">
      </router-link>
    </ul>
     <Pages @change="getData" :startRow="startRow" :pageSize="pageSize" :totalCount="totalCount"></Pages>
  </div>
</template>
<script>
import { Search, Tab, TabItem, XCircle } from 'vux';
import Pages from '../../components/Pages/Pages';
export default {
  name: 'Join',
  components: {
    Search,
    Tab,
    TabItem,
    XCircle,
    Pages
  },
 async created() { 
    await this.getData();
 
  },
  data() {
    return {
      percent:100,
      joinOrderList:[],
      queryUserId:"",
      tab: '2',
      totalCount: 0, // 总条数
      pageSize: 10, // 查询条数
      startRow: 0 // 起始条数
    };
  },
  methods: {
    onSubmit() { 
       this.getData();
    },
    onBlur() {
       this.getData();
    },
    onTabClick(i) {
      this.tab=i;
      this.totalCount= 0;
      this.startRow= 0;  
      this.getData();
    },
    //查询合买订单
     async getData(v) {
      this.$vux.loading.show({
        text: 'Loading'
      });
      if (v != undefined) {
        this.startRow = v;
      }
      let res = await this.$http('/queryJoinOrderInfo', {
        body: {
          startRow: this.startRow,
          pageSize: this.pageSize,
          isPC:0,
          searchId:this.queryUserId,
          state:this.tab
        }
      });
      console.log(res);
      this.joinOrderList = res.returnList;
      this.totalCount = res.totalCount;
      this.$vux.loading.hide();
    }
 
  }
};
</script>
<style lang="less">
@import url('./Join.less');
</style>

