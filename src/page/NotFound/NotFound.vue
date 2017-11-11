<template>
  <div id="NotFound">
    <XHeader v-if="!noHeader" :left-options="{backText: ''}">404</XHeader>
    <div class="main">
      <img src="../../assets/img/notfound.png" alt="">
      <p>当前页面没有相关数据哦~</p>
    </div>
  </div>
</template>
<script>
import { XHeader } from 'vux';
export default {
  name: 'NotFound',
  components: {
    XHeader
  },
  props: ['noHeader']
};
</script>
<style lang="less" scoped>
@import url('./NotFound.less');
</style>

