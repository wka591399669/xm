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
          <span>达到{{it[0]}}</span>
          <span>{{it[2]}}%</span>
        </li>
      </ul>
      <div class="info">
        <p>活动说明</p>
        <p>1、活动即日起生效，未下架视为长期有效。</p>
        <p>2、达到要求后请在当日23:59:59秒前进行领取，如超出时间系统将视为自动放弃。</p>
        <p>3、本平台保留对后动在无通知情况更改，终止，并享有最终解释权。</p>
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
