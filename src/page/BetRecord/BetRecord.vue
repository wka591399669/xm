<template>
  <div id="BetRecord">
    <XHeader :left-options="{backText: ''}">投注记录</XHeader>
    <p>当前余额<span>{{userInfo.amount}}</span>元</p>
    <NotFound v-if="!list.length" noHeader='1'></NotFound>
    <ul v-else>
      <router-link :to="`/orderDetail/${it.batchOrderId}`" tag="li" v-for="(it,i) in list" :key="i">
        <p>
          <span>{{it.gameName}}</span>
          <span>{{it.issueId}}期</span>
        </p>
        <p>
          <span>{{it.ballList[0].productTypeName}}</span>
          <span>{{it.stakeTotal}}元</span>
        </p>
        <p>
          <span>{{it.orderDate.slice(8,10)}}:{{it.orderDate.slice(10,12)}}</span>
          <span :class="{'red':it.state == 1}">{{state[Number(it.state)]}}</span>
        </p>
      </router-link>
    </ul>
    <Pages @change="getData" :startRow="startRow" :pageSize="pageSize" :totalCount="totalCount"></Pages>
  </div>
</template>
<script>
import NotFound from '../NotFound/NotFound';
import Pages from '../../components/Pages/Pages';
import { XHeader } from 'vux';
export default {
  name: 'BetRecord',
  components: {
    XHeader,
    NotFound,
    Pages
  },
  computed: {},
  async created() {
    await this.getData();
    await this.getUserInfo();
  },
  data() {
    return {
      userInfo: {},
      state: ['下单成功', '已中奖', '未中奖', '已取消'],
      list: [], // info
      totalCount: 0, // 总条数
      pageSize: 10, // 查询条数
      startRow: 0 // 起始条数
    };
  },
  methods: {
    async getUserInfo() {
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
      let res = await this.$http('/queryUserCathecticList', {
        body: {
          startRow: this.startRow,
          pageSize: this.pageSize
        }
      });
      console.log(res);
      this.list = res.returnList;
      this.totalCount = res.totalCount;
      this.$vux.loading.hide();
    }
  }
};
</script>
<style lang="less">
@import url('./BetRecord.less');
</style>
