<template>
  <div id="Bet28">
    <XHeader :left-options="{backText: ''}">
      {{saleInfo.gameType}}
      <div slot="right">
        <img src="../../assets/img/lottery/record.png" @click="$router.push('/betRecord')">
        <img src="../../assets/img/lottery/more.png"  @click="showMoreHelp">
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
      <p class="openResult">
        {{this.his[0].issueId}}期开奖结果：
        <span v-for="(it,i) in this.his[0].resultStr.split(',').join('+')" :key="i">{{it}}</span>
          =
        <span>
          <em v-if="(parseInt(this.his[0].resultStr.slice(0,1))+parseInt(this.his[0].resultStr.slice(2,3))+parseInt(this.his[0].resultStr.slice(4,5)))>=14" :style="{ background:red}">{{parseInt(this.his[0].resultStr.slice(0,1))+parseInt(this.his[0].resultStr.slice(2,3))+parseInt(this.his[0].resultStr.slice(4,5))}}</em>
          <em v-else :style="{ background:blue}">{{parseInt(this.his[0].resultStr.slice(0,1))+parseInt(this.his[0].resultStr.slice(2,3))+parseInt(this.his[0].resultStr.slice(4,5))}}</em>
          <em v-if='parseInt(this.his[0].resultStr.slice(0,1))+parseInt(this.his[0].resultStr.slice(2,3))+parseInt(this.his[0].resultStr.slice(4,5))>=14&&(parseInt(this.his[0].resultStr.slice(0,1))+parseInt(this.his[0].resultStr.slice(2,3))+parseInt(this.his[0].resultStr.slice(4,5)))%2==1'>(大、单)</em>
          <em v-else-if='parseInt(this.his[0].resultStr.slice(0,1))+parseInt(this.his[0].resultStr.slice(2,3))+parseInt(this.his[0].resultStr.slice(4,5))>=14&&(parseInt(this.his[0].resultStr.slice(0,1))+parseInt(this.his[0].resultStr.slice(2,3))+parseInt(this.his[0].resultStr.slice(4,5)))%2==0'>(大、双)</em>
          <em v-else-if='parseInt(this.his[0].resultStr.slice(0,1))+parseInt(this.his[0].resultStr.slice(2,3))+parseInt(this.his[0].resultStr.slice(4,5))<14&&(parseInt(this.his[0].resultStr.slice(0,1))+parseInt(this.his[0].resultStr.slice(2,3))+parseInt(this.his[0].resultStr.slice(4,5)))%2==1'>(小、单)</em>
          <em v-else>(小、双)</em>
        </span>
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
            <span class="hisContent">
              <em v-for="(is,j) in it.resultStr.split(',').join('+')" :key="j">{{is}}</em>=
              <em v-if="(parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5)))>=14" :style="{ background:red}">{{parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5))}}</em>
              <em v-else :style="{ background:blue}">{{parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5))}}</em>
              <em v-if='parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5))>=14&&(parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5)))%2==1'>(大、单)</em>
              <em v-else-if='parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5))>=14&&(parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5)))%2==0'>(大、双)</em>
              <em v-else-if='parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5))<14&&(parseInt(it.resultStr.slice(0,1))+parseInt(it.resultStr.slice(2,3))+parseInt(it.resultStr.slice(4,5)))%2==1'>(小、单)</em>
              <em v-else>(小、双)</em>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="main">
      <ul class="talk" v-for="(it,i) in talk" :key="i">
        <li 
        class="info"
        v-if="it.type == 0"
        >
          <p>欢迎<span>{{it.name}}</span>进入房间</p>
        </li>
        <li
        class="me"
        v-if="it.type == 1">
          <div class="avatar">
            <img src="../../assets/img/avatar.png" alt="">
          </div>
          <div class="con">
            <p>{{it.name}}<span>{{it.time}}</span></p>
            <div class="plan">
              <p>
                <span>第{{it.issue}}期</span>
                <span>投注类型:{{it.plan}}</span>
              </p>
              <p><img src="../../assets/img/yb.png" alt="">{{it.money}}元宝</p>
            </div>
          </div>
        </li>
        <li
        v-if="it.type == 2">
          <div class="avatar">
            <img src="../../assets/img/avatar.png" alt="">
          </div>
          <div class="con">
            <p>{{it.name}}<span>{{it.time}}</span></p>
            <div class="plan">
              <p>
                <span>第{{it.issue}}期</span>
                <span>投注类型:{{it.plan}}</span>
              </p>
              <p><img src="../../assets/img/yb.png" alt="">{{it.money}}元宝</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="pageFooter" @click="showBet=true">
      <img src="../../assets/img/chat.png" alt="">
      <div></div>
      <img src="../../assets/img/bet.png" alt="">
    </div>
    <!-- 投注界面 -->
    <popup v-model="showBet" position="bottom">
      <div class="changeBtn">
        <img src="../../assets/img/lottery/left.png" @click="betIndex=betIndex-1" alt="">
        <img src="../../assets/img/lottery/right.png" @click="betIndex=betIndex+1" alt="">
      </div>
      <swiper :show-dots="false"  v-if="productTypeRateMap.rateList" class="bet" v-model="betIndex">
         <swiper-item>
          <div class="betmain" >
            <p>{{productTypeRateMap.rateList[1].productType}}</p>
            <p v-if="showResult">中奖和值：{{tempBall.dxdsSum[0]}}</p>
            <p v-for="(it,i) in productTypeRateMap.rateList[1].itemList" :key="i" v-if="tempBall.ball.indexOf(`PCDXDS,${i},${it.item}`) >= 0">中奖和值：{{tempBall.dxdsSum[i]}}</p>
            <ul>
              <li v-for="(it,i) in productTypeRateMap.rateList[1].itemList" :key="i"
              :class="{'check':tempBall.ball.indexOf(`PCDXDS,${i},${it.item}`) >= 0}"
              @click="handleBallClick(`PCDXDS,${i},${it.item}`)" >
                <em>{{it.item}}</em>
                <em>{{parseInt(it.rate)}}</em>
              </li>
            </ul>
          </div> 
        </swiper-item>
        <swiper-item>
          <div class="betmain">
            <p>{{productTypeRateMap.rateList[2].productType}}</p>
            <p v-if="showResult">中奖号码：[0]</p>
            <p v-for="(it,i) in productTypeRateMap.rateList[2].itemList" :key="i" v-if="tempBall.ball.indexOf(`CSZ,${it.item.slice(2,4)},${parseInt(it.rate)}`) >= 0">中奖号码：[{{i}}]</p>
            <ul>
              <li 
              v-for="(it,i) in productTypeRateMap.rateList[2].itemList" :key="i"
              :class="{'check':tempBall.ball.indexOf(`CSZ,${it.item.slice(2,4)},${parseInt(it.rate)}`) >= 0}"
              @click="handleBallClick(`CSZ,${it.item.slice(2,4)},${parseInt(it.rate)}`)"
              >
              <em>{{it.item.slice(2,4)}}</em>
              <em>{{parseInt(it.rate)}}</em>
              </li>
            </ul>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="betmain">
            <p>{{productTypeRateMap.rateList[0].productType}}</p>
            <p v-if="showResult">中奖和值：{{tempBall.tsSum[0]}}</p>
            <p v-for="(it,i) in productTypeRateMap.rateList[0].itemList" :key="i" v-if="tempBall.ball.indexOf(`TS,${parseInt(it.rate)},${it.item}`) >= 0">中奖和值：{{tempBall.tsSum[i]}}</p>
            <ul>
              <li 
              v-for="(it,i) in productTypeRateMap.rateList[0].itemList" :key="i"
              :class="{'check':tempBall.ball.indexOf(`TS,${parseInt(it.rate)},${it.item}`) >= 0}"
              @click="handleBallClick(`TS,${parseInt(it.rate)},${it.item}`)"
              >
              <em>{{it.item}}</em>
              <em>{{parseInt(it.rate)}}</em>
              </li>
            </ul>
          </div>          
        </swiper-item>
      </swiper>
      <div class="moneyBtn">
        <group>
          <x-input v-model="money" placeholder="请输入投注金额" :max="7">
            <span slot="right" style="color:#d5b77f;font-size:14px;" @click="showPlayDetail">赔率说明</span>
          </x-input>
        </group>
      </div>
      <div class="betBtn">
        <div @click="money=10">最小投注</div>
        <div @click="money=money*2">双倍投注</div>
        <div @click="toOrder()">确认投注</div>
      </div>
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
    <!-- 赔率说明 -->
    <popup v-model="playDetail" height="100%" style="background:#222;">
        <XHeader :left-options="{backText:''}"> 赔率说明</XHeader>
        <x-table border="0"  style="background-color:#222;color:#fff;margin-top:46px;border:1px solid #d5b77f;border-collapse:collapsed;">
          <thead>
            <tr>
              <th>玩法</th>
              <th>细则</th>
              <th>倍率(倍)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(it,i) in productTypeRateMap.rateList" :key="i">
              <td>{{it.productType}}</td>
              <td>
                <p v-for="(is,j) in it.itemList" :key="j" style="border-bottom:1px solid #999;">{{is.item}}</p>
              </td>
              <td>
                <p v-for="(is,j) in it.itemList" :key="j" style="border-bottom:1px solid #999;">{{is.rate}}</p>
              </td>
            </tr>
          </tbody>
        </x-table>
        
        <div style="color:#fff;padding:.2rem .8rem;" v-html="productTypeRateMap.content"></div>
      
    </popup>
  </div>
