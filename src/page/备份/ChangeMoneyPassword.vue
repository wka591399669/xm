<template>
  <div id="ChangeMoneyPassword">
    <XHeader :left-options="{backText: ''}">修改资金密码密码</XHeader>
    <group labelWidth="3.667rem">
      <x-input title='旧的资金密码' placeholder="请输入旧的资金密码"></x-input>
      <x-input title='新的资金密码' placeholder="请输入新的资金密码"></x-input>
      <x-input title='再次输入新密码' placeholder="再次输入密码"></x-input>
    </group>
    <div class="big-btn">
      <x-button v-if="!loading" type="primary" @click.native="loading=!loading">修改密码</x-button>
      <x-button v-else type="primary" show-loading @click.native="loading=!loading">修改密码</x-button>
    </div>
  </div>
</template>
<script>
import { XHeader, XInput, Group, XButton } from 'vux'
export default {
  name: 'ChangeMoneyPassword',
  components: {
    XHeader, XInput, Group, XButton
  },
  data() {
    return {
      loading: false
    }
  }
}
</script>
<style lang="less" scoped>

</style>

