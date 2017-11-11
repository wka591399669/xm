<template>
  <div id="MoneyRecord">
    <XHeader :left-options="{backText: ''}">资金明细</XHeader>
    <NotFound v-if="!list.length" noHeader='1'></NotFound>
    <ul v-else>
      <li v-for="(it,i) in list" :key="i">
        <p>{{it.accType}}</p>
        <p>{{showTime(it.operDate)}}</p>
        <span :class="{'win':it.amountIn - it.amountOut > 0}">{{it.amountIn - it.amountOut}}</span>
      </li>
    </ul>
    <Pages @change="getData" :startRow="startRow" :pageSize="pageSize" :totalCount="totalCount"></Pages>
  </div>
</template>
<script>
import NotFound from '../NotFound/NotFound';
import Pages from '../../components/Pages/Pages';
import { XHeader } from 'vux';

export default {
  name: 'MoneyRecord',
  components: {
    XHeader,
    NotFound,
    Pages
  },
  created() {
    this.getData();
  },
  data() {
    return {
      list: [], // info
      totalCount: 0, // 总条数
      pageSize: 10, // 查询条数
      startRow: 0 // 起始条数
    };
  },
  methods: {
    async getData(v) {
      this.$vux.loading.show({
        text: 'Loading'
      });
      if (v != undefined) {
        this.startRow = v;
      }
      let res = await this.$http('/queryUserCashList', {
        body: {
          startRow: this.startRow,
          pageSize: this.pageSize
        }
      });
      this.list = res.returnList;
      this.totalCount = res.totalCount;
      this.$vux.loading.hide();
    },
    showTime(v) {
      return `${v.substr(0, 4)}-${v.substr(4, 2)}-${v.substr(6, 2)} ${v.substr(
        8,
        2
      )}:${v.substr(10, 2)}:${v.substr(12, 2)}`;
    }
  }
};
</script>
<style lang="less">
@import url('./MoneyRecord.less');
</style>
