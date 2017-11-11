<template>
  <div id="HelpCon">
    <XHeader :left-options="{backText: ''}">帮助中心</XHeader>
    <div class="main" v-html="con.content">
    </div>
  </div>
</template>
<script>
import { XHeader } from 'vux';

export default {
  name: 'HelpCon',
  components: {
    XHeader
  },
  created() {
    this.getData();
  },
  data() {
    return {
      con: {}
    };
  },
  methods: {
    async getData() {
      let res = await this.$http('/queryArticleDetail', {
        body: {
          articleId: this.$route.params.id
        }
      });
      console.log(res);
      this.con = Object.assign({}, res.returnMap);
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./Help.less');
</style>
