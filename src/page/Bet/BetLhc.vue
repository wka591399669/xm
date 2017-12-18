<template>
  <div id="BetLhc">
    <BetHeader :curMethod="curMethod" :method="playMethods" @checkSecond="headerCheck" :curSecond="curSecond"></BetHeader>
    <div class="pageTop">
      <p v-if="isStop.state">已停盘</p>
      <p v-else>
        距离<em>{{this.saleInfo.issueID}}</em>期开奖还有
        <em>
          {{showTime[3]==='00'?'':showTime[3]+'天'}}{{showTime[0]==='00'?'':showTime[0]+'时'}}{{showTime[1]==='00'?'':showTime[1]+'分'}}{{showTime[2]+'秒'}}
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
         <li>
            <span>期号</span>
            <span style="text-align:center;">平码</span>
            <span>特码</span>
            <span>生肖</span>
            <span>单双</span>
            <span>色波</span>
            <span>五行</span>
            <span>特头</span>
            <span>尾数</span>
            <span>单双</span>
          </li>
          <li v-for="(it,i) in his" :key="i">
            <span>{{it.issueId.slice(4,7)}}</span>
            <span>
              <em v-for="(is,j) in it.resultStr.split(',').slice(0,6)" :key="j">{{is}}</em>
            </span>
            <span>
              <em>{{it.resultStr.split(",").join("").slice(12,14)}}</em>
            </span>
            <span>{{it.resultSX}}</span>
            <span>{{it.resultDS}}</span>
            <span>{{it.resultSB}}</span>
            <span>{{it.resultWX}}</span>
            <span>{{it.resultTT}}</span>
            <span>{{it.resultWS}}</span>
            <span>{{it.resultHDS}}</span>
          </li>
        </ul>
      </div>
    </div>

     <div class="main">
      <!-- <p class="tip" v-if="playMethods">
        {{playMethods[curMethod].des}}
      </p> -->
      <div class="balls" :class="playMethods[curMethod].proType">
        <div class="rate" v-if="['LHCZXBZ','LHCHX'].indexOf(playMethods[curMethod].proType) >=0">
          <span>{{playMethods[curMethod].proTypeName}}</span>
          <span>赔率：{{showTwoRate}}</span>
        </div>
        <div
        v-for="(it,i) in playMethods[curMethod].childProTypeList" 
        :key="i"
        v-if="it.proTypeName == curSecond"
        >
          
          <span 
          class="ball"
          v-for="(is,j) in it.itemInfoList"
          :key="j"
          :class="[is.itemID,{'check':tempBall.ball.indexOf(`0,${is.itemName},${is.itemID},${curSecond},${is.rate}`) >= 0}]"          
          @click="handleBallClick(`0,${is.itemName},${is.itemID},${curSecond},${is.rate}`)"
          >
            <span>
            {{is.itemName}}
              <i v-if="is.itemValue">{{is.itemValue.split(' ').join(',')}}</i>
            </span>          
            <em>{{is.rate}}</em>
          </span>
        </div>
      </div>
    </div>
    <div class="pageFooter">
      <div class="count">
        <p>{{stake}}注{{tempBall.planMoney * stake}}元</p>
        <!-- <p>余额：<span>0</span>元</p> -->
      </div>
      <div class="action">
        <div @click="clearPick">
          <img src="../../assets/img/lottery/clear.png" alt="">
          清空
        </div>
        <!-- <span :class="{'disabel':!planBall.length}" @click="toPlanAdmin">确定</span> -->
        <span @click="toPlanAdmin">确定</span>
        <span @click="getRandom">机选</span>
      </div>
    </div>
    <!-- 方案管理 -->
    <popup class="planPopup" v-model="planShow" height="100%">
      <XHeader @on-click-back="leavePlanAdmin" :left-options="{backText: '',preventGoBack:true}">
        投注
      </XHeader>
      <div class="pageTop">
        <p v-if="isStop.state">已停盘</p>
        <p v-else>
          距离<em>{{this.saleInfo.issueID}}</em>期开奖还有
          <em>
            {{showTime[3]==='00'?'':showTime[3]+'天'}}{{showTime[0]==='00'?'':showTime[0]+'时'}}{{showTime[1]==='00'?'':showTime[1]+'分'}}{{showTime[2]+'秒'}}
          </em>
        </p>
      </div>
      <div class="quick">
        <span @click="planShow=false"><img src="../../assets/img/lottery/hand.png">手选号码</span>
        <span @click="getRandomAndAddlPlan"><img src="../../assets/img/lottery/random.png">随机一注</span>
        <span @click="clearPlan('all')"><img src="../../assets/img/lottery/clear.png">清除列表</span>
      </div>
      <div class="operation">
        请输入统一金额：<input @keyup="changeAllPlan" placehold="请输入金额" type="number">
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
                  {{it.playMethod.proTypeName}}-{{curSecond}}
                </span>
                <span>赔率：{{it.rate}}</span>
                <!-- <span>{{it.planMoney}}元</span> -->
              </p>
            </div>
            <div class="btn">
              <input type="number" @keyup="changePlan" :index="i" :value="it.planMoney" max="6">
              元
            </div>
            <img @click="planShow=false" class="next" src="../../assets/img/next.png" alt="">
          </li>
        </ul>
      </div>
      <div class="show">
        <p>
          <span>合计：{{allMoney}}元</span>
          <span>{{allStake}}注</span>
        </p>
        <div>计划倍投</div>
        <div @click="toOrder">投注</div>
      </div>
    </popup>
    <div class="showNotice" v-if="showTime[1]=='00'&&showTime[2]>='57'">
      <p>离开奖时间还有不到一分钟</p>
      <p>请及时投注</p>
    </div>
  </div>
