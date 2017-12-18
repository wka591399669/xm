<template>
  <div id="ActivityCon1">
    <img src="../../assets/img/activity1Bg.png" alt="">
    <div class="main">
      <img v-if="info.taskState == '0' && (info.childTaskList[0].taskState == '1'||info.childTaskList[1].taskState == '1'||info.childTaskList[2].taskState == '1')" @click="getReward" class="btn" src="../../assets/img/1canget.png" alt="">
      <img v-else-if="info.taskState == '1' && info.childTaskList[0].taskState == '2'" class="btn" src="../../assets/img/1isget.png" alt="">
      <img v-else class="btn" src="../../assets/img/1noget.png" alt="">
      <ul v-if="info.childTaskList">
        <li v-for="(it,i) in info.childTaskList" :key="i">
          <span>Step {{i+1}}</span>
          <p>{{it.taskDec}}</p>
        </li>
      </ul>
      <div class="info">
        <p>温馨提示：</p>
        <p>1、同一姓名、卡号、ip地址的用户只能参与一次。</p>
        <p>2、参与充值赠送礼金的会员需完成充值金额3.5倍投注量即可提现。</p>
        <p>3、禁止恶意注册账号套取赠送礼金，套现，洗钱等非法行为如有发现违规账户将没收盈利、永久冻结。</p>
        <p>4、汇中国际保留对此活动的修改权限。</p>
      </div>
    </div>
  </div>
</template>
<script>
import { XHeader } from 'vux';

export default {
  name: 'ActivityCon1',
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
        if (x.taskId == '1') {
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
          taskId: '1'
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
@import url('./ActivityCon1.less');
</style>

