<template>
  <div id="ActivityCon1">
    <img src="../../assets/img/activity1Bg.png" alt="">
    <div class="main">
      <img v-if="info.taskState == '0' && info.childTaskList[0].taskState == '1'" @click="getReward" class="btn" src="../../assets/img/1canget.png" alt="">
      <img v-if="info.taskState == '1' && info.childTaskList[0].taskState == '2'" class="btn" src="../../assets/img/1isget.png" alt="">
      <img v-else class="btn" src="../../assets/img/1noget.png" alt="">
      <ul v-if="info.childTaskList">
        <li v-for="(it,i) in info.childTaskList" :key="i">
          <span>Step {{i+1}}</span>
          <p>{{it.taskDec}}</p>
        </li>
      </ul>
      <div class="info">
        <p>活动说明</p>
        <p>1、新注册会员，注册填写个人资料，绑定银行卡，并且充值成功后进行游戏投注后即可领取新人大礼包。</p>
        <p>2、一个帐号仅可领取一次新人大礼包。</p>
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

