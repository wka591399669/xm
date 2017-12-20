<template>
  <div id="TrendChart">
    <XHeader :left-options="{backText: ''}">走势图</XHeader>
    <NotFound v-if="!list.length" noHeader='1'></NotFound>
    <div class="trendChartList" v-else>
      <div class="title"> 
          <span class="selectSpan">万</span> 
          <span>千</span> 
          <span>百</span>   
          <span>十</span>   
          <span>个</span>    
      </div>

      <div v-for="(it,i) in list" :key="i">
        
        <div class="ruleDes">
          <table>
            <tr>
              <th>期数</th>
              <th>0</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9</th> 
            </tr>
            <tr v-for="(desList,j) in it.lostInfo" :key="j">
             <td>{{desList[0][0]}}</td>
             <td>{{desList[0][0]}}</td>
             <td>{{desList[0][0]}}</td>
             <td>{{desList[0][0]}}</td>
             <td>{{desList[0][0]}}</td>
             <td>{{desList[0][0]}}</td>
             <td>{{desList[0][0]}}</td>
             <td>{{desList[0][0]}}</td>
             <td>{{desList[0][0]}}</td>
             <td>{{desList[0][0]}}</td>
            </tr>  
          </table> 
        </div>
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
     async getData() {
      this.$vux.loading.show({
          text: 'Loading'
        });
         
        let res = await this.$http('/queryGameLostForGameType', {
          body: {
          countSize: 30,
          gameType: 'CQSSC',
          issueId:'20171219061'
        }
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
@import url('./TrendChart.less');
</style>
