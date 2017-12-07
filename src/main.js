import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import Fetch from './util/fetch';
import { ToastPlugin, LoadingPlugin, AlertPlugin } from 'vux';
import MiniRefreshTools from 'minirefresh';
import 'minirefresh/dist/debug/minirefresh.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';

import DataTime from './util/dataTime';

require('swiper/dist/css/swiper.css');
require('./assets/style/animate.css');
require('./assets/style/common.less');

Vue.prototype.$http = Fetch;
Vue.prototype.SETTING = SETTING;
Vue.prototype.DataTime = DataTime;

// 连接网易云
let connectNim = () => {
  window.nim = NIM.getInstance({
    appKey: SETTING.wyKey,
    account: window.localStorage.getItem('thirdAccId'),
    token: window.localStorage.getItem('thirdToken'),
    db: false,
    syncSessionUnread: true,
    syncRobots: true,
    autoMarkRead: true,
    onconnect: () => {
      console.log('连接网易云信成功');
    },
    ondisconnect: err => {
      console.log(err);
    }
  });
};
Vue.prototype.connectNim = connectNim;

if (window.localStorage.getItem('thirdAccId')) {
  connectNim();
}

const betList = {
  ssc: ['CQSSC', 'ZKSSC', 'ZK1FC', 'ZKHGC', 'ZK3FC'],
  xyrb: ['BJ28', 'JND28'],
  PK10: ['PK10'],
  lhc: ['HKLHC'],
  ks: ['JSK3', 'SHK3'],
  three: ['PL3'],
  ssq: ['SSQ']
};

Vue.prototype.betType = name => {
  for (let i in betList) {
    if (betList[i].indexOf(name) >= 0) {
      return i;
    }
  }
};

Vue.prototype.nim = null;

Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
Vue.use(AlertPlugin);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created() {
    //
    // console.log(Chatroom.getInstance);
    // this.nim = Chatroom.getInstance({
    //   appKey: window.localStorage.getItem('thirdAccId'),
    //   account: window.localStorage.getItem('thirdUserName'),
    //   token: window.localStorage.getItem('thirdToken'),
    //   onconnect: () => {
    //     console.log(123);
    //   }
    // });

    // 处理错误请求
    Fetch.cbError = e => {
      this.$vux.toast.text('服务器开小差了，请刷新页面试试？', 'bottom');
    };
    Fetch.cbTokenOut = e => {
      this.$vux.toast.text(e.returnMessage, 'bottom');
      window.localStorage.clear();
      this.$router.push('/login');
    };
  }
});
