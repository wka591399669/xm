<template>
  <div id="Bet28">
    <XHeader :left-options="{backText: ''}">
      {{roomRankName[this.$route.params.roomRank-1]+roomInfo.roomName}}
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
        <li class="info" v-if="it.type == 0">
          <p>欢迎<span>{{it.userId.slice(0,2)}}***</span>进入房间</p>
        </li>
        <li class="me" v-if="it.type == 1" @click="followBet=true">
          <div class="avatar">
            <img src="../../assets/img/avatar.png" alt="">
          </div>
          <div class="con">
            <p>{{it.name.slice(0,2)}}***<span>{{it.time}}</span></p>
            <div class="plan">
              <p>
                <span>第{{it.issue}}期</span>
                <span>投注类型:{{it.plan}}</span>
              </p>
              <p><img src="../../assets/img/yb.png" alt="">{{it.money}}元宝</p>
            </div>
          </div>
        </li>
        <li v-if="it.type == 2"  @click="followBet=true">
          <div class="avatar">
            <img src="../../assets/img/avatar.png" alt="">
          </div>
          <div class="con">
            <p>{{it.userId.slice(0,2)}}***<span>{{it.time}}</span></p>
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
        class="info" v-if="it.type == 3">
          <p><span>{{it.issue}}</span>期开奖结果<span>{{it.issueResult}}</span></p>
        </li>
    </ul>
    <ul class="talk">
        <li class="info" v-if="showTime.join(',').replace(/,/g,'')=='0000600'">
            <p><span>{{saleGameInfo.issueID}}已封盘</span>，下注结果以系统开奖为准，如有异议，请及时联系客服</p>
        </li>
        <li class="info" v-if="showTime.join(',').replace(/,/g,'')!='0000000'">
             <p><span>【{{saleInfo.issueID}}】</span>单注<span>{{roomInfo.minOrderAmount}}元</span>起<span>{{roomInfo.maxOrderAmount}}</span>封顶，总注<span>{{roomInfo.issueOrderAmount}}</span>封顶</p>
            <p><span>☆☆现在开始可以下注☆☆</span></p>
        </li>
        <li class="info" v-if="showTime[1]=='00'&&showTime[2]>='10'">
          <p>离开奖时间还有不到一分钟</p>
          <p>请及时投注</p>
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
            <p>中奖和值：{{dxdsSum[dxdsIndex]}}</p>
            
            <ul>
              <li v-for="(it,i) in productTypeRateMap.rateList[1].itemList" :key="i"
              :class="{'check':tempBall.ball.indexOf(`PCDXDS,${i},${it.item}`) >= 0}"
              @click="handleBallClick('PCDXDS',i,it.item,i)" >
                <em>{{it.item}}</em>
                <em>{{parseFloat(it.rate)}}</em>
              </li>
            </ul>
          </div> 
        </swiper-item>
        <swiper-item>
          <div class="betmain">
            <p>{{productTypeRateMap.rateList[2].productType}}</p>
            <p>中奖号码：[{{cszIndex}}]</p>
            <p v-for="(it,i) in productTypeRateMap.rateList[2].itemList" :key="i" v-if="tempBall.ball.indexOf(`CSZ,${it.item.slice(2,4)},${parseInt(it.rate)}`) >= 0">中奖号码：[{{i}}]</p>
            <ul>
              <li 
              v-for="(it,i) in productTypeRateMap.rateList[2].itemList" :key="i"
              :class="{'check':tempBall.ball.indexOf(`CSZ,${it.item.slice(2,4)},${parseInt(it.rate)}`) >= 0}"
              @click="handleBallClick('CSZ',it.item.slice(2,4),parseInt(it.rate),i)"
              >
              <em>{{it.item.slice(2,4)}}</em>
              <em>{{parseFloat(it.rate)}}</em>
              </li>
            </ul>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="betmain">
            <p>{{productTypeRateMap.rateList[0].productType}}</p>
            <p>中奖和值：[{{tsSum[tsIndex][0]}}]</p>
            <p v-for="(it,i) in productTypeRateMap.rateList[0].itemList" :key="i" v-if="tempBall.ball.indexOf(`TS,${parseInt(it.rate)},${it.item}`) >= 0">中奖和值：[{{tsSum[i][0]}}]</p>
            <ul>
              <li 
              v-for="(it,i) in productTypeRateMap.rateList[0].itemList" :key="i"
              :class="{'check':tempBall.ball.indexOf(`TS,${parseInt(it.rate)},${it.item}`) >= 0}"
              @click="handleBallClick('TS',parseInt(it.rate),it.item,i)"
              >
              <em>{{it.item}}</em>
              <em>{{parseFloat(it.rate)}}</em>
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
<!--28跟投 -->
<!--     <div v-transfer-dom>
      <x-dialog v-model="followBet" class="dialog-demo">
        <div class="img-box">
           <h5>确定跟投吗？</h5>
           <p><span>玩家</span><span>{{it.name.slice(0,2)}}***</span></p>
           <p><span>期数</span><span>{{it.issue}}</span></p>
           <p><span>类别</span><span>{{it.plan}}</span></p>
           <p><span>金额</span><span>{{it.money}}</span></p>
           <p><span @click="followBet=false">取消</span><span @click="toOrder()">确定</span></p>
        </div>
      </x-dialog>
    </div> -->
  </div>
