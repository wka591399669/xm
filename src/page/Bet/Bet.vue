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
          <span>合计：{{allMoney}}元</span>
          <span>{{allStake}}注</span>
        </p>
        <div>计划倍投</div>
        <div @click="toOrder">投注</div>
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
      let req = {
        batchOrder: service.batchOrderFormat(
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
        this.$store.commit('bet/resetPlay');
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
