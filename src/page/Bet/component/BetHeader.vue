<template>
  <div id="BetHeader">
    <div v-if="gameType != 'HKLHC'">
      <XHeader :left-options="{backText: ''}">
      <div @click="showPopup">
        {{method[curMethod].fname}}-{{method[curMethod].name}}
        <img src="../../../assets/img/lottery/down.png" alt="">
      </div>
      <div slot="right">
        <img src="../../../assets/img/lottery/record.png" @click="$router.push('/betRecord')">
        <img src="../../../assets/img/lottery/more.png" @click="showMoreHelp">
      </div>
    </XHeader>
    <popup v-model="show" class="menu" position="top">
      <ul>
        <li v-for="(it,i) in method" :key="i" @click="check(it.typeDetId)">
          {{it.fname}}-{{it.name}}
        </li>
      </ul>
    </popup>
    <popup v-model="moreHelpShow" class="moreHelp" position="top" >
      <ul>
        <a :href="serviceLink">
          <li>
              联系客服
          </li>
        </a>
        <a :href="gameTypeDecLink">
          <li>
            玩法介绍
          </li>
        </a>
      </ul>
    </popup>
    </div>
    <div v-else class="lhc">
      <XHeader :left-options="{backText: ''}">
        <div @click="showPopup" v-if="curMethod!='default'">
          {{method[curMethod].proTypeName}}
          <img src="../../../assets/img/lottery/down.png" alt="">
        </div>
        <div slot="right">
          <img src="../../../assets/img/lottery/record.png" @click="$router.push('/betRecord')">
          <img src="../../../assets/img/lottery/more.png" @click="showMoreHelp">
        </div>
      </XHeader>
      <popup v-model="show" class="menu" position="top" v-if="first&&method[first]">
        <ul>
          <li :class="{'active':method[first].proTypeName==it.proTypeName}" v-for="(it,i) in method" :key="i" @click="checkFirst(it)">
            {{it.proTypeName}}
          </li>
        </ul>
        <ul>
          <li :class="{'active':curSecond==it.proTypeName}" v-for="(it,i) in method[first].childProTypeList" :key="i" @click="checkSecond(it)">
            {{it.proTypeName}}
          </li>
        </ul>
      </popup>
      <popup v-model="moreHelpShow" class="moreHelp" position="top" >
      <ul>
        <a :href="serviceLink">
          <li>
              联系客服
          </li>
        </a>
        <a :href="gameTypeDecLink">
          <li>
            玩法介绍
          </li>
        </a>
      </ul>
    </popup>
    </div>
    
  </div>
  
</template>
<script>
import { XHeader, Popup } from 'vux';

export default {
  name: 'BetHeader',
  components: {
    XHeader,
    Popup
  },
  props: ['method', 'curMethod', 'curSecond'],
  computed: {
    gameType() {
      return this.$store.state.bet.gameType;
    }
  },
  async created() { 
    await this.service(); 
  },
  data() {
    return {
      show: false,
      first: 'default',
      serviceLink:'',
      gameTypeDecLink:SETTING.apiHost + '/gameType/' + this.$store.state.bet.gameType+'.html',
      moreHelpShow: false
    };
  },
  methods: {
    showPopup() {
      if (this.curMethod != 'defalut') {
        this.first = this.curMethod;
      }
      this.show = !this.show;
    },
    check(typeDetId) {
      this.$emit('check', typeDetId);
      this.show = false;
    },
    // 选择一级菜单
    checkFirst(it) {
      this.first = it.proType;
    },
    // 选择二级菜单
    checkSecond(it) {
      this.$emit('checkSecond', this.method[this.first], it);
      this.show = false;
    },
    //点击显示更多按钮
    showMoreHelp() {
      console.log(1);
      this.moreHelpShow = !this.moreHelpShow;
    },
     // 获取客服地址
    async service() {
      let res = await this.$http('/queryCustomerServiceInfo');
      console.log(res.returnMap.customerServiceUrl);
      this.serviceLink = res.returnMap.customerServiceUrl;
    }
  },
  watch: {
    curMethod() {
      if (this.curMethod != 'defalut') {
        this.first = this.curMethod;
      }
    }
  }
};
</script>
<style lang="less">
@import url('./BetHeader.less');
</style>


