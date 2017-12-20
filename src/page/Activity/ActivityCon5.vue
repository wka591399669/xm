<template>
  <div id="ActivityCon5">
    <img src="../../assets/img/activity5Bg.png" alt="">
    <div class="main">
      <img v-if="info.taskState == '0' && info.childTaskList[0].taskState == '1'" @click="getReward" class="btn" src="../../assets/img/5canget.png" alt="">
      <img v-else-if="info.taskState == '1' && info.childTaskList[0].taskState == '2'" class="btn" src="../../assets/img/5isget.png" alt="">
      <img v-else class="btn" src="../../assets/img/5noget.png" alt="">
      <ul v-if="info.childTaskList">
        <li>
          <span>存入金额</span>
          <span>奖励金额</span>
        </li>
        <li v-for="(it,i) in info.childTaskList[0].taskDecDetail" :key="i">
          <span v-if="i==(info.childTaskList[0].taskDecDetail.length-1)">{{it[0]}}以上</span>   
          <span v-else >{{it[0]}}-{{it[1]-1}}</span>
          <span>{{it[2]}}%</span>
        </li>
      </ul>
      <div class="info">
        <p>温馨提示：</p>
        <p>1、每日首充的所有会员都可以参与此活动。</p>
        <p>2、参与充值赠送礼金的会员需完成充值金额3.5倍投注量即可提现。</p>
        <p>3、禁止恶意注册账号套取赠送礼金，套现，洗钱等非法行为，如有发现违规账户将没收盈利、永久冻结。</p>
        <p>4、汇中国际保留对此活动的修改权限。</p>
      </div>
    </div>
  </div>
</template>
<script>
import { XHeader } from 'vux';

export default {
  name: 'AvtivityCon5',
  components: {
    XHeader
  },
  data() {
    return {
      info: {}
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
      let res = await this.$http('/queryTaskList');
      res.returnList.map(x => {
        if (x.taskId == '5') {
          this.info = Object.assign({}, x);
          console.log(x);
        }
      });
      this.$vux.loading.hide();
    },
    // 领取
    async getReward() {
      this.$vux.loading.show({
        text: 'Loading'
      });
      let res = await this.$http('/getReward', {
        body: {
          taskId: '5'
        }
      });
      this.$vux.loading.hide();
      if (res.returnCode == '0000') {
        this.$vux.toast.show({
          text: '领取成功',
          type: 'success'
        });
        this.getList();
      } else {
        this.$vux.toast.show({
          text: res.returnMessage,
          type: 'warn'
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url('./ActivityCon5.less');
</style>
