<template>
  <div id="BetRuleDes">
    <XHeader :left-options="{backText: ''}">回水规则</XHeader>
    <NotFound v-if="!list.length" noHeader='1'></NotFound>
    <div class="ruleList" v-else>
      <div v-for="(it,i) in list" :key="i">
        <div class="title">
          <p>
            <span v-if="it.roomRank==1">回水厅回水比例说明：</span> 
            <span v-else-if="it.roomRank==2">保本厅回水比例说明：</span> 
            <span v-else-if="it.roomRank==3">高赔率厅回水比例说明：</span>     
          </p>
        </div>
        <div class="ruleDes">
          <table>
            <tr>
              <th>亏损(当天)</th>
              <th>回水比例</th>
            </tr>
            <tr v-for="(desList,j) in it.rakeOffList" :key="j">
             <td>{{desList.minAmount}} ~ {{desList.maxAmount}} </td>
              <td>{{desList.proportion}}%</td>
            </tr>  
          </table> 
        </div>
      </div>
      <div>
          <p>
            <span class="backDes">回水条件：</span>
          </p>
          <p v-for="(des,k) in desInfo.rakeOffText" :key="k" >
            <span>{{k+1}}、{{desInfo.rakeOffText[k]}}</span>
          </p>
        </div>
    </div>
   
  </div>
</template>
<script>
import { XHeader } from 'vux';
import NotFound from '../NotFound/NotFound';
export default {
  name: 'BetRuleDes',
  components: {
    XHeader ,
    NotFound
  },
  computed: {},
   async created() {
     await this.getData();
  //   await this.getUserInfo();
   },
  data() {
    return {
      userInfo: {},
      desInfo: {},
      state: ['下单成功', '已中奖', '未中奖', '已取消'],
      list: [] // info
    };
  },
  methods: {
    // async getUserInfo() {
    //   let res = await this.$http('/queryUserCommonInfo', {
    //     body: {
    //       userId: window.localStorage.getItem('userId'),
    //       token: window.localStorage.getItem('token')
    //     }
    //   });
    //   this.userInfo = Object.assign({}, res.returnMap);
    // },
     async getData(v) {
     this.$vux.loading.show({
        text: 'Loading'
      });
      if (v != undefined) {
        this.startRow = v;
      }
      let res = await this.$http('/queryRoomRakeOffList', {
        
      });
      console.log(res);
      this.list = res.returnList;
      this.desInfo=res.returnMap;
      this.$vux.loading.hide();
     }
  }
};
</script>
<style lang="less">
@import url('./BetRuleDes.less');
</style>
