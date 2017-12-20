<template>
  <div id="RunChart">
    <XHeader :left-options="{backText: ''}">走势图</XHeader>
    <ul class="runTitle">
      <li>
        <span :class="{'select':selectNum==i}" v-if="i<5" @click="selectClick(i)" v-for="(it,i) in selectGameTypeResult" :key="i">{{it.name}}</span> 
      </li>
      <li v-if="selectGameTypeResult.length>5">
        <span :class="{'select':selectNum==i}" v-if="i>4" @click="selectClick(i)" v-for="(it,i) in selectGameTypeResult" :key="i">{{it.name}}</span> 
      </li>
    </ul> 
    <ul class="runTable" v-if="runDataList.length">
      <li>
        <span class="issueClass">期数</span>
        <span v-for="(it,i) in selectGameTypeResultCode" :key="i"> 
          {{it}} 
          </span>
      </li>
      <li v-for="(it,i) in runDataList" :key="i">
        <span class="issueClass">{{it.issueId}}</span>
        <span v-for="(is,x) in it.lostInfo[selectNum]" :key="x" :id="`T_${i}_${parseInt(selectGameTypeResultCode[x],10)}`" :class="{'resultCode':is==0}" > <a>{{is==0?it.issueResult[selectNum]:is}}</a></span>
      </li>
      <li>
        <span>平均遗漏</span>
        <span>{{runDataMap.averageLost[selectNum][1]}}</span>
      </li>
      <li>
        <span>最大遗漏</span>
        <span>{{runDataMap.maxLost[selectNum][1]}}</span>
      </li>
    </ul>
    <div id="canvasdiv" >
    </div>
  </div>
</template>

<script>
import { XHeader} from 'vux';
import $ from 'jquery';
export default {
  name:"RunChart",
  components: {
    XHeader
  },
  data () {
    return {
      betList:{
        ssc: ['CQSSC', 'ZKSSC', 'ZK1FC', 'ZKHGC', 'ZK3FC','PL3'], 
        PK10: ['PK10'], 
        ks: ['JSK3', 'SHK3']
      },
      countSize:30,
      selectSSC:[{"name":"万","value":"1"},{"name":"千","value":"2"},{"name":"百","value":"3"},{"name":"十","value":"4"},{"name":"个","value":"5"}],
      selectSSCResule:["0","1","2","3","4","5","6","7","8","9"],
      selectPK10:[{"name":"一位","value":""},{"name":'两位',"value":""},{"name":"三位","value":""},{"name":"四位","value":""},{"name":"五位","value":""},{"name":"六位","value":""},{"name":"七位","value":""},{"name":"八位","value":""},{"name":"九位","value":""},{"name":"十位","value":""}],
      selectPK10Resule:["01","02","03","04","05","06","07","08","09","10"],
      selectKS:[{"name":"百","value":""},{"name":"十","value":""},{"name":"个","value":""}],
      selectKSResule:["1","2","3","4","5","6"],

      select11S5:[{"name":"第一位","value":""},{"name":"第二位","value":""},{"name":"第三位","value":""},{"name":"第四位","value":""},{"name":"第五位","value":""}],
      runDataList:[],
      runDataMap:{},
      selectNum:0,
      context:{},
      canvasHtml:''
    }
  },
  created () {
    this.getRunData();
  },
  computed: {
    selectGameTypeResult() {
      if(',CQSSC,ZKSSC,ZK1FC,ZKHGC,ZK3FC,PL3,'.indexOf(','+this.$route.params.gameType+',')>=0){ 
        return this.selectSSC;
      }else if(',PK10,'.indexOf(','+this.$route.params.gameType+',')>=0){
        return this.selectPK10;
      }else if(',JSK3,SHK3,'.indexOf(','+this.$route.params.gameType+',')>=0){
        return this.selectKS;
      }
    },
    selectGameTypeResultCode() {
      if(',CQSSC,ZKSSC,ZK1FC,ZKHGC,ZK3FC,PL3,'.indexOf(','+this.$route.params.gameType+',')>=0){ 
        return this.selectSSCResule;
      }else if(',PK10,'.indexOf(','+this.$route.params.gameType+',')>=0){
        return this.selectPK10Resule;
      }else if(',JSK3,SHK3,'.indexOf(','+this.$route.params.gameType+',')>=0){
        return this.selectKSResule;
      }
    }
  },
  methods: {
    //获取走势图信息
     async getRunData() {
      let res = await this.$http('/queryGameLostForGameType', {
        body: {
          countSize: this.countSize,
          gameType: this.$route.params.gameType,
          issueId: this.$route.params.issueId
        }
      });
      this.runDataList = res.returnList; 
      console.log(this.runDataList);
      this.runDataMap = res.returnMap;  
      setTimeout(this.lineNum,1000); 
    },
    //title
    selectClick(i){
      this.selectNum = i;
      this.lineNum();
    },
    //cavas
    lineNum(){
      if(this.runDataList.length){  
        var ids = "";
        for (var i = 0; i <this.runDataList.length; i++) {
          ids+= "T_" + i + "_" + this.runDataList[i].issueResult[this.selectNum] + ",";
        }
        ids = ids.substring(0, ids.length - 1);
        
        this.CreateLine(ids, 20, "red", "canvasdiv", "red");
      }
    },
    CreateLine(ids, w, c, div, bg) {
      var list = ids.split(","); 
        $("#" + div).html("");
        for (var j = list.length - 1; j > 0; j--) { 
          var tid = $("#" + list[j]);
            var fid = $("#" + list[j - 1]);
            var f_width = fid.outerWidth();
            var f_height = fid.outerHeight();
            var f_offset = fid.offset(); 
            var f_top = f_offset.top;
            var f_left = f_offset.left;
            var t_offset = tid.offset();
            var t_top = t_offset.top;
            var t_left = t_offset.left;
            var cvs_left = Math.min(f_left, t_left);
            var cvs_top = Math.min(f_top, t_top);  
            var cvs = document.createElement("canvas");
            cvs.width = Math.abs(f_left - t_left) < w ? w : Math.abs(f_left - t_left);
            cvs.height = Math.abs(f_top - t_top);
            cvs.style.top = cvs_top + parseInt(f_height / 2) + "px";
            cvs.style.left = cvs_left + parseInt(f_width / 2) + "px";
            cvs.style.position = "absolute";
            var cxt = cvs.getContext("2d");
            cxt.save();
            cxt.strokeStyle = c;
            cxt.lineWidth = 1;
            cxt.lineJoin = "round";
            cxt.beginPath();
            cxt.moveTo(f_left - cvs_left, f_top - cvs_top);
            cxt.lineTo(t_left - cvs_left, t_top - cvs_top);
            cxt.closePath();
            cxt.stroke();
            cxt.restore();  
            $("#" + div).append(cvs);
          }
           
        }
  }

}


</script>

<style lang="less">
@import url("./RunChart.less");
</style>

