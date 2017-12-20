<template>
  <div id="RunChart28">
    <XHeader :left-options="{backText: ''}">走势图</XHeader> 
    <ul class="runTable" v-if="runDataList.length">
      <li>
        <span class="issueClass">期数</span>
        <span v-for="(it,i) in select28" :key="i"> 
          {{it}} 
          </span>
      </li>
      <li v-for="(it,i) in runDataList" :key="i">
        <span class="issueClass">{{it.issueId}}</span>
        <span class="resultCodeClass" >{{parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5))}}</span> 
        <span class="resultCodeDXClass" v-if="(parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5)))>=14">大</span>
        <span v-else></span>
        <span class="resultCodeDXClass" v-if="(parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5)))<=13">小</span>
        <span v-else></span>
        <span class="resultCodeQTClass" v-if="(parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5)))%2==1">单</span>
        <span v-else></span>
        <span class="resultCodeQTClass" v-if="(parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5)))%2==0">双</span>
        <span v-else></span>
        <span class="resultCodeQTClass" v-if="(parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5)))>=14&&
          (parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5)))%2==1">大单</span>
        <span v-else></span>
        <span class="resultCodeQTClass" v-if="(parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5)))<=13&&
          (parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5)))%2==1">小单</span>
        <span v-else></span> 
        <span class="resultCodeQTClass" v-if="(parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5)))>=14&&
          (parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5)))%2==0">大双</span>
        <span v-else></span>
        <span class="resultCodeQTClass" v-if="(parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5)))<=13&&
          (parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5)))%2==0">小双</span>
        <span v-else></span>
 
      </li> 
    </ul> 
    <Pages @change="getRunData" :startRow="startRow" :pageSize="pageSize" :totalCount="totalCount"></Pages>
  </div>
</template>

<script>
import { XHeader} from 'vux'; 
import Pages from '../../components/Pages/Pages';
export default {
  name:"RunChart",
  components: {
    XHeader,
    Pages
  },
  data () {
    return { 
      select28:["值","大","小","单","双","大单","小单","大双","小双"],
      runDataList:[], 
      totalCount: 0, // 总条数
      pageSize: 20, // 查询条数
      startRow: 0 // 起始条数
    }
  },
  created () {
    this.getRunData(0);
  },
  methods: {
    //获取走势图信息
     async getRunData(v) {
      if (v != undefined) {
        this.startRow = v;
      }
      let res = await this.$http('/queryGameTypeResultByGameType', {
        body: { 
          startRow: this.startRow,
          pageSize: this.pageSize,
          gameType: this.$route.params.gameType
        }
      });
      this.runDataList = res.returnList;   
      this.totalCount = res.totalCount; 
    }
  }

}


</script>

<style lang="less">
@import url("./RunChart28.less");
</style>