</template>
<script>
import { XDialog,TransferDomDirective as TransferDom,Popup, Range, XHeader, Swiper, SwiperItem, XInput, Group,XTable,Toast } from 'vux';
import BetHeader from './component/BetHeader';
import service from './Bet.service';
import playMethod from './playMethodDoc.json';
export default {
  name: 'Bet28',
   directives: {
    TransferDom
  },
  components: {
    BetHeader,
    Popup,
    Range,
    XHeader,
    Swiper,
    SwiperItem,
    XInput,
    Group,
    XTable,
    Toast,
    XDialog
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
      dxdsIndex:0, 
      tsIndex:0,
      cszIndex:0,
      dxdsSum: [ 
        [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27],
        [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26],
        [15, 17, 19, 21, 23, 25, 27],
        [1, 3, 5, 7, 9, 11, 13],
        [14, 16, 18, 20, 22, 24, 26],
        [0, 2, 4, 6, 8, 10, 12],
        [22, 23, 24, 25, 26, 27],
        [0, 1, 2, 3, 4, 5]
      ],
      tsSum: [
        ['3, 6, 9, 12, 15, 18, 21, 24'],
        ['1, 4, 7, 10, 16, 19, 22, 25'],
        ['2, 5, 8, 11, 17, 20, 23, 26'],
        ['三个数字一致即为中奖']
      ],
      roomRankName:['回水厅','保本厅','高赔率厅'],
      saleGameInfo:{},
      betMoneyLimit:[],
      hisResult:[]
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
    this.getSaleGameInfo();
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
    initRoom() {
      if (!Object.keys(this.roomInfo).length) {
        this.$router.go(-1);
      }
    //  console.log(nim);
      // 获取聊天室地址
      nim.getChatroomAddress({
        chatroomId: this.roomInfo.thirdRoomId,
        done: (err, obj) => {
      //    console.log(obj);
          // 连接聊天室
          let room = Chatroom.getInstance({
            appKey: SETTING.wyKey,
            account: window.localStorage.getItem('thirdAccId'),
            token: window.localStorage.getItem('thirdToken'),
            chatroomId: this.roomInfo.thirdRoomId,
            chatroomAddresses: obj.address,
            onconnect: () => {
      //        console.log('进入房间成功');
              // 获取历史
       //       console.log(room);
              room.getHistoryMsgs({
                timetag: Date.parse(new Date()),
                limit: 10,
                done: (err, his) => {
                 // console.log(his);
                  his.msgs.map(x => this.sendMsg(x));
                }
              });
            },
            onmsgs: msg => {
             //console.log(msg);
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
      let userId;
      let issueResult;
      console.log(msg);
      if (
        planDes.type == 'BET_SCUSS' && 
        msg.fromNick == window.localStorage.getItem('userId')
      ) {
        type = 1;
        money = planDes.playMoney;
        issue = planDes.issueID;
        plan = planDes.betStyle;
        userId=planDes.userId;
      } else if (planDes.type == 'BET_SCUSS' ) {
        type = 2;
        money = planDes.playMoney;
        issue = planDes.issueID;
        plan = planDes.betStyle;
        userId=planDes.userId;
      //  console.log(plan);
      } else if (planDes.userId == 'admin' ) {
        type = 3;
        issueResult = planDes.issueResult;
        issue = planDes.issueId; 
      //  console.log(plan);
      }  else {
        type = 0;
        userId =msg.fromNick; 
      }

      let m = {
        type,
        money,
        issue,
        plan,
        userId,
        time,
        issueResult
      };
      
      this.talk.push(m);
      this.talk.length > 40 && this.talk.shift();
    },
    /**
     * init
     */
    init() {
      this.$vux.loading.show({
        text: 'Loading'
      });
      this.$store.dispatch('bet/setBet', this.$route.params.gameType);
      this.$store.dispatch('bet/init');
      this.$vux.loading.hide();
    },
    /**
     * play
     */
    // 点击选号
    handleBallClick(p,b,r,ind) {
      var v= p+","+b+","+r; 
      if("PCDXDS"==p){
        this.dxdsIndex=ind;
      }
      if("TS"==p){
        this.tsIndex=ind;
      } 
      if("CSZ"==p){
        this.cszIndex=ind;
      } 
      this.clearPick();
      this.clearPlan('all');
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
      
      let res = await this.$http('/addOrder', {
        body: req
      });
      if (res.returnCode == '0000') {
        this.$vux.toast.show({
          text: '下单成功',
          type: 'success'
        });
         
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
     //获取在售彩种信息
    async getHisResult() { 
      let res = await this.$http('/queryGameTypeResultByGameType', {
        body: {
          gameType:this.$route.params.gameType
        }
      });
      alert(123);
      this.hisResult = res.returnList; 
    },
    //获取在售彩种信息
    async getSaleGameInfo() { 
      let res = await this.$http('/querySaleGameInfo', {
        body: {
          gameType:this.$route.params.gameType
        }
      });
      this.saleGameInfo = res.returnMap; 
    },
/*   //获取彩种当期可投注最大，最小及单注金额
    async getBetMoneyLimit() { 
      let res = await this.$http('/queryRoomRankInfo', {
        body: {
          gameType:this.$route.params.gameType
        }
      });
      this.betMoneyLimit = res.returnList; 
    }, */ 
    showPlayDetail() {
      this.playDetail = !this.playDetail;
    }
  }
};
</script>
<style lang="less">
@import url('./Bet.less');
</style>
