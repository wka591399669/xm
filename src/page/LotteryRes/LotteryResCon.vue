<template>
  <div id="LotteryResCon">
    <XHeader :left-options="{backText: ''}">历史开奖</XHeader>
    <NotFound v-if="!list.length" noHeader='1'></NotFound>
    <ul>
      <li v-for="(it,i) in list" :key="i">
        <p>第{{it.issueId}}期</p>
        <p>
          <em v-for="(is,j) in it.resultStr.split(',')" :key="j">{{is}}</em>
        </p>
        <span>{{`${it.resultDate.substr(8,2)}时${it.resultDate.substr(10,2)}分`}}</span>
      </li>
    </ul>
    <Pages @change="getData" :startRow="startRow" :pageSize="pageSize" :totalCount="totalCount"></Pages>

  </div>
</template>
<script>
import NotFound from '../NotFound/NotFound';
import { XHeader } from 'vux';
import Pages from '../../components/Pages/Pages';

export default {
  name: 'LotteryResCon',
  components: {
    XHeader,
    Pages,
    NotFound
  },
  data() {
    return {
      list: [],
      totalCount: 0, // 总条数
      pageSize: 10, // 查询条数
      startRow: 0 // 起始条数
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData(v) {
      this.$vux.loading.show({
        text: 'Loading'
      });
      if (v != undefined) {
        this.startRow = v;
      }
      let res = await this.$http('/queryGameTypeResultByGameType', {
        body: {
          gameType: this.$route.params.gameType,
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
@import url('./LotteryRes.less');
</style>