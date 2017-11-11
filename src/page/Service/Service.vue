<template>
  <div id="Service">
    <XHeader :left-options="{backText: ''}">客服</XHeader>
    <NotFound noHeader='1'></NotFound>
  </div>
</template>
<script>
import NotFound from '../NotFound/NotFound';
import { XHeader } from 'vux';

export default {
  name: 'Service',
  components: {
    XHeader,
    NotFound
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await this.$http('/queryCustomerServiceInfo');
      console.log(res);
      window.open(res.returnMap.customerServiceUrl);
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./Service.less');
</style>
