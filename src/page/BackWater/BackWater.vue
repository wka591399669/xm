<template>
  <div id="BackWater">
    <XHeader :left-options="{backText: ''}">我的回水</XHeader>
    <div class="tab">
      <span :class="{'active':tab==1}" @click="checkTab(1)">回水厅</span>
      <span :class="{'active':tab==2}" @click="checkTab(2)">保本厅</span>
      <span :class="{'active':tab==3}" @click="checkTab(3)">高赔率厅</span>
    </div>
    <NotFound v-if="!list.length" noHeader='1'></NotFound>
    <ul v-else>
      <li class="title">
        <span>日期</span>
        <span>回水金额</span>
      </li>
      <li v-for="(it,i) in list" :key="i">
        <span>{{`${it.operDate.substr(0,4)}-${it.operDate.substr(4,2)}-${it.operDate.substr(6,2)} ${it.operDate.substr(8,2)}:${it.operDate.substr(10,2)}:${it.operDate.substr(12,2)}`}}</span>
        <span :class="{'red':it.balance > 0}">{{it.balance}}</span>
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
  name: 'BackWater',
  components: {
    XHeader,
    NotFound,
    Pages
  },
  data() {
    return {
      tab: 1,
      list: [], // info
      totalCount: 0, // 总条数
      pageSize: 10, // 查询条数
      startRow: 0 // 起始条数
    };
  },
  created() {
    this.getData();
  },
  methods: {
    checkTab(i) {
      this.tab = i;
      this.getData();
    },
    async getData(v) {
      this.$vux.loading.show({
        text: 'Loading'
      });
      if (v != undefined) {
        this.startRow = v;
      }
      let res = await this.$http('/queryUserAccInfo', {
        body: {
          roomRank: this.tab,
          startRow: this.startRow,
          pageSize: this.pageSize
        }
      });
      this.list = res.returnList;
      console.log(res);
      this.$vux.loading.hide();
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./BackWater.less');
</style>
