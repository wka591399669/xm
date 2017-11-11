<template>
  <div id="Guide">
    <div class="main">
      <router-link to="/" tag="span" class="wap">继续访问</router-link>
      <p>温馨提示：WAP手机端直接点击链接按钮访问</p>
      <p>推荐您使用手机APP购彩，请选择下载</p>
      <a :href="SETTING.link.android" target="_blank">
        <span class="apple">
          <img src="../../assets/img/apple.png" alt="">
          App Store下载
        </span>
      </a>
      <a :href="SETTING.link.ios" target="_blank">
        <span class="android">
          <img src="../../assets/img/android.png" alt="">
          Android下载
        </span>
      </a>
      
    </div>
  </div>
</template>
<script>
export default {
  name: 'Guide',
  watch: {
    $route() {
      document.body.style.overflow = 'auto';
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./Guide.less');
</style>

