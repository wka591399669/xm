import randomBall from './randomBall';
import stake from './stake';
const betList = {
  ssc: ['CQSSC', 'ZKSSC', 'ZK1FC', 'ZKHGC', 'ZK3FC'],
  xyrb: ['BJ28', 'JND28'],
  PK10: ['PK10'],
  lhc: ['HKLHC'],
  ks: ['JSK3', 'SHK3'],
  three: ['PL3'],
  ssq: ['SSQ']
};
const sxarr = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
const lhcBallPos = {
  LHCTM: {
    LHCTMXM: {
      ballPos: '7'
    },
    LHCTM0: {
      ballPos: '7',
      ball: '0'
    },
    LHCTM1: {
      ballPos: '7',
      ball: '1'
    },
    LHCTM2: {
      ballPos: '7',
      ball: '2'
    },
    LHCTM3: {
      ballPos: '7',
      ball: '3'
    },
    LHCTM4: {
      ballPos: '7',
      ball: '4'
    },
    LHCTM5: {
      ballPos: '7',
      ball: '5'
    },
    LHCTM6: {
      ballPos: '7',
      ball: '6'
    },
    LHCTM7: {
      ballPos: '7',
      ball: '7'
    },
    LHCTM8: {
      ballPos: '7',
      ball: '8'
    },
    LHCTM9: {
      ballPos: '7',
      ball: '9'
    },
    LHCTM10: {
      ballPos: '7',
      ball: '10'
    },
    LHCTM11: {
      ballPos: '7',
      ball: '11'
    },
    LHCTM12: {
      ballPos: '7',
      ball: '12'
    },
    LHCTM13: {
      ballPos: '7',
      ball: '13'
    }
  },
  LHCZM: {
    LHCZMXM: {
      ballPos: '1,2,3,4,5,6'
    },
    LHCZM8: {
      ballPos: '1,2,3,4,5,6',
      ball: '8'
    },
    LHCZM9: {
      ballPos: '1,2,3,4,5,6',
      ball: '9'
    },
    LHCZM6: {
      ballPos: '1,2,3,4,5,6',
      ball: '6'
    },
    LHCZM7: {
      ballPos: '1,2,3,4,5,6',
      ball: '7'
    }
  },
  LHCSB: {
    LHCSB0: {
      ballPos: '7',
      ball: 0
    },
    LHCSB1: {
      ballPos: '7',
      ball: 1
    },
    LHCSB2: {
      ballPos: '7',
      ball: 2
    },
    LHCSB3: {
      ballPos: '7',
      ball: 3
    },
    LHCSB4: {
      ballPos: '7',
      ball: 4
    },
    LHCSB5: {
      ballPos: '7',
      ball: 5
    },
    LHCSB6: {
      ballPos: '7',
      ball: 6
    },
    LHCSB7: {
      ballPos: '7',
      ball: 7
    },
    LHCSB8: {
      ballPos: '7',
      ball: 8
    },
    LHCSB9: {
      ballPos: '7',
      ball: 9
    },
    LHCSB10: {
      ballPos: '7',
      ball: 10
    },
    LHCSB11: {
      ballPos: '7',
      ball: 11
    },
    LHCSB12: {
      ballPos: '7',
      ball: 12
    },
    LHCSB13: {
      ballPos: '7',
      ball: 13
    },
    LHCSB14: {
      ballPos: '7',
      ball: 14
    },
    LHCSB15: {
      ballPos: '7',
      ball: 15
    },
    LHCSB16: {
      ballPos: '7',
      ball: 16
    },
    LHCSB17: {
      ballPos: '7',
      ball: 17
    },
    LHCSB18: {
      ballPos: '7',
      ball: 18
    },
    LHCSB19: {
      ballPos: '7',
      ball: 19
    },
    LHCSB20: {
      ballPos: '7',
      ball: 20
    },
    LHCSB21: {
      ballPos: '7',
      ball: 21
    },
    LHCSB22: {
      ballPos: '7',
      ball: 22
    },
    LHCSB23: {
      ballPos: '7',
      ball: 23
    },
    LHCSB24: {
      ballPos: '7',
      ball: 24
    },
    LHCSB25: {
      ballPos: '7',
      ball: 25
    },
    LHCSB26: {
      ballPos: '7',
      ball: 26
    }
  },
  LHCTTW: {
    LHCTTW0: {
      ballPos: '7',
      ball: 0
    },
    LHCTTW1: {
      ballPos: '7',
      ball: 1
    },
    LHCTTW2: {
      ballPos: '7',
      ball: 2
    },
    LHCTTW3: {
      ballPos: '7',
      ball: 3
    },
    LHCTTW4: {
      ballPos: '7',
      ball: 4
    },
    LHCTTW5: {
      ballPos: '7',
      ball: 5
    },
    LHCTTW6: {
      ballPos: '7',
      ball: 6
    },
    LHCTTW7: {
      ballPos: '7',
      ball: 7
    },
    LHCTTW8: {
      ballPos: '7',
      ball: 8
    },
    LHCTTW9: {
      ballPos: '7',
      ball: 9
    },
    LHCTTW10: {
      ballPos: '7',
      ball: 10
    },
    LHCTTW11: {
      ballPos: '7',
      ball: 11
    },
    LHCTTW12: {
      ballPos: '7',
      ball: 12
    },
    LHCTTW13: {
      ballPos: '7',
      ball: 13
    },
    LHCTTW14: {
      ballPos: '7',
      ball: 14
    }
  },
  LHCZX: {
    LHCZX0: {
      ballPos: '1,2,3,4,5,6',
      ball: 0
    },
    LHCZX1: {
      ballPos: '1,2,3,4,5,6',
      ball: 1
    },
    LHCZX2: {
      ballPos: '1,2,3,4,5,6',
      ball: 2
    },
    LHCZX3: {
      ballPos: '1,2,3,4,5,6',
      ball: 3
    },
    LHCZX4: {
      ballPos: '1,2,3,4,5,6',
      ball: 4
    },
    LHCZX5: {
      ballPos: '1,2,3,4,5,6',
      ball: 5
    },
    LHCZX6: {
      ballPos: '1,2,3,4,5,6',
      ball: 6
    },
    LHCZX7: {
      ballPos: '1,2,3,4,5,6',
      ball: 7
    },
    LHCZX8: {
      ballPos: '1,2,3,4,5,6',
      ball: 8
    },
    LHCZX9: {
      ballPos: '1,2,3,4,5,6',
      ball: 9
    },
    LHCZX10: {
      ballPos: '1,2,3,4,5,6',
      ball: 10
    },
    LHCZX11: {
      ballPos: '1,2,3,4,5,6',
      ball: 11
    }
  },
  LHCTX: {
    LHCTX0: {
      ballPos: '7',
      ball: 0
    },
    LHCTX1: {
      ballPos: '7',
      ball: 1
    },
    LHCTX2: {
      ballPos: '7',
      ball: 2
    },
    LHCTX3: {
      ballPos: '7',
      ball: 3
    },
    LHCTX4: {
      ballPos: '7',
      ball: 4
    },
    LHCTX5: {
      ballPos: '7',
      ball: 5
    },
    LHCTX6: {
      ballPos: '7',
      ball: 6
    },
    LHCTX7: {
      ballPos: '7',
      ball: 7
    },
    LHCTX8: {
      ballPos: '7',
      ball: 8
    },
    LHCTX9: {
      ballPos: '7',
      ball: 9
    },
    LHCTX10: {
      ballPos: '7',
      ball: 10
    },
    LHCTX11: {
      ballPos: '7',
      ball: 11
    }
  },
  LHCWX: {
    LHCWX0: {
      ballPos: '7',
      ball: 0
    },
    LHCWX1: {
      ballPos: '7',
      ball: 1
    },
    LHCWX2: {
      ballPos: '7',
      ball: 2
    },
    LHCWX3: {
      ballPos: '7',
      ball: 3
    },
    LHCWX4: {
      ballPos: '7',
      ball: 4
    }
  },
  LHCPTYXWS: {
    LHCPTYXWS0: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 0
    },
    LHCPTYXWS1: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 1
    },
    LHCPTYXWS2: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 2
    },
    LHCPTYXWS3: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 3
    },
    LHCPTYXWS4: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 4
    },
    LHCPTYXWS5: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 5
    },
    LHCPTYXWS6: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 6
    },
    LHCPTYXWS7: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 7
    },
    LHCPTYXWS8: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 8
    },
    LHCPTYXWS9: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 9
    },
    LHCPTYXWS10: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 10
    },
    LHCPTYXWS11: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 11
    },
    LHCPTYXWS12: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 12
    },
    LHCPTYXWS13: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 13
    },
    LHCPTYXWS14: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 14
    },
    LHCPTYXWS15: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 15
    },
    LHCPTYXWS16: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 16
    },
    LHCPTYXWS17: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 17
    },
    LHCPTYXWS18: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 18
    },
    LHCPTYXWS19: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 19
    },
    LHCPTYXWS20: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 20
    },
    LHCPTYXWS21: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 21
    }
  },
  LHCQSB: {
    LHCQSB0: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 0
    },
    LHCQSB1: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 1
    },
    LHCQSB2: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 2
    },
    LHCQSB3: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 3
    }
  },
  LHCZONGX: {
    LHCZONGX0: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 0
    },
    LHCZONGX1: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 1
    },
    LHCZONGX2: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 2
    },
    LHCZONGX3: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 3
    },
    LHCZONGX4: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 4
    },
    LHCZONGX5: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 5
    },
    LHCZONGX6: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 6
    },
    LHCZONGX7: {
      ballPos: '1,2,3,4,5,6,7',
      ball: 7
    }
  },
  LHCLM: {
    LHCLM0: {
      ballPos: '1,2,3,4,5,6'
    },
    LHCLM1: {
      ballPos: '1,2,3,4,5,6'
    },
    LHCLM2: {
      ballPos: '1,2,3,4,5,6'
    },
    LHCLM3: {
      ballPos: '1,2,3,4,5,6'
    },
    LHCLM4: {
      ballPos: '1,2,3,4,5,6,7'
    },
    LHCLM5: {
      ballPos: '1,2,3,4,5,6,7'
    }
  },
  LHCLXLW: {
    LHCLXLW0: {
      ballPos: '1,2,3,4,5,6,7'
    },
    LHCLXLW1: {
      ballPos: '1,2,3,4,5,6,7'
    },
    LHCLXLW2: {
      ballPos: '1,2,3,4,5,6,7'
    },
    LHCLXLW3: {
      ballPos: '1,2,3,4,5,6,7'
    },
    LHCLXLW4: {
      ballPos: '1,2,3,4,5,6,7'
    },
    LHCLXLW5: {
      ballPos: '1,2,3,4,5,6,7'
    },
    LHCLXLW6: {
      ballPos: '1,2,3,4,5,6,7'
    },
    LHCLXLW7: {
      ballPos: '1,2,3,4,5,6,7'
    }
  },
  LHCZXBZ: {
    LHCZXBZ0: {
      ballPos: '1,2,3,4,5,6,7'
    }
  },
  LHCDXZM: {
    LHCDXZM0: {
      ball: 0
    },
    LHCDXZM1: {
      ball: 1
    },
    LHCDXZM2: {
      ball: 2
    },
    LHCDXZM3: {
      ball: 3
    },
    LHCDXZM4: {
      ball: 4
    },
    LHCDXZM5: {
      ball: 5
    },
    LHCDXZM6: {
      ball: 6
    },
    LHCDXZM7: {
      ball: 7
    },
    LHCDXZM8: {
      ball: 8
    },
    LHCDXZM9: {
      ball: 9
    },
    LHCDXZM10: {
      ball: 10
    },
    LHCDXZM11: {
      ball: 11
    },
    LHCDXZM12: {
      ball: 12
    },
    LHCDXZM13: {
      ball: 13
    },
    LHCDXZM14: {
      ball: 14
    },
    LHCDXZM15: {
      ball: 15
    },
    LHCDXZM16: {
      ball: 16
    }
  },
  LHCDXZMT: {
    LHCDXZMTXM: {}
  },
  LHCHX: {
    LHCHXZL: {
      ballPos: 7
    }
  }
};
export default {
  // 获取彩种类别
  betType(name) {
    for (let i in betList) {
      if (betList[i].indexOf(name) >= 0) {
        return i;
      }
    }
  },
  filterMethod(data, fdata) {
    // 屏蔽fdata里的玩法
    var closeType = [];
    let newData = {};
    for (var i in fdata) {
      for (var j in fdata[i].itemInfo) {
        closeType.push(fdata[i].itemInfo[j].ItemID);
      }
    }
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].detailType.length; j++) {
        for (var k = 0; k < data[i].detailType[j].type.length; k++) {
          if (closeType.indexOf(data[i].detailType[j].type[k].typeDetId) > -1) {
            data[i].detailType[j].type.splice(k--, 1);
          } else {
            // 排除手动输入
            if (data[i].detailType[j].type[k].ballType !== 1) {
              data[i].detailType[j].type[k].fname = data[i].name;
              newData[data[i].detailType[j].type[k].typeDetId] =
                data[i].detailType[j].type[k];
            }
          }
        }
        if (data[i].detailType[j].type.length == 0) {
          data[i].detailType.splice(j--, 1);
        }
      }
      if (data[i].detailType.length == 0) {
        data.splice(i--, 1);
      }
    }

    return newData;
  },
  // 合并六合彩里唯一赔率的号码
  mergeLhcMethod(playMethods) {
    // console.log(playMethods);
    playMethods.map(x => {
      // console.log(x);
      // 特码
      if (
        [
          'LHCDXZMT',
          'LHCTM',
          'LHCZM',
          'LHCZXBZ',
          'LHCLM',
          'LHCLXLW',
          'LHCHX'
        ].indexOf(x.proType) >= 0
      ) {
        // console.log(x);
        // 选码
        x.childProTypeList.map(y => {
          if (
            [
              '选码',
              '四全中',
              '三中二',
              '三全中',
              '二全中',
              '二中特',
              '特串',
              '正码一',
              '正码二',
              '正码三',
              '正码四',
              '正码五',
              '正码六',
              '自选不中'
            ].indexOf(y.proTypeName) >= 0
          ) {
            let temp = {
              itemID: y.itemInfoList[0].itemID,
              rate: y.itemInfoList[0].rate
            };
            y.itemInfoList = [];
            for (var i = 1; i <= 49; i++) {
              y.itemInfoList.push({
                itemName: i,
                itemID: temp.itemID,
                rate: temp.rate
              });
            }
          }
          if (['二连肖', '三连肖', '四连肖', '五连肖', '合肖'].indexOf(y.proTypeName) >= 0) {
            let temp = {
              itemID: y.itemInfoList[0].itemID,
              rate: y.itemInfoList[0].rate
            };
            y.itemInfoList = [];

            for (var i = 0; i < sxarr.length; i++) {
              y.itemInfoList.push({
                itemName: sxarr[i],
                itemID: temp.itemID,
                rate: temp.rate
              });
            }
          }
          if (['二连尾', '三连尾', '四连尾', '五连尾'].indexOf(y.proTypeName) >= 0) {
            let temp = {
              itemID: y.itemInfoList[0].itemID,
              rate: y.itemInfoList[0].rate
            };
            y.itemInfoList = [];

            for (var i = 0; i <= 9; i++) {
              y.itemInfoList.push({
                itemName: i + '尾',
                itemID: temp.itemID,
                rate: temp.rate
              });
            }
          }
        });
      }
    });
    return playMethods;
  },
  //时间转化秒
  formatSeconds(seconds) {
    if (seconds <= 0) {
      return [0, 0, 0, 0];
    }
    var theTime = parseInt(seconds); // 秒
    var theTime1 = 0; // 分
    var theTime2 = 0; // 小时
    var theTime3 = 0; // 天
    if (theTime >= 60) {
      theTime1 = parseInt(theTime / 60);
      theTime = parseInt(theTime % 60);
      // alert(theTime1+"-"+theTime);
      if (theTime1 >= 60) {
        theTime2 = parseInt(theTime1 / 60);
        theTime1 = parseInt(theTime1 % 60);
        if (theTime2 >= 24) {
          theTime3 = parseInt(theTime2 / 24);
          theTime2 = parseInt(theTime2 % 24);
        }
      }
    }
    theTime < 10 ? (theTime = '0' + theTime) : (theTime = '' + theTime);
    theTime1 < 10 ? (theTime1 = '0' + theTime1) : (theTime1 = '' + theTime1);
    theTime2 < 10 ? (theTime2 = '0' + theTime2) : (theTime2 = '' + theTime2);
    //时，分，秒
    var result = [theTime2, theTime1, theTime, theTime3];
    return result;
  },
  // 机选
  randomBallArr(decType) {
    console.log(decType);
    let res = randomBall(decType);
    if (res instanceof Array) {
      return res;
    } else {
      return res.split(',').map((x, i) => {
        return `${i},${x}`;
      });
    }
  },
  // 计算注数
  countStake(type, arr, row, lhcTS) {
    console.log(type, arr, row, lhcTS);
    let req = [];
    for (let i = 0; i < row; i++) {
      req.push([]);
    }
    arr.map(x => {
      req[x.split(',')[0]].push(x.split(',')[1]);
    });
    // 六合彩有几个特殊计算
    if (type == 'LHCLXLW') {
      if (lhcTS == '二连肖' || lhcTS == '二连尾') {
        return stake['LHCLXLW_0'](req);
      }
      if (lhcTS == '三连肖' || lhcTS == '三连尾') {
        return stake['LHCLXLW_1'](req);
      }
      if (lhcTS == '四连肖' || lhcTS == '四连尾') {
        return stake['LHCLXLW_2'](req);
      }
      if (lhcTS == '五连肖' || lhcTS == '五连尾') {
        return stake['LHCLXLW_3'](req);
      }
    }
    if (type == 'LHCLM') {
      if (lhcTS == '四全中') {
        return stake['LHCLM_37'](req);
      }
    }
    if (type == 'LHCLM') {
      if (lhcTS == '三中二') {
        return stake['LHCLM_38'](req);
      }
    }
    if (type == 'LHCLM') {
      if (lhcTS == '三全中') {
        return stake['LHCLM_39'](req);
      }
    }
    if (type == 'LHCLM') {
      if (lhcTS == '二全中') {
        return stake['LHCLM_40'](req);
      }
    }
    if (type == 'LHCLM') {
      if (lhcTS == '二中特') {
        return stake['LHCLM_41'](req);
      }
    }
    if (type == 'LHCLM') {
      if (lhcTS == '特串') {
        return stake['LHCLM_42'](req);
      }
    }
    return stake[type](req);
  },
  // 生成下单数据
  batchOrderFormat(plans, gameType) {
    console.log(plans, gameType);
    let res = '';
    return plans
      .map(x => {
        let i = '';
        // 玩法_玩法_玩法细则_选球位置
        i = `${x.playMethod.typeId}_${x.playMethod.typeDetId}_${x.playMethod
          .ballPos}`;
        if (this.betType(gameType) == 'xyrb') {
          i = `${x.ball[0].split(',')[0]}_${x.ball[0].split(',')[0]}_0`;
          console.log(i);
        }
        // @每个位置上的球号@
        i += `@${this.ballArrToSting(
          x.ball,
          gameType,
          x.playMethod.typeDetId
        )}@`;
        // 总注数_方案单注金额
        if (this.betType(gameType) == 'ks') {
          i += `${x.stake}_${x.planMoney}`;
        } else {
          i += `${x.stake}_${x.aloneMoney}`;
        }
        //_赔率_反点 快三和28没有
        let rateke = `_${x.rate}_${x.rake}`;
        if (
          this.betType(gameType) == 'ks' ||
          this.betType(gameType) == 'xyrb'
        ) {
          rateke = '';
        }
        i += rateke;
        return i;
      })
      .join('!');
  },
  // 生成下单数据的球号str
  ballArrToSting(arr, gameType, typeDetId) {
    console.log(arr);
    // let sscHasD = ['R3ZXKD', 'R3HZ', 'R2ZXKD', 'R2HZ'];
    let res = [];
    arr.map(x => {
      if (!res[x.split(',')[0]]) {
        res[x.split(',')[0]] = [];
      }
      let ball = x.split(',')[1];
      // 大小单双
      if (ball == '大') {
        ball = '2';
      }
      if (ball == '小') {
        ball = '1';
      }
      if (ball == '单') {
        ball = '3';
      }
      if (ball == '双') {
        ball = '4';
      }
      if (typeDetId == 'K3STHTX' || typeDetId == 'K3SLHTX') {
        ball = '0';
      }
      if (
        typeDetId == 'K3STHDX' ||
        typeDetId == 'K3SBTH' ||
        typeDetId == 'K3ETHDX' ||
        typeDetId == 'K3EBTH'
      ) {
        ball = ball.split('').join(',');
      }
      if (typeDetId == 'K3ETHFX') {
        ball = ball
          .split('*')[0]
          .split('')
          .join(',');
      }
      res[x.split(',')[0]].push(ball);
    });
    // 号码分割符
    let seq = '';
    if (gameType == 'PK10' && typeDetId !== 'DXDS12') {
      seq = ' ';
    }
    if (gameType == 'SSQ') {
      seq = ' ';
    }
    if (typeDetId == 'S3HZ') {
      seq = ',';
    }
    // 28
    if (this.betType(gameType) == 'xyrb') {
      return arr[0].split(',')[1];
    }
    return res.map(x => x.join(seq)).join(',');
  },

  // 生成六合彩下单数据
  batchOrderFormatLhc(plans, gameType) {
    // console.log(gameType);
    // console.log(plans);
    return plans
      .map(x => {
        console.log(x.playMethod, x);
        let ballPos = '';
        ballPos =
          lhcBallPos[x.playMethod.proType][x.ball[0].split(',')[2]].ballPos;
        let ball =
          lhcBallPos[x.playMethod.proType][x.ball[0].split(',')[2]].ball;
        console.log(ball);
        if (!ball && ball != 0) {
          // 自选不中
          if (
            x.playMethod.proType == 'LHCZXBZ' ||
            x.playMethod.proType == 'LHCLM'
          ) {
            ball = x.ball
              .map(
                y =>
                  Number(y.split(',')[1]) < 10
                    ? '0' + Number(y.split(',')[1])
                    : y.split(',')[1]
              )
              .join(',');
          } else if (x.playMethod.proType == 'LHCHX') {
            ball = x.ball.map(y => sxarr.indexOf(y.split(',')[1])).join(',');
          } else if (x.playMethod.proType == 'LHCLXLW') {
            // 连肖连尾
            ball = x.ball.map(y => {
              // 连肖
              if (sxarr.indexOf(y.split(',')[1]) >= 0) {
                return sxarr.indexOf(y.split(',')[1]);
              } else {
                // 连尾
                // return Number(y.split(',')[1].split('')[0]) < 10
                //   ? '0' + y.split(',')[1].split('')[0]
                //   : y.split(',')[1].split('')[0];
                return y.split(',')[1].split('')[0];
              }
            });
          } else {
            ball =
              Number(x.ball[0].split(',')[1]) < 10
                ? '0' + Number(x.ball[0].split(',')[1])
                : Number(x.ball[0].split(',')[1]);
          }
        }
        if (!ballPos) {
          if (x.curSecond == '正码一') {
            ballPos = 1;
          }
          if (x.curSecond == '正码二') {
            ballPos = 2;
          }
          if (x.curSecond == '正码三') {
            ballPos = 3;
          }
          if (x.curSecond == '正码四') {
            ballPos = 4;
          }
          if (x.curSecond == '正码五') {
            ballPos = 5;
          }
          if (x.curSecond == '正码六') {
            ballPos = 6;
          }
        }
        // 玩法_玩法_玩法细则_选球位置
        let i = `${x.playMethod.proType}_${x.ball[0].split(',')[2]}_${ballPos}`;
        // @每个位置上的球号
        i += `@${ball}@`;
        // 总注数_方案单注金额
        if (
          x.playMethod.proType == 'LHCLXLW' ||
          x.playMethod.proType == 'LHCLM'
        ) {
          i += `${x.stake}_${x.aloneMoney}`;
        } else {
          i += `${x.stake}_${x.planMoney}`;
        }
        //_赔率_反点 快三和28 六合彩没有
        i += `_0_0`;
        return i;
      })
      .join('!');
  }
};
