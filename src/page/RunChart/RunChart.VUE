<template>
  <div id="RunChart">
    <XHeader :left-options="{backText: ''}">走势图</XHeader>
    <ul class="runTitle">
      <li>
        <span :class="{'select':selectNum==i}" @click="selectClick(i)" v-for="(it,i) in selectSSC" :key="i">{{it.name}}</span>
      </li>
    </ul>
    <ul class="runTable">
      <li>
        <span>期数</span>
        <span v-for="(it,i) in runDataList[0].issueResult" :key="i">{{i}}</span>
      </li>
      <li v-for="(it,i) in runDataList" :key="i">
        <span>{{it.issueId}}</span>
        <span v-for="(is,i) in it.issueResult" :key="i">{{is}}</span>
      </li>
      <li>
        <span>平均遗漏</span>
        <span>{{runDataMap.averageLost[0][1]}}</span>
      </li>
      <li>
        <span>最大遗漏</span>
        <span>{{runDataMap.maxLost[0][1]}}</span>
      </li>
    </ul>
    <canvas id="canvas">
    </canvas>
  </div>
</template>

<script>
import { XHeader} from 'vux';
export default {
  name:"RunChart",
  components: {
    XHeader
  },
  data () {
    return {
      countSize:10,
      selectSSC:[{"name":"万","value":""},{"name":"千","value":""},{"name":"百","value":""},{"name":"十","value":""},{"name":"个","value":""}],
      selectPK10:[{"name":"一位","value":""},{"name":'两位',"value":""},{"name":"三位","value":""},{"name":"四位","value":""},{"name":"五位","value":""},{"name":"六位","value":""},{"name":"七位","value":""},{"name":"八位","value":""},{"name":"九位","value":""},{"name":"十位","value":""}],
      selectKS:[{"name":"百","value":""},{"name":"十","value":""},{"name":"个","value":""}],
      select11S5:[{"name":"第一位","value":""},{"name":"第二位","value":""},{"name":"第三位","value":""},{"name":"第四位","value":""},{"name":"第五位","value":""}],
      runDataList:[],
      runDataMap:{},
      selectNum:0,
      context:{}
    }
  },
  created () {
    this.getRunData();
    this.lineNum();
  },
  mounted() {
    const canvas = document.querySelector('#canvas');
    this.context = canvas.getContext('2d');
  },
  methods: {
    //获取走势图信息
     async getRunData() {
      let res = await this.$http('/queryGameLostForGameType', {
        body: {
          countSize: this.countSize,
          gameType: "CQSSC",
          issueId: 20171009061
        }
      });
      this.runDataList = res.returnList;
      this.runDataMap = res.returnMap;
      console.dir(runDataMap);
    },
    //title
    selectClick(i){
      this.selectNum = i;
    },
    //cavas
    lineNum(){
      var ids = "";
        for (var i = 1; i <11; i++) {
          ids+= "T" + i + "_" + Math.floor(1 + Math.random() * (11 - 1)) + ",";
        }
        ids = ids.substring(0, ids.length - 1);
        CreateLine(ids, 20, "#ff6600", "canvas", "#d5d5d5");
    },
    CreateLine(ids, w, c, div, bg) {
      var list = ids.split(",");
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
            tid.css("background", bg).css("color", "red");
            fid.css("background", bg).css("color", "red");
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

