<template>
  <div id="FooterMenu">
    <flexbox>
      <flexbox-item>
        <router-link to="/">
          <span></span>
          <p>首页</p>
        </router-link>
      </flexbox-item>
      <!-- <flexbox-item>
        <router-link to="/join">
          <span></span>
          <p>合买</p>
        </router-link>
      </flexbox-item> -->
      <flexbox-item>
        <router-link to="/lotteryRes" @click.native="window.location.reload()">
          <span></span>
          <p>开奖</p>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <router-link to="/user">
          <span></span>
          <p>我的</p>
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
  }
};
</script>
<style lang="less" scoped>
@import url('./FooterMenu.less');
</style>


