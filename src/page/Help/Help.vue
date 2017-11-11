<template>
  <div id="Help">
    <XHeader :left-options="{backText: ''}">帮助中心</XHeader>
    <NotFound v-if="!list.length" noHeader='1'></NotFound>
    <ul v-else>
      <router-link :to="`/helpCon/${it.helpInfoId}`" tag="li" v-for="(it,i) in list" :key="i">
        <img src="../../assets/img/help.png" alt="">
        {{it.title}}
        <img class="next" src="../../assets/img/next.png" alt="">
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
  name: 'Help',
  components: {
    XHeader,
    NotFound,
    Pages
  },
  async created() {
    await this.getData();
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
      let res = await this.$http('/queryHelpInfoList', {
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
<style lang="less" scoped>
@import url('./Help.less');
</style>
