<template>
  <div id="LotteryRes">
    <XHeader :left-options="{showBack: false}">开奖信息 <a slot="right" @click="getList">刷新</a></XHeader>
    <!-- <img class="link" src="../../assets/img/link1.png" alt=""> -->
    <ul>
      <router-link tag="li" :to="`/lotteryResCon/${it.gameType}`" v-for="(it,i) in list" :key="i">
        <img class="logo" :src="require(`../../assets/img/lottery/${it.gameType}.png`)" alt="">
        <img class="next" src="../../assets/img/next.png" alt="">
        <div class="info">
          <p>
            <span>{{it.gameName}}</span>
            <span>第<em>{{it.issueId}}</em>期</span>
            <span>{{it.resultDate.substr(8,2)}}时{{it.resultDate.substr(10,2)}}分开奖</span>
          </p>
          <p>
            <em  v-for="(is,j) in it.resultStr.split(',')" :key="j">{{is}}</em>
          </p>
        </div>
      </router-link>
    </ul>
    
  </div>
</template>
<script>
import { XHeader } from 'vux';

export default {
  name: 'LotteryRes',
  components: {
    XHeader
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.$vux.loading.show({
        text: 'Loading'
      });
      let res = await this.$http('/queryAllGameTypeResult');
      console.log(res);
      this.list = res.returnList;
      this.$vux.loading.hide();
    }
    
  }
};
</script>
<style lang="less" scoped>
@import url('./LotteryRes.less');
</style>

