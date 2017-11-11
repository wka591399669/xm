<template>
  <div id="Activity">
    <XHeader :left-options="{backText: ''}">优惠活动</XHeader>
    <!-- <NotFound noHeader="1"></NotFound> -->
    <ul>
      <router-link :to="`/activityCon/${it.taskId}`" tag="li" v-for="(it,i) in list" :key="i">
        <div class="img">
          <img :src="taskImg[it.taskId]" alt="">
        </div>
        <p>{{it.taskTitle}}</p>
        <span>{{it.taskDec}}</span>
        <div class="btn">查看详情</div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import { XHeader } from 'vux';
import NotFound from '../NotFound/NotFound';
export default {
  name: 'Activity',
  components: {
    XHeader,
    NotFound
  },
  data() {
    return {
      list: [],
      taskImg: {
        '1': require('../../assets/img/activity1.png'),
        '5': require('../../assets/img/activity2.png')
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let res = await this.$http('/queryTaskList');
      console.log(res);
      this.list = res.returnList;
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./Activity.less');
</style>


