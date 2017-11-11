<template>
  <div id="Info">
    <XHeader :left-options="{backText: ''}">个人信息</XHeader>
    <Group labelWidth="2.3rem">
      <x-input v-model="username" disabled title="用户名"></x-input>
      <x-input v-model="niname" title="昵称" placeholder="请输入昵称"></x-input>
      <x-input v-model="realname" title="真实姓名" placeholder="请输入真实姓名"></x-input>
      <x-input v-model="idcard" title="身份证号" placeholder="请输入身份证号"></x-input>
      <x-input v-model="phone" title="手机号" placeholder="请输入手机号"></x-input>
      <x-input v-model="qq" title="QQ号" placeholder="请输入QQ号"></x-input>
    </Group>
    <div class="btn">
      <x-button @click.native="sub">确认修改</x-button>
    </div>
  </div>
</template>
<script>
import { XHeader, Group, XInput, XButton } from 'vux';

export default {
  name: 'Info',
  components: {
    XHeader,
    Group,
    XInput,
    XButton
  },
  data() {
    return {
      username: '',
      niname: '',
      realname: '',
      idcard: '',
      phone: '',
      qq: ''
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      let res = await this.$http('/queryUserCommonInfo', {
        body: {
          userId: window.localStorage.getItem('userId'),
          token: window.localStorage.getItem('token')
        }
      });
      this.username = res.returnMap.userId;
      this.niname = res.returnMap.userName;
      this.realname = res.returnMap.realName;
      this.idcard = res.returnMap.Id;
      this.phone = res.returnMap.phone;
      this.qq = res.returnMap.QQ;
    },
    async sub() {
      if (
        !this.niname ||
        !this.realname ||
        !this.idcard ||
        !this.phone ||
        !this.qq
      ) {
        this.$vux.toast.show({
          type: 'text',
          text: '请填写完整的信息',
          time: 1500
        });
        return;
      }
      let res = await this.$http('/updateUserInfoForFront', {
        body: {
          updateUserName: this.niname,
          identification: this.idcard,
          phoneNumber: this.phone,
          qq: this.qq,
          realName: this.realname
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
<style lang="less">
@import url('./Info.less');
</style>
