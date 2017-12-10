<template>
  <div id="FooterMenu">
    <flexbox>
      <flexbox-item>
        <router-link to="/">
          <span></span>
          <p>首页</p>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <router-link to="/join">
          <span></span>
          <p>合买</p>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <router-link to="/lotteryRes">
          <span></span>
          <p>开奖</p>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <router-link to="/user">
          <span></span>
          <p>个人中心</p>
        </router-link>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem } from 'vux';
export default {
  name: 'FooterMenu',
  components: {
    Flexbox,
    FlexboxItem
  },
  methods: {
    refresh() {
      window.location.reload();
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./FooterMenu.less');
</style>