</template>
<script>
import { Popup, Range, XHeader } from 'vux';
import BetHeader from './component/BetHeader';
import service from './Bet.service';
import playMethod from './playMethodDoc.json';
export default {
  name: 'BetLhc',
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
      showHis: false, // 打开历史
      showSet: false, // 显示注单设置
      planShow: false // 显示方案管理
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
    curSecond() {
      return this.$store.state.bet.curSecond;
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
      console.log(1);
      return this.$store.state.bet.planBall;
    },
    showTime() {
      return service.formatSeconds(this.time);
    },
    // 计算注数
    stake() {
      // return this.tempBall.ball.length;
      return this.curMethod !== 'default'
        ? service.countStake(
            this.curMethod,
            this.tempBall.ball,
            1,
            this.curSecond
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
      console.log(this.planBall);
      return this.planBall.reduce((a, b) => {
        return a + b.planMoney;
      }, 0);
    },
    allStake() {
      return this.planBall.reduce((a, b) => {
        return a + b.stake;
      }, 0);
    },
    // 显示合肖和自选不中的赔率
    showTwoRate() {
      let rateObj = this.playMethods[
        this.curMethod
      ].childProTypeList[0].itemInfoList[0].rateList.filter(
        x => x.ball == this.tempBall.ball.length
      );
      return rateObj.length ? rateObj[0].rate : '--';
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
    headerCheck(first, second) {
      console.log(second);
      this.$store.dispatch('bet/headerCheckSecond', {
        first: first.proType,
        second: second.proTypeName
      });
    },
    // 点击选号
    handleBallClick(v) {
      if (
        this.curMethod == 'LHCZXBZ' &&
        this.tempBall.ball.length >= 11 &&
        this.tempBall.ball.indexOf(v) < 0
      ) {
        this.$vux.toast.text('自选不中最多只能选择11个号码', 'bottom');
        return false;
      }
      if (
        this.curMethod == 'LHCHX' &&
        this.tempBall.ball.length >= 11 &&
        this.tempBall.ball.indexOf(v) < 0
      ) {
        this.$vux.toast.text('合肖最多只能选择11个号码', 'bottom');
        return false;
      }
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
    // 修改单个方案项的金额
    changePlan(e) {
      this.$store.commit('bet/changePlanMoney', {
        i: e.target.attributes.index.value,
        money: e.target.value
      });
    },
    // 批量修改方案金额
    changeAllPlan(e) {
      this.$store.commit('bet/changeAllPlanMoney', e.target.value);
    },
    // 添加到投注区
    addPlan() {
      if (
        ['LHCZXBZ', 'LHCHX', 'LHCLXLW', 'LHCLM'].indexOf(this.curMethod) >= 0
      ) {
        console.log(this.tempBall);
        let rate;
        if (
          ['LHCZXBZ', 'LHCHX'].indexOf(
            this.playMethods[this.curMethod].proType
          ) >= 0
        ) {
          let rateObj = this.playMethods[
            this.curMethod
          ].childProTypeList[0].itemInfoList[0].rateList.filter(
            x => x.ball == this.tempBall.ball.length
          );
          rate = rateObj.length ? rateObj[0].rate : '--';
        } else {
          rate = this.tempBall.ball[0].rate;
        }
        let plan = {
          ball: this.tempBall.ball,
          playMethod: this.playMethods[this.curMethod],
          stake: this.stake,
          rate: rate,
          aloneMoney: this.tempBall.planMoney * this.tempBall.moneyType,
          planMoney:
            this.tempBall.planMoney * this.stake * this.tempBall.moneyType
        };
        this.$store.dispatch('bet/addPlan', plan);
      } else {
        this.tempBall.ball.map(x => {
          let plan = {
            ball: [x],
            curSecond: this.curSecond,
            rate: x.split(',')[4],
            playMethod: this.playMethods[this.curMethod],
            stake: this.stake / this.tempBall.ball.length,
            aloneMoney: this.tempBall.planMoney * this.tempBall.moneyType,
            planMoney: this.tempBall.planMoney * this.tempBall.moneyType
          };
          this.$store.dispatch('bet/addPlan', plan);
        });
      }

      // let plan = {
      //   ball: this.tempBall.ball,
      //   playMethod: this.playMethods[this.curMethod],
      //   stake: this.stake,
      //   planMoney:
      //     this.tempBall.planMoney * this.stake * this.tempBall.moneyType,
      //   rate: this.rateBean.rate,
      //   rake: this.rateBean.rake
      // };
      // this.$store.dispatch('bet/addPlan', plan);
      this.$store.dispatch('bet/clearPick');
      // this.showSet = false;
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
        document.body.style.overflow = 'hidden';
        this.planShow = true;
        // console.log(this.tempBall);
        this.addPlan();
      } else {
        this.$vux.toast.text('合法选球，否则无法购买', 'bottom');
      }
    },
    // 退出方案管理
    leavePlanAdmin() {
      document.body.style.overflow = 'auto';
      this.clearPlan('all');
      this.planShow = false;
    },
    // 整理显示方案号码
    showBall(arr) {
      // let res = [];
      // arr.map(x => {
      //   if (!res[x.split(',')[0]]) {
      //     res[x.split(',')[0]] = [];
      //   }
      //   res[x.split(',')[0]].push(x.split(',')[1]);
      // });
      // return res.map(x => x.join('')).join(',');
      return arr.map(x => x.split(',')[1]).join(',');
    },
    // 下单
    async toOrder() {
      let req = {
        batchOrder: service.batchOrderFormatLhc(
          this.planBall,
          this.$route.params.gameType
        ),
        operType: 1,
        issueId: this.saleInfo.issueID,
        gameType: this.$route.params.gameType,
        stake: 1,
        totalAmount: this.allMoney,
        roomId: 0,
        rakeOff: 0
      };
      console.log(req);
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
      } else {
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
@import url('./Bet.less');
</style>
