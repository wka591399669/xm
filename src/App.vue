<template>
  <div id="app">
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
      <router-view class="page"></router-view>
    </transition>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
      <FooterMenu v-if="show.indexOf($route.name) >= 0"></FooterMenu>
    </transition>
  </div>
</template>

<script>
import FooterMenu from './components/FooterMenu/FooterMenu';
export default {
  name: 'app',
  components: {
    FooterMenu
  },
  data() {
    return {
      show: ['Home', 'Join', 'LotteryRes', 'User']
    };
  }
};
</script>
<style lang="less">

</style>


