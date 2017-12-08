<template>
  <div id="TeamReg">
    <XHeader :left-options="{backText: ''}"> 
     <div @click="show=!show">
         {{topMenu[index].memuName}}
      </div> 
    </XHeader>
    <div class="regUrlClass">
       推广地址
       <textarea v-model="regInfo.url"></textarea>
    </div>
    <div class="regRakeOffClass">

      <div>设置注册返点(0%~0.9%)</div>
      <div>
        <div :class="{'select':rakeOff=='0.0'}"  @click="rakeOff='0.0'" >0.0</div>
        <div :class="{'select':rakeOff=='0.5'}"  @click="rakeOff='0.5'" >0.5</div>
        <div :class="{'select':rakeOff=='0.9'}"  @click="rakeOff='0.9'" >0.9</div>
      </div> 
     
    </div>
    <div class="saveClass">
       保存
    </div>
    
    <div class="main">
       <div>温馨提示</div>
       <div>1、为保证账户自己安全，用户每天允许提现三次</div>
       <div>2、为了防止恶意提现，洗钱等不法行为，信用卡每笔充值资金100%需用与购彩，储蓄卡每笔充值资金50%需用于购彩。</div>
       
    </div>
    
    <popup v-model="show" class="menu" position="top" >
      <ul> 
        <router-link :to="`${it.menuUrl}`" tag="li" v-for="(it,i) in topMenu" :key="i">
          <li>{{topMenu[i].memuName}}</li>
        </router-link> 
      </ul> 
    </popup>
    
  </div>
</template>
<script>
import { Popup, Range, XHeader} from 'vux'; 
export default {
  name: 'TeamReg',
  components: {
    Popup,
    Range,
    XHeader
  },
  data() {
    return {
     topMenu:[{'memuName':'团队信息',menuUrl:'/teamInfo'},{'memuName':'团队投注',menuUrl:'/teamOrder'},
      {'memuName':'团队帐变',menuUrl:'/teamCashFlow'},{'memuName':'团队盈亏',menuUrl:'/teamSurplus'},
      {'memuName':'用户管理',menuUrl:'/teamUser'},{'memuName':'注册用户',menuUrl:'/teamReg'}],
      index:5,
      show:false,
      regInfo:{
        url:'',
        regRakeOff:''
      },
      rakeOff:'0.0' 
    };
  },
  async created() {
    this.$vux.loading.show({
      text: 'Loading'
    });
    this.getTeamRegInfo();
    this.$vux.loading.hide();
  },
  methods: {
    async getTeamRegInfo() {
     
      let res = await this.$http('/queryPromotionUrl'); 
      this.regInfo = Object.assign(this.regInfo, res.returnMap);
    
    } ,
    async updateRegInfo() {
     
      let res = await this.$http('/updateUserRakeOff', {
        body: {
          rakeOff: this.rakeOff
        }
      });  
      if(res.returnCode=='0000'){
        this.$vux.toast.show({
          text: `修改返点成功`,
          type: 'success'
        }); 
      }else{
        this.$vux.toast.show({
          text: res.returnMessage,
          type: 'warn'
        });
      } 
    } 
  }
};
</script>
<style lang="less">
@import url('./TeamReg.less');
</style>
