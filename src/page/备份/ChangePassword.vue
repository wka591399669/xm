<template>
  <div id="ChangePassword">
    <XHeader :left-options="{backText: ''}">修改密码</XHeader>
    <group labelWidth="3.667rem">
      <x-input title='旧的密码' placeholder="请输入旧的密码"></x-input>
      <x-input title='新的密码' placeholder="请输入新密码"></x-input>
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
  name: 'ChangePassword',
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

