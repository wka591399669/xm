<template>
  <div id="Integral">
    <XHeader :left-options="{backText: ''}">积分兑换</XHeader>
    <div class="head">
      <span>100积分兑换1元</span>
      <div>
        <p>
          <span>积分</span>
          <span>6666</span>
        </p>
        <img src="../../assets/img/user/to2.png" alt="">
        <p>
          <span>可用余额</span>
          <span>6666</span>
        </p>
      </div>
    </div>
    <div class="iptBox">
      <p>请输入需要兑换的积分</p>
      <input type="tel" placeholder="0">
      <p class="more">可用积分：<span>8857</span></p>
    </div>
    <group>
      <cell title="积分兑换记录" is-link>
      </cell>
    </group>
    <div class="btn">立即兑换</div>
  </div>
</template>
<script>
import { XHeader, Cell, Group } from 'vux';

export default {
  name: 'Integral',
  components: {
    XHeader,
    Cell,
    Group
  }
};
</script>
<style lang="less" scoped>
@import url('./Integral.less');
</style>

