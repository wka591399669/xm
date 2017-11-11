export default decType => {
  var str = '';
  var index = null;
  var sscBallHZ = [
    0,
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
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18
  ];
  var sscBall = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var S3HZBall = [
    0,
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
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27
  ];
  var syxwBall = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11'
  ];
  var PK10Ball = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var PK10dxds = ['大', '小', '单', '双'];
  var SSQRedBall = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33'
  ];
  var SSQBlueBall = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16'
  ];
  switch (decType) {
    case 'DXDSR2':
      var len = PK10dxds.length;
      var fu = ',';
      for (var i = 0; i < 2; i++) {
        if (i == 1) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += PK10dxds[index] + fu;
      }
      break;
    case 'R5ZX1':
      var len = sscBall.length;
      var fu = ',';
      for (var i = 0; i < 5; i++) {
        if (i == 4) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += sscBall[index] + fu;
      }
      break;
    case 'R5GX120':
      var len = sscBall.length;
      var fu = ' ';
      for (var i = 0; i < 5; i++) {
        if (i == 4) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += sscBall[index] + fu;
        sscBall.splice(index, 1);
        len--;
      }
      break;
    case 'R5GX60':
      var len = sscBall.length;
      var fu = ',';
      for (var i = 0; i < 4; i++) {
        if (i == 1) {
          fu = ' ';
        }
        if (i == 3) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += sscBall[index] + fu;
        sscBall.splice(index, 1);
        len--;
      }
      break;
    case 'R5GX30':
      var len = sscBall.length;
      var fu = ' ';
      for (var i = 0; i < 3; i++) {
        if (i == 1) {
          fu = ',';
        }
        if (i == 2) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += sscBall[index] + fu;
        sscBall.splice(index, 1);
        len--;
      }
      break;
    case 'R5GX20':
      var len = sscBall.length;
      var fu = ',';
      for (var i = 0; i < 3; i++) {
        if (i == 1) {
          fu = ' ';
        }
        if (i == 2) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += sscBall[index] + fu;
        sscBall.splice(index, 1);
        len--;
      }
      break;
    case 'R5GX10':
      var len = sscBall.length;
      var fu = ',';
      for (var i = 0; i < 2; i++) {
        if (i == 1) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += sscBall[index] + fu;
        sscBall.splice(index, 1);
        len--;
      }
      break;
    case 'R5GX5':
      var len = sscBall.length;
      var fu = ',';
      for (var i = 0; i < 2; i++) {
        if (i == 1) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += sscBall[index] + fu;
        sscBall.splice(index, 1);
        len--;
      }
      break;
    case 'R4ZX1':
      var len = sscBall.length;
      var fu = ',';
      for (var i = 0; i < 4; i++) {
        if (i == 3) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += sscBall[index] + fu;
      }
      break;
    case 'R4GX24':
      var len = sscBall.length;
      var fu = ' ';
      for (var i = 0; i < 4; i++) {
        if (i == 3) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += sscBall[index] + fu;
        sscBall.splice(index, 1);
        len--;
      }
      break;
    case 'R4GX12':
      var len = sscBall.length;
      var fu = ',';
      for (var i = 0; i < 3; i++) {
        if (i == 1) {
          fu = ' ';
        }
        if (i == 2) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += sscBall[index] + fu;
        sscBall.splice(index, 1);
        len--;
      }
      break;
    case 'R4GX6':
      var len = sscBall.length;
      var fu = ' ';
      for (var i = 0; i < 2; i++) {
        if (i == 1) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += sscBall[index] + fu;
        sscBall.splice(index, 1);
        len--;
      }
      break;
    case 'R4GX4':
      var len = sscBall.length;
      var fu = ',';
      for (var i = 0; i < 2; i++) {
        if (i == 1) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += sscBall[index] + fu;
        sscBall.splice(index, 1);
        len--;
      }
      break;
    case 'DWD5':
      var len = sscBall.length;
      var fu = ',';
      for (var i = 0; i < 5; i++) {
        if (i == 4) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += sscBall[index] + fu;
      }
      break;
    case 'BDWR32':
      var len = sscBall.length;
      var fu = ' ';
      str = [];
      for (var i = 0; i < 2; i++) {
        if (i == 1) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        // str += sscBall[index] + fu;
        str.push('0,' + sscBall[index]);
        sscBall.splice(index, 1);
        len--;
      }
      break;
    case 'BDWR3':
      var len = sscBall.length;
      var fu = ' ';
      for (var i = 0; i < 1; i++) {
        if (i == 0) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += sscBall[index] + fu;
        sscBall.splice(index, 1);
        len--;
      }
      break;
    case 'BDWR4':
      var len = sscBall.length;
      var fu = ' ';
      for (var i = 0; i < 1; i++) {
        if (i == 0) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += sscBall[index] + fu;
        sscBall.splice(index, 1);
        len--;
      }
      break;
    case 'BDWR42':
      var len = sscBall.length;
      var fu = ' ';
      str = [];
      for (var i = 0; i < 2; i++) {
        if (i == 1) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        // str += sscBall[index] + fu;
        str.push('0,' + sscBall[index]);
        sscBall.splice(index, 1);
        len--;
      }
      break;
    case 'BDWR52':
      var len = sscBall.length;
      var fu = ' ';
      str = [];
      for (var i = 0; i < 2; i++) {
        if (i == 1) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        // str += sscBall[index] + fu;
        str.push('0,' + sscBall[index]);
        sscBall.splice(index, 1);
        len--;
      }
      break;
    case 'BDWR53':
      var len = sscBall.length;
      var fu = ' ';
      str = [];
      for (var i = 0; i < 3; i++) {
        if (i == 2) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        // str += sscBall[index] + fu;
        str.push('0,' + sscBall[index]);
        sscBall.splice(index, 1);
        len--;
      }
      break;
    case 'R3ZX1':
      var len = sscBall.length;
      var fu = ',';
      for (var i = 0; i < 3; i++) {
        if (i == 2) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += sscBall[index] + fu;
      }
      break;
    case 'R3GX31':
      var len = sscBall.length;
      var fu = ' ';
      str = [];
      for (var i = 0; i < 2; i++) {
        if (i == 1) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1 - i));
        var n = sscBall.splice(index, 1)[0];
        // str += n + fu;
        str.push('0,' + n);
      }
      break;
    case 'R2GX1':
      var len = sscBall.length;
      var fu = ' ';
      str = [];
      for (var i = 0; i < 2; i++) {
        if (i == 1) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1 - i));
        var n = sscBall.splice(index, 1)[0];
        // str += n + fu;
        str.push('0,' + n);
      }
      break;
    case 'R3GX61':
      var len = sscBall.length;
      var fu = ' ';
      str = [];
      for (var i = 0; i < 3; i++) {
        if (i == 2) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1 - i));
        var n = sscBall.splice(index, 1)[0];
        // str += n + fu;
        str.push('0,' + n);
      }
      break;
    case 'R2ZX1':
      var len = sscBall.length;
      var fu = ',';
      for (var i = 0; i < 2; i++) {
        if (i == 1) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += sscBall[index] + fu;
      }
      break;
    case 'QW1':
      var len = sscBall.length;
      index = Math.round(Math.random() * (len - 1));
      str += sscBall[index];
      break;
    case 'QW2':
      var len = sscBall.length;
      index = Math.round(Math.random() * (len - 1));
      str += sscBall[index];
      break;
    case 'QW3':
      var len = sscBall.length;
      index = Math.round(Math.random() * (len - 1));
      str += sscBall[index];
      break;
    case 'QW4':
      var len = sscBall.length;
      index = Math.round(Math.random() * (len - 1));
      str += sscBall[index];
      break;
    case 'S3Z1':
      var len = sscBall.length;
      var fu = ',';
      for (var i = 0; i < 3; i++) {
        if (i == 2) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += sscBall[index] + fu;
      }
      break;

    case 'S3HZ':
      var len = S3HZBall.length;
      index = Math.round(Math.random() * (len - 1));
      str += S3HZBall[index];
      break;
    case 'S3G6':
      var len = sscBall.length;
      var fu = ' ';
      str = [];
      for (var i = 0; i < 3; i++) {
        if (i == 2) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1 - i));
        var n = sscBall.splice(index, 1)[0];
        // str += n + fu;
        str.push('0,' + n);
      }
      break;
    case 'S3G3':
      var len = sscBall.length;
      var fu = ' ';
      str = [];
      for (var i = 0; i < 2; i++) {
        if (i == 1) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1 - i));
        var n = sscBall.splice(index, 1)[0];
        // str += n + fu;
        str.push('0,' + n);
      }
      break;
    case 'R21':
      var len = syxwBall.length;
      var fu = ' ';
      for (var i = 0; i < 2; i++) {
        if (i == 1) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1 - i));
        var n = syxwBall.splice(index, 1)[0];
        str += n + fu;
      }
      break;
    case 'R31':
      var len = syxwBall.length;
      var fu = ' ';
      for (var i = 0; i < 3; i++) {
        if (i == 2) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1 - i));
        var n = syxwBall.splice(index, 1)[0];
        str += n + fu;
      }
      break;
    case 'R3HZ':
      var len = S3HZBall.length;
      var fu = '';
      for (var i = 0; i < 1; i++) {
        index = Math.floor(Math.random() * len);
        str += S3HZBall[index];
      }
      break;
    case 'R3ZXKD':
      var len = sscBall.length;
      var fu = '';
      for (var i = 0; i < 1; i++) {
        index = Math.floor(Math.random() * len);
        str += sscBall[index];
      }
      break;
    case 'R2HZ':
      var len = sscBallHZ.length;
      var fu = '';
      for (var i = 0; i < 1; i++) {
        index = Math.floor(Math.random() * len);
        str += sscBallHZ[index];
      }
      break;
    case 'R2ZXKD':
      var len = sscBall.length;
      var fu = '';
      for (var i = 0; i < 1; i++) {
        index = Math.floor(Math.random() * len);
        str += sscBall[index];
      }
      break;
    case 'R2GXBD':
      var len = sscBall.length;
      var fu = '';
      for (var i = 0; i < 1; i++) {
        index = Math.floor(Math.random() * len);
        str += sscBall[index];
      }
      break;
    case 'R41':
      var len = syxwBall.length;
      var fu = ' ';
      for (var i = 0; i < 4; i++) {
        if (i == 3) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1 - i));
        var n = syxwBall.splice(index, 1)[0];
        str += n + fu;
      }
      break;
    case 'R51':
      var len = syxwBall.length;
      var fu = ' ';
      for (var i = 0; i < 5; i++) {
        if (i == 4) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1 - i));
        var n = syxwBall.splice(index, 1)[0];
        str += n + fu;
      }
      break;
    case 'R61':
      var len = syxwBall.length;
      var fu = ' ';
      for (var i = 0; i < 6; i++) {
        if (i == 5) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1 - i));
        var n = syxwBall.splice(index, 1)[0];
        str += n + fu;
      }
      break;
    case 'R71':
      var len = syxwBall.length;
      var fu = ' ';
      for (var i = 0; i < 7; i++) {
        if (i == 6) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1 - i));
        var n = syxwBall.splice(index, 1)[0];
        str += n + fu;
      }
      break;
    case 'R81':
      var len = syxwBall.length;
      var fu = ' ';
      for (var i = 0; i < 8; i++) {
        if (i == 7) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1 - i));
        var n = syxwBall.splice(index, 1)[0];
        str += n + fu;
      }
      break;
    case 'DWD115':
      var len = syxwBall.length;
      var fu = ',';
      for (var i = 0; i < 5; i++) {
        if (i == 4) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += syxwBall[index] + fu;
      }
      break;

    case 'R2ZX1151':
      var len = syxwBall.length;
      var fu = ',';
      for (var i = 0; i < 2; i++) {
        if (i == 1) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1 - i));
        var n = syxwBall.splice(index, 1)[0];
        str += n + fu;
      }
      break;
    case 'R2GX1151':
      var len = syxwBall.length;
      var fu = ' ';
      for (var i = 0; i < 2; i++) {
        if (i == 1) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1 - i));
        var n = syxwBall.splice(index, 1)[0];
        str += n + fu;
      }
      break;
    case 'R3ZX1151':
      var len = syxwBall.length;
      var fu = ',';
      for (var i = 0; i < 3; i++) {
        if (i == 2) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1 - i));
        var n = syxwBall.splice(index, 1)[0];
        str += n + fu;
      }
      break;
    case 'S2Z1':
      var len = sscBall.length;
      for (var i = 0; i < 2; i++) {
        var fu;
        if (i == 0) {
          fu = ',';
        }
        if (i == 1) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += sscBall[index] + fu;
        sscBall.splice(index, 1);
        len--;
      }
      break;
    case 'BDW3D':
      var len = sscBall.length;
      var fu = '';
      index = Math.round(Math.random() * (len - 1));
      str += sscBall[index] + fu;
      break;
    case 'DWD3D':
      var len = sscBall.length;
      var fu = ' ';
      for (var i = 0; i < 3; i++) {
        if (i == 0) {
          fu = ',';
        }
        if (i == 2) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += sscBall[index] + fu;
      }
      break;
    case 'R3GX1151':
      var len = syxwBall.length;
      var fu = ' ';
      for (var i = 0; i < 3; i++) {
        if (i == 2) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1 - i));
        var n = syxwBall.splice(index, 1)[0];
        str += n + fu;
      }
      break;
    case 'GJ1':
      var len = PK10Ball.length;
      index = Math.round(Math.random() * (len - 1));
      str += PK10Ball[index];
      break;
    case 'Q21':
      var len = PK10Ball.length;
      var fu = ',';
      for (var i = 0; i < 2; i++) {
        if (i == 1) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1 - i));
        var n = PK10Ball.splice(index, 1)[0];
        str += n + fu;
      }
      break;
    case 'Q31':
      var len = PK10Ball.length;
      var fu = ',';
      for (var i = 0; i < 3; i++) {
        if (i == 2) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1 - i));
        var n = PK10Ball.splice(index, 1)[0];
        str += n + fu;
      }
      break;
    case 'DWDQ5':
      var len = PK10Ball.length;
      var fu = ',';
      for (var i = 0; i < 5; i++) {
        if (i == 4) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += PK10Ball[index] + fu;
      }
      break;
    case 'DWDH5':
      var len = PK10Ball.length;
      var fu = ',';
      for (var i = 0; i < 5; i++) {
        if (i == 4) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += PK10Ball[index] + fu;
      }
      break;
    case 'DXDS12':
      var len = PK10dxds.length;
      var fu = ',';
      for (var i = 0; i < 2; i++) {
        if (i == 1) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1));
        str += PK10dxds[index] + fu;
      }
      break;
    case 'PTSSQ':
      var len = SSQRedBall.length;
      var fu = ' ';
      str = [];
      for (var i = 0; i < 6; i++) {
        if (i == 5) {
          fu = '';
        }
        index = Math.round(Math.random() * (len - 1 - i));
        var n = SSQRedBall.splice(index, 1)[0];
        // str += n + fu;
        str.push('0,' + n);
      }
      // str += ',';
      index = Math.round(Math.random() * (PK10Ball.length - 1));
      // str += SSQBlueBall[index];
      str.push('1,' + SSQBlueBall[index]);
      break;
    //ks
    case 'K3HZ':
      str = [];
      // str = Math.round(Math.random() * 15);
      str.push('0,' + Math.round(Math.random() * 15 + 3));
      break;
    case 'K3DXDS':
      var len = PK10dxds.length;
      var index = Math.round(Math.random() * (len - 1));
      str += PK10dxds[index];
      break;
    case 'K3STHTX':
      str = '三同号通选';
      break;
    case 'K3STHDX':
      var i = Math.round(Math.random() * 5 + 1);
      str = i + '' + i + '' + i;
      break;
    case 'K3SBTH':
      var i = Math.round(Math.random() * 3 + 1);
      str = i + '' + (i + 1) + '' + (i + 2);
      break;
    case 'K3SLHTX':
      str = '三连号通选';
      break;
    case 'K3ETHFX':
      var i = Math.round(Math.random() * 5 + 1);
      str = i + '' + i + '*';
      break;
    case 'K3ETHDX':
      var i = Math.round(Math.random() * 4 + 1);
      str = i + '' + i + '' + (i + 1);
      break;
    case 'K3EBTH':
      var i = Math.round(Math.random() * 4 + 1);
      str = i + '' + (i + 1);
      break;
  }
  return str;
};
