import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import Fetch from './util/fetch';
import { ToastPlugin, LoadingPlugin, AlertPlugin } from 'vux';
import MiniRefreshTools from 'minirefresh';
import 'minirefresh/dist/debug/minirefresh.css';
// import VueAwesomeSwiper from 'vue-awesome-swiper';

require('swiper/dist/css/swiper.css');
require('./assets/style/animate.css');
require('./assets/style/common.less');

Vue.prototype.$http = Fetch;
Vue.prototype.SETTING = SETTING;

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
    Fetch.cbError = e => {
      this.$vux.alert.show({
        title: '警告',
        content: '服务器错误，请联系管理员'
      });
      window.localStorage.clear();
      this.$router.push('/login');
    };
    Fetch.cbTokenOut = () => {
      // this.$vux.alert.show({
      //   title: '警告',
      //   content: 'token过期，请重新登录'
      // });
      window.localStorage.clear();
      this.$router.push('/login');
    };
  }
});