</template>
<script>
import { Popup, Range, XHeader, Swiper, SwiperItem, XInput, Group,XTable } from 'vux';
import BetHeader from './component/BetHeader';
import service from './Bet.service';
import playMethod from './playMethodDoc.json';
export default {
  name: 'Bet28',
  components: {
    BetHeader,
    Popup,
    Range,
    XHeader,
    Swiper,
    SwiperItem,
    XInput,
    Group,
    XTable
  },
  beforeDestroy() {
    this.$store.dispatch('bet/timeDownEnd');
  },
  data() {
    return {
      drag: 0, // 反水拖动距离
      showHis: false, // 打开历史
      betIndex: 0, // 当前投注界面Index
      showBet: false, // 显示投注界面
      money: '', //投注金额
      talk: [], // 聊天信息
      toDown: null, //下啦倒计时
      red:"red",
      blue:"blue",
      serviceLink:'',
      gameTypeDecLink:SETTING.apiHost + '/gameType/' + this.$route.params.gameType+'.html',
      moreHelpShow: false,
      playDetail:false,
      productTypeRateMap:{},
      showResult:true
    };
  },
  computed: {
    roomInfo() {
      return this.$store.state.bet.roomInfo;
    },
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
      return this.tempBall.ball.length;
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
    this.initRoom();
    this.init();
    this.service(); 
    this.getRateDetail();
  },
  mounted() {
    this.toDown = setInterval(() => {
      if (
        document.querySelector('.main').offsetHeight +
          200 -
          (document.documentElement.scrollTop + document.body.offsetHeight) <
        60
      ) {
        window.scrollTo(0, 1000000);
      }
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.toDown);
  },
  methods: {
    async initRoom() {
      if (!Object.keys(this.roomInfo).length) {
        this.$router.go(-1);
      }
      console.log(nim);
      // 获取聊天室地址
      nim.getChatroomAddress({
        chatroomId: this.roomInfo.thirdRoomId,
        done: (err, obj) => {
          console.log(obj);
          // 连接聊天室
          let room = Chatroom.getInstance({
            appKey: SETTING.wyKey,
            account: window.localStorage.getItem('thirdAccId'),
            token: window.localStorage.getItem('thirdToken'),
            chatroomId: this.roomInfo.thirdRoomId,
            chatroomAddresses: obj.address,
            onconnect: () => {
              console.log('进入房间成功');
              // 获取历史
              console.log(room);
              room.getHistoryMsgs({
                timetag: Date.parse(new Date()),
                limit: 10,
                done: (err, his) => {
                  console.log(his);
                  his.msgs.map(x => this.sendMsg(x));
                }
              });
            },
            onmsgs: msg => {
              console.log(msg);
              msg.map(x => this.sendMsg(x));
            }
          });
        }
      });
    },
    // 发送消息
    sendMsg(msg) {
      let planDes = msg.custom && JSON.parse(msg.custom);
      let type = 0;
      let name = msg.fromNick;
      if (!name) return false;
      let time =
        (new Date(msg.time).getHours() < 10
          ? '0' + new Date(msg.time).getHours()
          : new Date(msg.time).getHours()) +
        ':' +
        (new Date().getMinutes() < 10
          ? '0' + new Date().getMinutes()
          : new Date().getMinutes());
      let money;
      let issue;
      let plan;
      if (msg.type == 'notification' && msg.attach.type == 'memberEnter') {
        type = 0;
      } else if (
        msg.type == 'tip' &&
        msg.tip == '投注记录' &&
        msg.fromNick == window.localStorage.getItem('userId')
      ) {
        type = 1;
        money = planDes.playMoney;
        issue = planDes.issueID;
        plan = planDes.betStyle;
      } else if (msg.type == 'tip' && msg.tip == '投注记录') {
        type = 2;
        money = planDes.playMoney;
        issue = planDes.issueID;
        plan = planDes.betStyle;
        console.log(plan);
      }

      let m = {
        type,
        money,
        issue,
        plan,
        name,
        time
      };
      this.talk.push(m);
      this.talk.length > 40 && this.talk.shift();
    },
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
    // 点击选号
    handleBallClick(v) {
      this.showResult = false;
      this.clearPick();
      this.clearPlan('all');
      this.$store.dispatch('bet/handleBallClick', v);
      console.log(this.tempBall.ball);
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
      this.tempBall.ball.map(x => {
        let plan = {
          ball: [x],
          playMethod: this.playMethods[this.curMethod],
          stake: 1,
          aloneMoney: this.money,
          planMoney: this.money
        };
        this.$store.dispatch('bet/addPlan', plan);
      });
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
    async toOrder(type) {
      if (!this.tempBall.ball.length || !this.money) {
        this.$vux.toast.text('合法选球，否则无法购买', 'bottom');
        return;
      }
      if (type == 10) {
        this.money = 10;
      }
      if (type == 'two') {
        this.money = this.money * 2;
      }

      this.addPlan();
      let req = {
        batchOrder: service.batchOrderFormat(
          this.planBall,
          this.$route.params.gameType
        ),
        operType: 1,
        issueId: this.saleInfo.issueID,
        gameType: this.$route.params.gameType,
        stake: 1,
        totalAmount: this.money,
        roomId: this.$route.params.roomId,
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
        console.log(this.planBall);
        this.talk.push({
          type: 1,
          name: window.localStorage.getItem('userId'),
          time: new Date().getHours() + ':' + new Date().getMinutes(),
          issue: this.saleInfo.issueID,
          money: this.money,
          plan: this.planBall[0].ball[0].split(',')[2]
        });
        this.leavePlanAdmin();
        this.clearPlan('all');
        this.showBet = false;
      } else {
        this.$vux.toast.show({
          text: res.returnMessage,
          type: 'warn'
        });
      }
    },
    //点击显示更多按钮
    showMoreHelp() { 
      this.moreHelpShow = !this.moreHelpShow;
    },
     // 获取客服地址
    async service() {
      let res = await this.$http('/queryCustomerServiceInfo');
      console.log(res.returnMap.customerServiceUrl);
      this.serviceLink = res.returnMap.customerServiceUrl;
    },
    //获取赔率说明
    async getRateDetail() { 
      let res = await this.$http('/queryGameIntroAndRate', {
        body: {
          gameType:this.$route.params.gameType,
          roomRank:this.$route.params.roomRank
        }
      });
      this.productTypeRateMap = res.returnMap; 

    }, 
    showPlayDetail() {
      this.playDetail = !this.playDetail;
       
    },
  }
};
</script>
<style lang="less">
@import url('./Bet.less');
</style>
