//排列组合公式 m是根据玩法的排列数 n是选球的个数
function Permutation(m, n) {
  var upRow = 1;
  var downRow = 1;
  for (var i = 0; i < m; i++) {
    upRow = upRow * (n - i);
    downRow = downRow * (m - i);
  }
  return upRow / downRow;
}
export default {
  //时时彩
  //五星
  R5ZX1: function() {
    //5星直选复式 注数：5行的球数相乘
    var count = 1;
    for (var i in arguments[0]) {
      count = count * arguments[0][i].length;
    }
    return count;
  },
  R5GX120: function() {
    return Permutation(5, arguments[0][0].length);
  },
  R5GX60: function() {
    var res = 0;
    for (var i in arguments[0][0]) {
      var n = arguments[0][1].length;
      if (arguments[0][1].indexOf(arguments[0][0][i]) >= 0) {
        n = n - 1;
      }
      res += Permutation(3, n);
    }
    return res;
  },
  R5GX30: function() {
    var res = 0;
    for (var i in arguments[0][1]) {
      var n = arguments[0][0].length;
      if (arguments[0][0].indexOf(arguments[0][1][i]) >= 0) {
        n = n - 1;
      }
      res += Permutation(2, n);
    }
    return res;
  },
  R5GX20: function() {
    var res = 0;
    for (var i in arguments[0][0]) {
      var n = arguments[0][1].length;
      if (arguments[0][1].indexOf(arguments[0][0][i]) >= 0) {
        n = n - 1;
      }
      res += Permutation(2, n);
    }
    return res;
  },
  R5GX10: function() {
    var res = 0;
    for (var i in arguments[0][0]) {
      var n = arguments[0][1].length;
      if (arguments[0][1].indexOf(arguments[0][0][i]) >= 0) {
        n = n - 1;
      }
      res += Permutation(1, n);
    }
    return res;
  },
  R5GX5: function() {
    var res = 0;
    for (var i in arguments[0][0]) {
      var n = arguments[0][1].length;
      if (arguments[0][1].indexOf(arguments[0][0][i]) >= 0) {
        n = n - 1;
      }
      res += Permutation(1, n);
    }
    return res;
  },
  //四星
  R4ZX1: function() {
    var count = 1;
    for (var i in arguments[0]) {
      count = count * arguments[0][i].length;
    }
    return count;
  },
  R4GX24: function() {
    return Permutation(4, arguments[0][0].length);
  },
  R4GX12: function() {
    var res = 0;
    for (var i in arguments[0][0]) {
      var n = arguments[0][1].length;
      if (arguments[0][1].indexOf(arguments[0][0][i]) >= 0) {
        n = n - 1;
      }
      res += Permutation(2, n);
    }
    return res;
  },
  R4GX6: function() {
    return Permutation(2, arguments[0][0].length);
  },
  R4GX4: function() {
    var res = 0;
    for (var i in arguments[0][0]) {
      var n = arguments[0][1].length;
      if (arguments[0][1].indexOf(arguments[0][0][i]) >= 0) {
        n = n - 1;
      }
      res += Permutation(1, n);
    }
    return res;
  },
  //三星
  R3ZX1: function() {
    var count = 1;
    for (var i in arguments[0]) {
      count = count * arguments[0][i].length;
    }
    return count;
  },
  R3HZ: function() {
    var arr = new Array(
      1,
      3,
      6,
      10,
      15,
      21,
      28,
      36,
      45,
      55,
      63,
      69,
      73,
      75,
      75,
      73,
      69,
      63,
      55,
      45,
      36,
      28,
      21,
      15,
      10,
      6,
      3,
      1
    );
    var count = 0;
    for (var i = 0; i < arguments[0][0].length; i++) {
      count += arr[Number(arguments[0][0][i])];
    }
    return count;
  },
  R3ZXKD: function() {
    var arr = new Array(10, 54, 96, 126, 144, 150, 144, 126, 96, 54);
    var count = 0;
    for (var i = 0; i < arguments[0][0].length; i++) {
      count += arr[Number(arguments[0][0][i])];
    }
    return count;
  },
  R3GX31: function() {
    return Permutation(2, arguments[0][0].length) * 2;
  },
  R3GX61: function() {
    return Permutation(3, arguments[0][0].length);
  },
  //二星
  R2ZX1: function() {
    var count = 1;
    for (var i in arguments[0]) {
      count = count * arguments[0][i].length;
    }
    return count;
  },
  R2HZ: function() {
    var arr = new Array(
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      9,
      8,
      7,
      6,
      5,
      4,
      3,
      2,
      1
    );
    var count = 0;
    for (var i = 0; i < arguments[0][0].length; i++) {
      count += arr[Number(arguments[0][0][i])];
    }
    return count;
  },
  R2ZXKD: function() {
    var arr = new Array(10, 18, 16, 14, 12, 10, 8, 6, 4, 2);
    var count = 0;
    for (var i = 0; i < arguments[0][0].length; i++) {
      count += arr[Number(arguments[0][0][i])];
    }
    return count;
  },
  R2GX1: function() {
    return Permutation(2, arguments[0][0].length);
  },
  R2GXBD: function() {
    return arguments[0][0].length * 9;
  },
  //定位胆
  DWD5: function() {
    var count = 0;
    for (var i in arguments[0]) {
      count = count + arguments[0][i].length;
    }
    return count;
  },
  //不定位胆-三星
  BDWR3: function() {
    return arguments[0][0].length;
  },
  BDWR32: function() {
    return Permutation(2, arguments[0][0].length);
  },
  //不定位胆-四星
  BDWR4: function() {
    return arguments[0][0].length;
  },
  BDWR42: function() {
    return Permutation(2, arguments[0][0].length);
  },
  //不定位胆-五星
  BDWR52: function() {
    return Permutation(2, arguments[0][0].length);
  },
  BDWR53: function() {
    return Permutation(3, arguments[0][0].length);
  },
  //大小单双
  DXDSR2: function() {
    var count = 1;
    for (var i in arguments[0]) {
      count = count * arguments[0][i].length;
    }
    return count;
  },
  //趣味
  QW1: function() {
    return arguments[0][0].length;
  },
  QW2: function() {
    return arguments[0][0].length;
  },
  QW3: function() {
    return arguments[0][0].length;
  },
  QW4: function() {
    return arguments[0][0].length;
  },
  //十一选五
  //任二
  R21: function() {
    return Permutation(2, arguments[0][0].length);
  },
  //任三
  R31: function() {
    return Permutation(3, arguments[0][0].length);
  },
  //任四
  R41: function() {
    return Permutation(4, arguments[0][0].length);
  },
  //任五
  R51: function() {
    return Permutation(5, arguments[0][0].length);
  },
  //任六
  R61: function() {
    return Permutation(6, arguments[0][0].length);
  },
  //任七
  R71: function() {
    return Permutation(7, arguments[0][0].length);
  },
  //任八
  R81: function() {
    return Permutation(8, arguments[0][0].length);
  },
  //定位胆
  DWD115: function() {
    var count = 0;
    for (var i in arguments[0]) {
      if (arguments[0][i].length == 0) {
        return 0;
      }
      count = count + arguments[0][i].length;
    }
    return count;
  },
  //任二直选
  R2ZX1151: function() {
    var res = 0;
    for (var i in arguments[0][0]) {
      var n = arguments[0][1].length;
      if (arguments[0][1].indexOf(arguments[0][0][i]) >= 0) {
        n = n - 1;
      }
      res += Permutation(1, n);
    }
    return res;
  },
  //任二组选
  R2GX1151: function() {
    return Permutation(2, arguments[0][0].length);
  },
  //任三直选
  R3ZX1151: function() {
    var res = 0;
    var a = arguments[0][0];
    var b = arguments[0][1];
    var c = arguments[0][2];
    for (var i in a) {
      for (var j in b) {
        for (var k in c) {
          if (a[i] != b[j] && b[j] != c[k] && a[i] != c[k]) {
            res += 1;
          }
        }
      }
    }
    return res;
  },
  //任三组选
  R3GX1151: function() {
    return Permutation(3, arguments[0][0].length);
  },
  //低频-3球
  //二星直选
  S2Z1: function() {
    var count = 1;
    for (var i in arguments[0]) {
      count = count * arguments[0][i].length;
    }
    return count;
  },
  //三星直选
  S3Z1: function() {
    var count = 1;
    for (var i in arguments[0]) {
      count = count * arguments[0][i].length;
    }
    return count;
  },
  //三星组选组三
  S3G3: function() {
    return Permutation(2, arguments[0][0].length) * 2;
  },
  //三星组选组六
  S3G6: function() {
    return Permutation(3, arguments[0][0].length);
  },
  //和值
  S3HZ: function() {
    var zhs_ex3xhz = new Array(
      1,
      3,
      6,
      10,
      15,
      21,
      28,
      36,
      45,
      55,
      63,
      69,
      73,
      75,
      75,
      73,
      69,
      63,
      55,
      45,
      36,
      28,
      21,
      15,
      10,
      6,
      3,
      1
    );
    var count = 0;
    for (var i = 0; i < arguments[0][0].length; i++) {
      count += zhs_ex3xhz[Number(arguments[0][0][i])];
    }
    return count;
  },
  //不定位
  BDW3D: function() {
    return arguments[0][0].length;
  },
  //定位胆
  DWD3D: function() {
    var count = 0;
    for (var i in arguments[0]) {
      if (arguments[0][i].length == 0) {
        return 0;
      }
      count = count + arguments[0][i].length;
    }
    return count;
  },
  //PK10
  //冠军
  GJ1: function() {
    return arguments[0][0].length;
  },
  //前二名
  Q21: function() {
    var res = 0;
    for (var i in arguments[0][0]) {
      var n = arguments[0][1].length;
      if (arguments[0][1].indexOf(arguments[0][0][i]) >= 0) {
        n = n - 1;
      }
      res += Permutation(1, n);
    }
    return res;
  },
  //前三名
  Q31: function() {
    var res = 0;
    var a = arguments[0][0];
    var b = arguments[0][1];
    var c = arguments[0][2];
    for (var i in a) {
      for (var j in b) {
        for (var k in c) {
          if (a[i] != b[j] && b[j] != c[k] && a[i] != c[k]) {
            res += 1;
          }
        }
      }
    }
    return res;
  },
  //前五
  DWDQ5: function() {
    var count = 0;
    for (var i in arguments[0]) {
      count = count + arguments[0][i].length;
    }
    return count;
  },
  //后五
  DWDH5: function() {
    var count = 0;
    for (var i in arguments[0]) {
      count = count + arguments[0][i].length;
    }
    return count;
  },
  //大小单双
  DXDS12: function() {
    var count = 1;
    for (var i in arguments[0]) {
      count = count * arguments[0][i].length;
    }
    return count;
  },
  //双色球
  PTSSQ: function() {
    var redN = arguments[0][0].length;
    var count = Permutation(6, redN) * arguments[0][1].length;
    return count;
  },
  //pc28
  PCDXDS: function() {
    return 1;
  },
  // 六合彩
  LHCTM: function() {
    return arguments[0][0].length;
  },
  LHCSB: function() {
    return arguments[0][0].length;
  },
  LHCZM: function() {
    return arguments[0][0].length;
  },
  LHCTTW: function() {
    return arguments[0][0].length;
  },
  LHCZX: function() {
    return arguments[0][0].length;
  },
  LHCTX: function() {
    return arguments[0][0].length;
  },
  LHCQSB: function() {
    return arguments[0][0].length;
  },
  LHCWX: function() {
    return arguments[0][0].length;
  },
  LHCPTYXWS: function() {
    return arguments[0][0].length;
  },
  LHCZONGX: function() {
    return arguments[0][0].length;
  },
  LHCZXBZ: function() {
    if (arguments[0][0].length >= 6) {
      return 1;
    } else {
      return 0;
    }
  },
  LHCDXZM: function() {
    return arguments[0][0].length;
  },
  LHCDXZMT: function() {
    return arguments[0][0].length;
  },
  LHCHX: function() {
    if (arguments[0][0].length >= 2) {
      return 1;
    } else {
      return 0;
    }
  },
  LHCLXLW_0: function() {
    return Permutation(2, arguments[0][0].length);
  },
  LHCLXLW_1: function() {
    return Permutation(3, arguments[0][0].length);
  },
  LHCLXLW_2: function() {
    return Permutation(4, arguments[0][0].length);
  },
  LHCLXLW_3: function() {
    return Permutation(5, arguments[0][0].length);
  },
  LHCLM: function() {
    return 1;
  },
  LHCLM_37: function() {
    return Permutation(4, arguments[0][0].length);
  },
  LHCLM_38: function() {
    return Permutation(3, arguments[0][0].length);
  },
  LHCLM_39: function() {
    return Permutation(3, arguments[0][0].length);
  },
  LHCLM_40: function() {
    return Permutation(2, arguments[0][0].length);
  },
  LHCLM_41: function() {
    return Permutation(2, arguments[0][0].length);
  },
  LHCLM_42: function() {
    return Permutation(2, arguments[0][0].length);
  }
};
