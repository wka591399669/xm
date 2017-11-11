<template>
  <div id="Safe">
    <XHeader :left-options="{backText: ''}">安全中心</XHeader>
    <div class="head">
      <img src="../../assets/img/user/safe2.png" @click="level=level>=3?1:++level">
      <p>安全等级</p>
      <div class="safeLevel" v-if="level==1">
        <span class="red"></span>
        <span></span>
        <span></span>
        <em></em>
      </div>
      <div class="safeLevel" v-if="level==2">
        <span class="yellow"></span>
        <span class="yellow"></span>
        <span></span>
        <em></em>
      </div>
      <div class="safeLevel" v-if="level==3">
        <span class="green"></span>
        <span class="green"></span>
        <span class="green"></span>
      </div>
    </div>

    <group>
      <cell title="实名认证" is-link value="未认证">
        <img slot="icon" src="../../assets/img/user/user.png">
      </cell>
      <cell title="修改登录密码" is-link link="/changeMoneyPassword">
        <img slot="icon" src="../../assets/img/user/pw.png">
      </cell>
      <cell title="修改资金密码" is-link link="/changePassword">
        <img slot="icon" src="../../assets/img/user/mpw.png">
      </cell>
    </group>

    <group>
      <cell title="手机" is-link value="修改">
        <img slot="icon" src="../../assets/img/user/phone.png">
      </cell>
      <cell title="邮箱" is-link value="开启">
        <img slot="icon" src="../../assets/img/user/email.png">
      </cell>
      <cell title="安全问题" is-link value="未认证">
        <img slot="icon" src="../../assets/img/user/safe3.png">
      </cell>
    </group>
  </div>
</template>
<script>
import { XHeader, Group, Cell } from 'vux'

export default {
  name: 'Safe',
  components: {
    XHeader, Group, Cell
  },
  data() {
    return {
      level: 1
    }
  }
}
</script>
<style lang="less" scoped>
#Safe {
  .head {
    width: 100%;
    height: 4.373rem;
    background-color: #7238ba;
    display: flex;
    align-items: center;
    justify-content: center;
    &>img {
      width: 1.36rem;
      margin-right: 0.547rem;
    }
    &>p {
      font-size: 0.427rem;
      color: #fff;
      margin-right: 0.36rem;
    }
    .safeLevel {
      span {
        display: inline-block;
        width: 0.667rem;
        height: 0.1333rem;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 0.067rem;
        &.red {
          background-color: rgba(255, 17, 17, 1);
        }
        &.yellow {
          background-color: rgba(255, 202, 17, 1);
        }
        &.green {
          background-color: rgba(99, 255, 125, 1);
        }
      }
      em {
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        background-image: url('../../assets/img/user/warn.png');
        background-size: 100%;
        vertical-align: middle;
        margin-left: 0.1333rem;
      }
    }
  }
}
</style>


