<template>
  <div id="Password">
    <XHeader :left-options="{backText: ''}">修改登录密码</XHeader>
    <Group labelWidth="1.55rem">
      <x-input type="password" v-model="old" title="旧的密码" placeholder="请输入旧的密码"></x-input>
      <x-input type="password" v-model="password" title="新的密码" placeholder="请输入新的密码"></x-input>
      <x-input type="password" v-model="repassword" title="确认密码" placeholder="再次输入新的密码"></x-input>
    </Group>
    <div class="btn">
      <x-button @click.native="sub">确认修改</x-button>
    </div>
  </div>
</template>
<script>
import { XHeader, Group, XInput, XButton } from 'vux';
export default {
  name: 'Password',
  components: {
    XHeader,
    Group,
    XInput,
    XButton
  },
  data() {
    return {
      old: '',
      password: '',
      repassword: ''
    };
  },
  methods: {
    async sub() {
      if (!this.old || !this.password || !this.repassword) {
        this.$vux.toast.show({
          type: 'text',
          text: '请正确填写信息',
          time: 1500
        });
        return;
      }
      if (this.password !== this.repassword) {
        this.$vux.toast.show({
          type: 'text',
          text: '两次输入的密码不一致',
          time: 1500
        });
        return;
      }
      let res = await this.$http('/updatePassword', {
        body: {
          oldPassword: this.old,
          newPassword: this.password
        }
      });
      if (res.returnCode !== '0000') {
        this.$vux.toast.show({
          type: 'warn',
          text: res.returnMessage,
          time: 1500
        });
      } else {
        this.$vux.toast.show({
          type: 'success',
          text: '修改成功',
          time: 1500
        });
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./Password.less');
</style>
