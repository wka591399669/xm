<template>
  <div id="Join">
    <div class="fx40">
      <search @on-submit="onSubmit" @on-focus="onFocus" :auto-fixed="false"></search>
      <tab :line-width="3" custom-bar-width="0.8rem">
        <tab-item @on-item-click="onTabClick('all')" :selected="tab=='all'">进行中</tab-item>
        <tab-item @on-item-click="onTabClick('jd')" :selected="tab=='jd'">进度</tab-item>
        <tab-item @on-item-click="onTabClick('fa')" :selected="tab=='fa'">方案金额</tab-item>
        <tab-item @on-item-click="onTabClick('my')" :selected="tab=='my'">已满员</tab-item>
      </tab>
    </div>
    
    <ul class="main">
      <router-link :to="`/orderDetail/we/${i}`" tag="li" v-for="(it,i) in 10" :key="i">
        <div class="plan">
          <x-circle :percent="percent" :trail-width="5" trail-color="#111" :stroke-width="5" stroke-color="#ffed95">
            <span>
              <p>{{percent}}%</p>
              <p>保{{percent}}%</p>
            </span>       
          </x-circle>
        </div>
        <p class="title">分分彩<span>发起人：张**</span></p>
        <em class="line"></em>
        <div class="con">
          <p>
            8888元
            <span>总金额</span>
          </p>
          <p>
            10元
            <span>每份</span>
          </p>
          <p>
            未中奖
            <span>是否追号：是</span>
          </p>
        </div>
        <img src="../../assets/img/next.png">
      </router-link>
    </ul>
  </div>
</template>
<script>
import { Search, Tab, TabItem, XCircle } from 'vux';
export default {
  name: 'Join',
  components: {
    Search,
    Tab,
    TabItem,
    XCircle
  },
  created() {
    this.$vux.loading.show({
      text: 'Loading'
    });
    this.$vux.loading.hide();
  },
  data() {
    return {
      tab: 'all',
      percent: 100
    };
  },
  methods: {
    onSubmit() {},
    onFocus() {},
    onTabClick(i) {
      console.log(i);
    },
    getMain() {}
  }
};
</script>
<style lang="less">
@import url('./Join.less');
</style>

