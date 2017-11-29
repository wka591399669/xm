// 彩票游戏
import Fetch from '../../util/fetch';
import service from './Bet.service';
import playMethod from './playMethodDoc.json';

let timeDown = null; // 倒计时

export default {
  state: {
    roomInfo: {}, // pc28房间信息
    time: 0, // 倒计时时间
    isStop: {
      state: false, // 是否停盘
      checkNum: 0, // 检查次数
      enableNum: 3 // 停盘的检查次数
    },
    gameType: '', // 当前彩种
    saleInfo: {
      gameType: '', // 彩种名称
      gameDes: '', // 彩种描述
      issueID: '', // 当前期号
      issueNum: 0, // 总期号
      GMTcurTime: 0, // 当前时间
      GMTcloseTime: 0 // 封盘时间
    },
    his: [
      // 开奖历史
      {
        issueId: '',
        resultStr: ''
      }
    ],
    playMethods: {
      default: {
        ballTypeName: []
      }
    }, // 彩种的所有开启的玩法
    curMethod: 'default', // 彩种的当前玩法
    curSecond: 'default', // 彩种的二级玩法（六合彩）
    gameLost: [[0]], // 当前玩法的遗漏
    rateBean: {
      rate: 0, // 赔率 显示的时候除以2 后端接收原值
      minRate: 0, // 最小赔率
      maxRate: 0, // 最大赔率
      rake: 0, // 返利
      rakeOff: 0, // 最小返利
      maxRakeOff: 0 // 最大返利
    },
    /**
     * play
     */
    // 当前选号
    tempBall: {
      ball: [], // 选号
      moneyType: 1, // 1元 0.1角 0.01分
      planMoney: 2 // 方案金额
    },
    // 投注区方案
    planBall: []
  },
  mutations: {
    'bet/setBet'(state, res) {
      state.gameType = res;
    },
    'bet/getBetInfo'(state, res) {
      state.saleInfo = Object.assign({}, res);
    },
    'bet/getPlayMethods'(state, res) {
      state.playMethods = Object.assign({}, res);
    },
    'bet/curMethod'(state, res) {
      state.curMethod = res;
    },
    'bet/curSecond'(state, res) {
      state.curSecond = res;
    },
    'bet/getGameLost'(state, res) {
      state.gameLost = res;
    },
    'bet/getHis'(state, res) {
      state.his = res;
    },
    'bet/getRate'(state, res) {
      let rateBean = {
        rate: 0, // 赔率 显示的时候除以2 后端接收原值
        minRate: 0, // 最小赔率
        maxRate: 0, // 最大赔率
        rake: 0, // 返利
        rakeOff: 0, // 最小返利
        maxRakeOff: 0 // 最大返利
      };
      state.rateBean = Object.assign({}, rateBean, res);
    },
    'bet/time'(state, res) {
      state.time = res;
    },
    'bet/roomInfo'(state, res) {
      state.roomInfo = Object.assign({}, res);
    },
    /**
     * play
     */
    'bet/clearPick'(state) {
      state.tempBall.ball = [];
    },
    'bet/clearPlan'(state, type) {
      if (type == 'all') {
        state.planBall = [];
      } else {
        state.planBall.splice(type, 1);
      }
    },
    
    'bet/handleQuickClick'(state,{i,k}) {
      let n = state.tempBall.ball;
      
      var startBall=1;
      var endBall=10;
      var maxBall=5;
      var minBall=6;

      if(state.gameType != 'PK10'){
        startBall--;
        endBall--;
        maxBall--;
        minBall--;
      }
      console.log("ttt1:"+state.tempBall.ball);
     
      for(var x=startBall;x<=endBall;x++){
        console.log("ttt2:"+i+","+x);
        var index = n.indexOf(i+","+x);
        if(index!==-1){
          n.splice(n.indexOf(i+","+x), 1);
        } 
       }
       state.tempBall.ball=n;
       //console.log("ttt3:"+state.tempBall.ball);

       for(var x=startBall;x<=endBall;x++){
         if(k==0){//全
           state.tempBall.ball.push(i+","+x);
         }
         if(k==1 && x>maxBall){//大 
           state.tempBall.ball.push(i+","+x); 
         }
         if(k==2 && x<minBall){//小 
           state.tempBall.ball.push(i+","+x); 
         }
         if(k==3 && x%2!=0){//单 
           state.tempBall.ball.push(i+","+x); 
         }
         if(k==4 && x%2==0){//双 
           state.tempBall.ball.push(i+","+x); 
         }
       }  
      console.log("ttt4:"+state.tempBall.ball);
    },
    'bet/handleBallClick'(state, v) {
      console.log('ball:'+state.tempBall.ball);
      if (state.tempBall.ball.indexOf(v) >= 0) {
        let n = state.tempBall.ball;
        n.splice(state.tempBall.ball.indexOf(v), 1);
        state.tempBall.ball = n;
      } else {
        state.tempBall.ball.push(v);
      }
      state.tempBall.ball.sort((a, b) => a.split(',')[1] - b.split(',')[1]);
    },
    'bet/handleRateDrag'(state, v) {
      // 返利
      let rakeSche =
        Number(state.rateBean.maxRakeOff) - Number(state.rateBean.rakeOff);
      state.rateBean.rake = (Number(state.rateBean.rakeOff) +
        v / 100 * rakeSche
      ).toFixed(3);
      // 赔率
      let rateSche =
        Number(state.rateBean.maxRate) - Number(state.rateBean.minRate);
      state.rateBean.rate = (Number(state.rateBean.maxRate) -
        v / 100 * rateSche
      ).toFixed(3);
    },
    // 重置投注区数据
    'bet/resetPlay'(state) {
      state.tempBall = {
        ball: [], // 选号
        moneyType: 1, // 1元 0.1角 0.01分
        planMoney: 2 // 方案金额
      };
      state.planBall = [];
    },
    // 修改单个方案金额
    'bet/changePlanMoney'(state, { i, money }) {
      state.planBall[i].planMoney = Number(money);
    },
    'bet/changeAllPlanMoney'(state, money) {
      state.planBall.map(x => {
        x.planMoney = Number(money);
      });
      console.log(state.planBall);
    }
  },
  actions: {
    // 初始化
    async 'bet/init'(context) {
      await context.dispatch('bet/clearPick');
      await context.dispatch('bet/clearPlan', 'all');
      await context.dispatch('bet/getBetInfo');
      await context.dispatch('bet/getHis');
      // 28只请求上面两个
      if (service.betType(context.state.gameType) == 'xyrb') {
        return;
      }
      if (context.state.gameType == 'HKLHC') {
        await context.dispatch('bet/getLHCPlayMethods');
      } else {
        await context.dispatch('bet/getPlayMethods');
      }
      await context.dispatch('bet/getGameLost');
      await context.dispatch('bet/getRate');
    },
    // 设置当前彩种
    async 'bet/setBet'(context, gameType) {
      context.commit('bet/setBet', gameType);
      return;
    },
    // 获取彩种销售信息
    async 'bet/getBetInfo'(context) {
      let res = await Fetch('/querySaleGameInfo', {
        body: {
          gameType: context.state.gameType
        }
      });
      context.commit('bet/getBetInfo', res.returnMap);
      let time = (res.returnMap.GMTcloseTime - res.returnMap.GMTcurTime) / 1000;
      await context.dispatch('bet/timeDown', time);
      return;
    },
    // 开始倒计时
    async 'bet/timeDown'(context, time) {
      clearInterval(timeDown);
      context.commit('bet/time', time);
      timeDown = setInterval(() => {
        // 时间小于0，判断封盘
        if (context.state.time <= 0) {
          clearInterval(timeDown);
          context.state.isStop.checkNum++;
          if (context.state.isStop.checkNum < context.state.isStop.enableNum) {
            context.dispatch('bet/init');
          } else {
            context.state.isStop.state = true;
            context.commit('bet/time', null);
          }
        } else {
          context.state.isStop.checkNum = 0;
          let newTime = context.state.time - 1;
          context.commit('bet/time', newTime);
        }
      }, 1000);
    },

    // 结束倒计时
    async 'bet/timeDownEnd'(context) {
      clearInterval(timeDown);
      timeDown = null;
      context.state.isStop = {
        state: false, // 是否停盘
        checkNum: 0, // 检查次数
        enableNum: 3 // 停盘的检查次数
      };
      context.state.time = 0;
    },

    // 获取开奖结果
    async 'bet/getHis'(context) {
      let res = await Fetch('/queryGameTypeResultByGameType', {
        body: {
          gameType: context.state.gameType
        }
      });
      context.commit('bet/getHis', res.returnList);
      return;
    },
    // 获取彩种玩法
    async 'bet/getPlayMethods'(context) {
      let res = await Fetch('/queryProTypeItemInfo', {
        body: {
          gameType: context.state.gameType,
          state: 50
        }
      });
      let playMethods = service.filterMethod(
        playMethod[service.betType(context.state.gameType)],
        res.returnList
      );
      context.commit('bet/getPlayMethods', playMethods);
      context.commit('bet/curMethod', Object.keys(playMethods)[0]);
      return;
    },
    // 获取六合彩的玩法
    async 'bet/getLHCPlayMethods'(context) {
      let res = await Fetch('/queryProTypeItemInfoForHKLHC', {
        body: {
          gameType: context.state.gameType
        }
      });
      let playMethods = {};
      res.returnList.map(x => {
        playMethods[x.proType] = x;
      });
      // 组合六合彩的玩法
      let lhcPlay = service.mergeLhcMethod(res.returnList);

      context.commit('bet/getPlayMethods', playMethods);
      context.commit('bet/curMethod', Object.keys(playMethods)[0]);
      context.commit(
        'bet/curSecond',
        playMethods[Object.keys(playMethods)[0]].childProTypeList[0].proTypeName
      );
      return;
    },
    // 获取遗漏
    async 'bet/getGameLost'(context) {
      // ballType2无遗漏 ballType3双色球 六合彩 不获取遗漏
      if (
        context.state.gameType == 'HKLHC' ||
        !context.state.playMethods[context.state.curMethod].ballType ||
        [2, 3].indexOf(
          context.state.playMethods[context.state.curMethod].ballType
        ) >= 0
      )
        return;
      let res = await Fetch('/queryGameLost', {
        body: {
          gameType: context.state.gameType,
          issueID: context.state.saleInfo.issueID,
          itemID: context.state.curMethod,
          ballPos: context.state.playMethods[context.state.curMethod].ballPos
        }
      });
      context.commit('bet/getGameLost', res.returnMap.lostInfo);
      return;
    },
    // 获取赔率
    async 'bet/getRate'(context) {
      // 快三 六合彩 不获取赔率
      if (
        service.betType(context.state.gameType) == 'ks' ||
        context.state.gameType == 'HKLHC'
      )
        return;
      let res = await Fetch('/queryGameTypeRate', {
        body: {
          gameType: context.state.gameType,
          proType: context.state.playMethods[context.state.curMethod].typeId,
          itemId: context.state.curMethod
        }
      });
      context.commit('bet/getRate', res.returnMap.rateBean);
      return;
    },

    /**
     * play
     */
    // 切换玩法
    async 'bet/headerCheck'(context, type) {
      console.log(type);
      await context.dispatch('bet/clearPick');
      await context.commit('bet/curMethod', type);
      await context.dispatch('bet/getGameLost');
      await context.dispatch('bet/getRate');
      return;
    },
    // 切换一二级玩法
    async 'bet/headerCheckSecond'(context, { first, second }) {
      console.log(first, second);
      await context.dispatch('bet/clearPick');
      await context.commit('bet/curMethod', first);
      await context.commit('bet/curSecond', second);
      await context.dispatch('bet/getGameLost');
      await context.dispatch('bet/getRate');
      return;
    },
    // 清空选号区
    async 'bet/clearPick'(context) {
      await context.commit('bet/clearPick');
    },
    // 清空投注区方案
    async 'bet/clearPlan'(context, type) {
      await context.commit('bet/clearPlan', type);
    },
    // 点击选号
    async 'bet/handleQuickClick'(context, {i,k}) {
      
      await context.commit('bet/handleQuickClick',{i:i,k:k});
    },
    // 点击选号
    async 'bet/handleBallClick'(context, v) {
      await context.commit('bet/handleBallClick', v);
    },
    // 拖动修改赔率
    async 'bet/handleRateDrag'(context, v) {
      await context.commit('bet/handleRateDrag', v);
    },
    // 机选
    async 'bet/getRandom'(context) {
      await context.dispatch('bet/clearPick');
      // 六合彩需要玩法和二级玩法
      let res = service.randomBallArr(
        context.state.curMethod,
        context.state.playMethods[context.state.curMethod],
        context.state.curSecond
      );
      console.log(res);
      context.state.tempBall.ball = res;
    },
    // 添加到投注区
    async 'bet/addPlan'(context, plan) {
      console.log(plan);
      context.state.planBall.unshift(plan);
    }
  },
  getters: {}
};
