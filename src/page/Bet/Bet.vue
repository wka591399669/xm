<template>
  <div id="Bet">
    <BetHeader :curMethod="curMethod" :method="playMethods" @check="headerCheck"></BetHeader>
    <div class="pageTop">
      <p v-if="isStop.state">已停盘</p>
      <p v-else>
        距离<em>{{this.saleInfo.issueID}}</em>期开奖还有
        <em>
          {{showTime[0]==='00'?'':showTime[0]+'天'}}{{showTime[1]==='00'?'':showTime[1]+'分'}}{{showTime[2]+'秒'}}
        </em>
      </p>
      <p>
        {{this.his[0].issueId}}期开奖结果：
        <span v-for="(it,i) in this.his[0].resultStr.split(',')" :key="i">{{it}}</span>
      </p>
      <div class="his">
        <span class="title" @click="showHis = !showHis">
          <p>
            <img src="../../assets/img/lottery/shake.png" alt="">
            摇一摇
          </p>
          <p>
            近期开奖
            <img src="../../assets/img/down.png" :class="{'rotate':showHis}">
          </p>
        </span>
        <ul v-if="showHis">
          <li v-for="(it,i) in his" :key="i">
            <span>{{it.issueId}}</span>
            <span>
              <em v-for="(is,j) in it.resultStr.split(',')" :key="j">{{is}}</em>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="main">
      <p class="tip" v-if="playMethods">
        {{playMethods[curMethod].des}}
      </p>
      <div class="balls">
        <div class="row" v-for="(it,i) in playMethods[curMethod].ballTypeName" :key="i">
          <div class="ballstitle">
            <p>{{it}}</p>
          </div>
          <div class="checkArea">
            <!-- <div class="quick" v-if="playMethods[curMethod].quick">
              <span v-for="(is,j) in playMethods[curMethod].quick" :key="j">{{is}}</span>
            </div> -->
            <!-- 双色球 -->
            <ul class="ssq" v-if="playMethods[curMethod].typeDetId == 'PTSSQ'">
              <li class="ssqred" v-for="(is,j) in playMethods[curMethod].ballRed" v-if="i==0" :key="j">
                <span 
                :class="{'check':tempBall.ball.indexOf(`${i},${is}`) >= 0}"
                @click="handleBallClick(`${i},${is}`)"
                >{{is}}</span>
              </li>
              <li class="ssqblue" v-for="(is,j) in playMethods[curMethod].ballBlue" v-if="i==1" :key="j">
                <span 
                :class="{'check':tempBall.ball.indexOf(`${i},${is}`) >= 0}"
                @click="handleBallClick(`${i},${is}`)"
                >{{is}}</span>
              </li>
            </ul>
            <!-- <ul v-if=""></ul> -->
            <!-- 其他球 -->
            <ul v-else>
              <p><span v-for="(qs,k) in playMethods[curMethod].quick" :key="k" @click="handleQuickClick(i,k)">{{qs}}</span></p>
              <li v-for="(is,j) in playMethods[curMethod].ball" :key="j">
                <span 
                :class="{'check':tempBall.ball.indexOf(`${i},${is}`) >= 0}"
                @click="handleBallClick(`${i},${is}`)"
                >{{is}}</span>
                <span>{{gameLost[i]?gameLost[i][j]:0}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="pageFooter">
      <div class="count">
        <p>{{stake}}注{{tempBall.planMoney * stake}}元</p>
        <!-- <p>余额：<span>0</span>元</p> -->
      </div>
      <div class="action"> 
        <div @click="handleAllPlan">
          <em v-if="planBall.length">{{planBall.length}}</em>
          <img src="../../assets/img/lottery/add.png" alt="">
          加入投注区
        </div>
        <span :class="{'disabel':!planBall.length}" @click="toPlanAdmin">下一步</span>
        <span @click="getRandom">机选</span>
      </div>
    </div>
    <!-- 方案设置 -->
    <popup class="addplan" v-model="showSet" hide-on-blur is-transparent>
      <div>
        <div class="title">注单设定</div>
        <p>
          <span>赔率：<em>{{Number(rateBean.rate)/2}}</em></span>
          <span>返利：<em>{{Number(rateBean.rake)}}%</em></span>
        </p>
        <range v-model="drag" @on-change="handleRateDrag"></range>
        <p>
          <span>单注金额：<input maxlength="6" v-model="tempBall.planMoney" class="numipt" type="tel">
          <div class="mbtns" :class="{'active':tempBall.moneyType==1}" @click="tempBall.moneyType=1">元</div>
          <div class="mbtns" :class="{'active':tempBall.moneyType==0.1}" @click="tempBall.moneyType=0.1">角</div>
          <div class="mbtns" :class="{'active':tempBall.moneyType==0.01}" @click="tempBall.moneyType=0.01">分</div>
        </span>
        </p>
        <p>
          <span>总额：<em>{{(tempBall.planMoney * stake * tempBall.moneyType).toFixed(3)}}</em>元</span>
          <span>注数：<em>{{stake}}</em>注</span>
        </p>
        <p>
          <span>若中奖，单注最高中：<em>{{maxWin.toFixed(3)}}</em>元</span>
        </p>
        <div class="footer">
          <span @click="showSet=false">取消</span>
          <span @click="addPlan">确定</span>
        </div>
      </div>
    </popup>
    <!-- 方案管理 -->
    <popup class="planPopup" v-model="planShow" height="100%">
      <XHeader @on-click-back="leavePlanAdmin" :left-options="{backText: '',preventGoBack:true}">
        投注
        <div slot="right">
          <span v-if="!isJoin" @click="joinShow=true">发起合买</span>
          <span v-else  @click="joinShow=true">已发起合买</span>
        </div>
      </XHeader>
      <div class="pageTop">
        <p v-if="isStop.state">已停盘</p>
        <p v-else>
          距离<em>{{this.saleInfo.issueID}}</em>期开奖还有
          <em>
            {{showTime[0]==='00'?'':showTime[0]+'天'}}{{showTime[1]==='00'?'':showTime[1]+'分'}}{{showTime[2]+'秒'}}
          </em>
        </p>
      </div>
      <div class="quick">
        <span @click="planShow=false"><img src="../../assets/img/lottery/hand.png">手选号码</span>
        <span @click="getRandomAndAddlPlan"><img src="../../assets/img/lottery/random.png">随机一注</span>
        <span @click="clearPlan('all')"><img src="../../assets/img/lottery/clear.png">清除列表</span>
      </div>
      <div class="list">
        <img src="../../assets/img/lottery/pumping.png" alt="">
        <ul>
          <li v-for="(it,i) in planBall" :key="i">
            <img @click="clearPlan(i)" class="close" src="../../assets/img/lottery/close.png" alt="">
            <div  @click="planShow=false">
              <p>{{showBall(it.ball)}}</p>
              <p>
                <span>
                  {{it.playMethod.fname}}-{{it.playMethod.name}}
                </span>
                <span>{{it.stake}}注</span>
                <span>{{it.planMoney}}元</span>
              </p>
            </div>
            <img @click="planShow=false" class="next" src="../../assets/img/next.png" alt="">
          </li>
        </ul>
      </div>
      <div class="show">
        <p>
          <span>合计：{{trackList.length>0?allTrackMoney:allMoney}}元</span>
          <span>{{allIssueCount}}期{{allStake}}注</span>
        </p>
        <div :class="{'disabel':trackList.length>0}"  @click="queryTrackList" >计划倍投</div>
        <div @click="toOrder">投注</div>
      </div>
    </popup>
    <!-- 合买管理 -->
    <popup class="joinPopup" v-model="joinShow" height="100%">
      <XHeader @on-click-back="leaveJoinAdmin" :left-options="{backText: '',preventGoBack:true}">
        发起合买
      </XHeader>
      <div class="joinMain">
        <div class="hd">
          方案金额：<span>{{trackList.length>0?allTrackMoney:allMoney}}</span>元
        </div>
        <div class="joiniptbox">
          <p>合买总份数</p>
          <input type="number" v-model="joinData.totalNum">
          <p>我要认购</p>
          <input type="number" v-model="joinData.buyNum" @input="setJoinBuyNum">
          <p>保底份数</p>
          <input type="number" v-model="joinData.guaranteeNum" @input="setJoinguaranteeNum">
          <p>合买方式</p>
          <div>
            <span :class="{'active':joinData.openLevel==0}" @click="joinData.openLevel=0">完全</span>
            <span :class="{'active':joinData.openLevel==1}" @click="joinData.openLevel=1">截至</span>
            <span :class="{'active':joinData.openLevel==2}" @click="joinData.openLevel=2">跟单</span>
            <span :class="{'active':joinData.openLevel==3}" @click="joinData.openLevel=3">保密</span>
          </div>
        </div>
        <div class="joinfoot">
          <p>合计：￥{{trackList.length>0?allTrackMoney:allMoney}}元</p>
          <p @click="leaveJoinAdmin">提交</p>
        </div>
      </div>
    </popup>
    <!-- 追号管理 -->
    <popup class="trackPopup" v-model="trackShow" height="100%">
      <XHeader @on-click-back="leaveTrackAdmin" :left-options="{backText: '',preventGoBack:true}">
        追号
      </XHeader>
      <div> 
        <ul>
          <li>
            <span>期数</span>
            <span>倍数</span>
            <span>金额</span>
          </li>
          <li v-for="(trackIssue,a) in trackIssueIdList " :key="a" >
            <span><input type="checkbox" v-model="trackIssue.isCheck" @change="selectIssue" /> {{trackIssue.issueID}}</span>
            <span><input type="text" v-model="trackIssue.multiple" v-on:input = "selectIssue" />倍 </span>
            <span>{{trackIssue.issueMoney}}</span> 
          </li> 
        </ul>
      </div>
      <div class="show">
        <p>
          <span>共{{allTrackIssueCount}}期，共{{allTrackIssueMoney}}元</span>
          <span :class="{'disabel':isWinStop===0}" @click="changeIsWinStop" >中奖撤单</span>
        </p>
        <p>
          <a @click="submitTrackList">提交</a>
        </p>
      </div>
    </popup>
  </div>
</template>
<script>
import { Popup, Range, XHeader } from 'vux';
import BetHeader from './component/BetHeader';
import service from './Bet.service';
import playMethod from './playMethodDoc.json';
export default {
  name: 'Bet',
  components: {
    BetHeader,
    Popup,
    Range,
    XHeader
  },
  beforeDestroy() {
    this.$store.dispatch('bet/timeDownEnd');
  },
  data() {
    return {
      drag: 0, // 反水拖动距离
      operType: 1, //订单类型
      showHis: false, // 打开历史
      showSet: false, // 显示注单设置
      planShow: false, // 显示方案管理
      joinShow: false, // 显示合买管理
      isWinStop: 1, //是否中奖撤单 1是0否

      // 追号数据
      allIssueCount: 1, //总追号期数
      trackShow: false, //显示追号
      allTrackIssueCount: 0, //追号期数
      allTrackIssueMoney: 0, //追号总金额
      trackIssueIdList: [], //追号列表
      trackList: '', //追号列表

      totalAllAmount: 0, //投注总额
      isJoin: false, //是否发起合买
      // 合买数据
      joinData: {
        totalNum: 10, // 总份数
        openLevel: 0, // 公开等级
        amount: 0, // 单份金额
        isGuarantee: 0, // 是否保底
        guaranteeNum: 0, // 保底份数
        percentageRate: 0, // 提成
        buyNum: 10 // 购买份数
      }
    };
  },
  computed: {
    his() {
      return this.$store.state.bet.his;
    },
    playMethods() {
      return this.$store.state.bet.playMethods;
    },
    curMethod() {
      return this.$store.state.bet.curMethod;
    },
    rateBean() {
      return this.$store.state.bet.rateBean;
    },
    gameLost() {
      return this.$store.state.bet.gameLost;
    },
    saleInfo() {
      return this.$store.state.bet.saleInfo;
    },
    time() {
      return this.$store.state.bet.time;
    },
    isStop() {
      return this.$store.state.bet.isStop;
    },
    tempBall() {
      return this.$store.state.bet.tempBall;
    },
    planBall() {
      return this.$store.state.bet.planBall;
    },
    showTime() {
      return service.formatSeconds(this.time);
    },
    // 计算注数
    stake() {
      return this.curMethod !== 'default'
        ? service.countStake(
            this.curMethod,
            this.tempBall.ball,
            this.playMethods[this.curMethod].ballTypeName.length
          )
        : 0;
    },
    // 赔率显示
    rate() {
      return this.rateBean.rate / 2;
    },
    // 单住最高中奖金额
    maxWin() {
      return (
        this.rateBean.rate /
        2 *
        this.tempBall.planMoney *
        this.tempBall.moneyType
      );
    },
    // 统计投注区
    allMoney() {
      return this.planBall.reduce((a, b) => {
        return a + b.planMoney;
      }, 0);
    },
    allStake() {
      return this.planBall.reduce((a, b) => {
        return a + b.stake;
      }, 0);
    },
    // 计算追号金额
    allTrackMoney() {
      return this.trackIssueIdList.reduce(
        (a, b) => (b.isCheck ? a + this.allMoney * b.multiple : a),
        0
      );
    }
  },
  created() {
    this.$store.commit('bet/resetPlay');
    this.init();
  },
  methods: {
    /**
     * init
     */
    async init() {
      this.$vux.loading.show({
        text: 'Loading'
      });
      await this.$store.dispatch('bet/setBet', this.$route.params.gameType);
      await this.$store.dispatch('bet/init');

      this.$vux.loading.hide();
    },
    /**
     * play
     */
    // 切换玩法
    headerCheck(type) {
      this.$store.dispatch('bet/headerCheck', type);
    },

    // 点击全大小单双
    handleQuickClick(i, k) {
      this.$store.dispatch('bet/handleQuickClick', { i: i, k: k });
    },
    // 点击选号
    handleBallClick(v) {
      this.$store.dispatch('bet/handleBallClick', v);
    },
    // 拖动修改赔率
    handleRateDrag(v) {
      this.$store.dispatch('bet/handleRateDrag', v);
    },
    // 机选
    async getRandom() {
      await this.$store.dispatch('bet/getRandom');
    },
    // 机选并添加到投注区
    async getRandomAndAddlPlan() {
      await this.getRandom();
      await this.addPlan();
    },

    // 点击加入投注区
    handleAllPlan() {
      if (!this.stake) {
        this.$vux.toast.text('合法选球，否则无法购买', 'bottom');
      } else {
        this.showSet = true;
      }
    },
    // 添加到投注区
    addPlan() {
      let plan = {
        ball: this.tempBall.ball,
        playMethod: this.playMethods[this.curMethod],
        stake: this.stake,
        aloneMoney: this.tempBall.planMoney * this.tempBall.moneyType,
        planMoney:
          this.tempBall.planMoney * this.stake * this.tempBall.moneyType,
        rate: this.rateBean.rate,
        rake: this.rateBean.rake
      };
      this.$store.dispatch('bet/addPlan', plan);
      this.$store.dispatch('bet/clearPick');
      this.showSet = false;
    },
    // 清空选号区
    clearPick() {
      this.$store.dispatch('bet/clearPick');
    },
    // 删除投注区方案
    clearPlan(v) {
      this.$store.dispatch('bet/clearPlan', v);
    },
    // 进入方案管理
    toPlanAdmin() {
      if (this.stake) {
        this.showSet = true;
      } else {
        if (this.planBall.length) {
          document.body.style.overflow = 'hidden';
          this.planShow = true;
        } else {
          this.$vux.toast.text('合法选球，否则无法购买', 'bottom');
        }
      }
    },
    // 退出方案管理
    leavePlanAdmin() {
      document.body.style.overflow = 'auto';
      this.planShow = false;
    },
    // 退出合买管理
    leaveJoinAdmin() {
      this.isJoin = true;
      if (!this.joinData.totalNum) {
        this.joinData.totalNum = 0;
      }
      if (!this.joinData.guaranteeNum) {
        this.joinData.guaranteeNum = 0;
      }
      if (!this.joinData.buyNum) {
        this.joinData.buyNum = 0;
      }

      document.body.style.overflow = 'auto';
      this.joinShow = false;
    },
    // 退出追号列表
    leaveTrackAdmin() {
      document.body.style.overflow = 'auto';
      this.trackShow = false;
    },
    // 整理显示方案号码
    showBall(arr) {
      let res = [];
      arr.map(x => {
        if (!res[x.split(',')[0]]) {
          res[x.split(',')[0]] = [];
        }
        res[x.split(',')[0]].push(x.split(',')[1]);
      });
      return res.map(x => x.join('')).join(',');
    },
    // 下单
    async toOrder() {
      var totalAllAmount = this.allMoney;
      if (this.trackList.length > 0) {
        this.submitTrackList();
        totalAllAmount = this.allTrackMoney;
      }
      let req = {
        batchOrder: service.batchOrderFormat(
          this.planBall,
          this.$route.params.gameType
        ),
        operType: this.operType,
        issueId: this.saleInfo.issueID,
        gameType: this.$route.params.gameType,
        stake: 1,
        totalAmount: totalAllAmount,
        isWinStop: this.isWinStop,
        trackList: this.trackList,
        roomId: 0,
        rakeOff: 0
      };
      if (this.isJoin) {
        req = {
          ...req,
          ...this.joinData
        };
      }
      let res = await this.$http('/addOrder', {
        body: req
      });
      if (res.returnCode == '0000') {
        this.$vux.toast.show({
          text: '下单成功',
          type: 'success'
        });
        this.leavePlanAdmin();
        this.clearPlan('all');
        this.trackList = '';
        this.trackIssueIdList = [];
        this.$store.commit('bet/resetPlay');
      } else {
        this.$vux.toast.show({
          text: res.returnMessage,
          type: 'warn'
        });
      }
    },
    // 获取追号列表
    async queryTrackList() {
      if (this.trackList.length > 0) {
        return;
      }
      this.trackShow = true;
      let req = {
        gameType: this.$route.params.gameType,
        trackCount: 20
      };

      let res = await this.$http('/queryTrackIssueIdList', {
        body: req
      });
      if (res.returnCode == '0000') {
        for (var i = 0; i < res.returnList.length; i++) {
          this.trackIssueIdList.push({
            isCheck: false,
            issueID: res.returnList[i].issueID,
            multiple: 1,
            issueMoney: this.allMoney
          });
        }
      } else {
        this.$vux.toast.show({
          text: res.returnMessage,
          type: 'warn'
        });
      }
    },
    //修改是否中奖撤单
    changeIsWinStop() {
      this.isWinStop = this.isWinStop === 0 ? 1 : 0;
    },
    //更新追号期数
    selectIssue() {
      this.allTrackIssueCount = 0;
      this.allTrackIssueMoney = 0;
      for (var i = 0; i < this.trackIssueIdList.length; i++) {
        this.trackIssueIdList[i].issueMoney =
          this.allMoney * this.trackIssueIdList[i].multiple;
        if (this.trackIssueIdList[i].isCheck) {
          this.allTrackIssueCount++;
          this.allTrackIssueMoney =
            Number(this.allTrackIssueMoney) +
            Number(this.trackIssueIdList[i].issueMoney);
        }
      }
    },
    //生成追号列表
    submitTrackList() {
      var firstSub = '';
      this.trackList = [];
      for (var i = 0; i < this.trackIssueIdList.length; i++) {
        if (this.trackIssueIdList[i].isCheck) {
          this.trackList =
            this.trackList +
            firstSub +
            this.trackIssueIdList[i].issueID +
            ',' +
            this.trackIssueIdList[i].multiple;
          firstSub = ';';
        }
      }
      if (this.trackList.length <= 0) {
        this.$vux.toast.show({
          text: '请选择追号期数',
          type: 'warn'
        });
      } else {
        this.allIssueCount = this.allTrackIssueCount;
        this.operType = 2;
        this.leaveTrackAdmin();
      }
    },
    // 合买
    // set 认购
    setJoinBuyNum() {
      if (this.joinData.buyNum > this.joinData.totalNum) {
        this.joinData.buyNum = this.joinData.totalNum;
        this.joinData.guaranteeNum = 0;
      }
    },
    // set 保底
    setJoinguaranteeNum() {
      if (
        this.joinData.buyNum + this.joinData.guaranteeNum >
        this.joinData.totalNum
      ) {
        this.joinData.guaranteeNum =
          this.joinData.totalNum - this.joinData.buyNum;
      }
    }
  }
};
</script>
<style lang="less">
@import url('./Bet.less');
</style>
