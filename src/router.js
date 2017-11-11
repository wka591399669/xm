import Vue from 'vue';
import Router from 'vue-router';

const Home = r =>
  require.ensure([], () => r(require('./page/Home/Home.vue')), 'home');
const LotteryRes = r =>
  require.ensure(
    [],
    () => r(require('./page/LotteryRes/LotteryRes.vue')),
    'LotteryRes'
  );
const LotteryResCon = r =>
  require.ensure(
    [],
    () => r(require('./page/LotteryRes/LotteryResCon.vue')),
    'LotteryResCon'
  );
const NotFound = r =>
  require.ensure(
    [],
    () => r(require('./page/NotFound/NotFound.vue')),
    'NotFound'
  );
const User = r =>
  require.ensure([], () => r(require('./page/User/User.vue')), 'User');
const Help = r =>
  require.ensure([], () => r(require('./page/Help/Help.vue')), 'Help');
const HelpCon = r =>
  require.ensure([], () => r(require('./page/Help/HelpCon.vue')), 'HelpCon');
const Join = r =>
  require.ensure([], () => r(require('./page/Join/Join.vue')), 'Join');
const Recharge = r =>
  require.ensure(
    [],
    () => r(require('./page/Recharge/Recharge.vue')),
    'Recharge'
  );

const Login = r =>
  require.ensure([], () => r(require('./page/Login/Login.vue')), 'Login');

const Message = r =>
  require.ensure([], () => r(require('./page/Message/Message.vue')), 'Message');

const MessageCon = r =>
  require.ensure(
    [],
    () => r(require('./page/Message/MessageCon.vue')),
    'MessageCon'
  );

const Activity = r =>
  require.ensure(
    [],
    () => r(require('./page/Activity/Activity.vue')),
    'Activity'
  );
const ActivityCon1 = r =>
  require.ensure(
    [],
    () => r(require('./page/Activity/ActivityCon1.vue')),
    'ActivityCon1'
  );
const ActivityCon5 = r =>
  require.ensure(
    [],
    () => r(require('./page/Activity/ActivityCon5.vue')),
    'ActivityCon5'
  );

const Service = r =>
  require.ensure([], () => r(require('./page/Service/Service.vue')), 'Service');

const Withdraw = r =>
  require.ensure(
    [],
    () => r(require('./page/Withdraw/Withdraw.vue')),
    'Withdraw'
  );

const Integral = r =>
  require.ensure(
    [],
    () => r(require('./page/Integral/Integral.vue')),
    'Integral'
  );

const Setting = r =>
  require.ensure([], () => r(require('./page/Setting/Setting.vue')), 'Setting');
const Bet = r =>
  require.ensure([], () => r(require('./page/Bet/Bet.vue')), 'Bet');
const BetKs = r =>
  require.ensure([], () => r(require('./page/Bet/BetKs.vue')), 'BetKs');
const Bet28 = r =>
  require.ensure([], () => r(require('./page/Bet/Bet28.vue')), 'Bet28');
const BetLhc = r =>
  require.ensure([], () => r(require('./page/Bet/BetLhc.vue')), 'BetLhc');
const BetHall = r =>
  require.ensure([], () => r(require('./page/BetHall/BetHall.vue')), 'BetHall');
const Info = r =>
  require.ensure([], () => r(require('./page/Info/Info.vue')), 'Info');
const OrderDetail = r =>
  require.ensure(
    [],
    () => r(require('./page/OrderDetail/OrderDetail.vue')),
    'OrderDetail'
  );
const BetRecord = r =>
  require.ensure(
    [],
    () => r(require('./page/BetRecord/BetRecord.vue')),
    'BetRecord'
  );
const MoneyRecord = r =>
  require.ensure(
    [],
    () => r(require('./page/MoneyRecord/MoneyRecord.vue')),
    'MoneyRecord'
  );

const BackWater = r =>
  require.ensure(
    [],
    () => r(require('./page/BackWater/BackWater.vue')),
    'BackWater'
  );
const Password = r =>
  require.ensure(
    [],
    () => r(require('./page/Password/Password.vue')),
    'Password'
  );
const MoneyPassword = r =>
  require.ensure(
    [],
    () => r(require('./page/Password/MoneyPassword.vue')),
    'MoneyPassword'
  );

Vue.use(Router);

export default new Router({
  mode: 'hash',
  // 这方法会在动画动作前触发，想个办法解决!
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/join',
      name: 'Join',
      component: Join
    },
    {
      path: '/moneyRecord',
      name: 'MoneyRecord',
      component: MoneyRecord,
      beforeEnter: (to, from, next) => {
        verifyLogin(next);
      }
    },
    {
      path: '/betRecord',
      name: 'BetRecord',
      component: BetRecord,
      beforeEnter: (to, from, next) => {
        verifyLogin(next);
      }
    },
    {
      path: '/OrderDetail/:id',
      name: 'OrderDetail',
      component: OrderDetail,
      beforeEnter: (to, from, next) => {
        verifyLogin(next);
      }
    },
    {
      path: '/bet/:type/:gameType',
      name: 'Bet',
      component: Bet,
      beforeEnter: (to, from, next) => {
        verifyLogin(next);
      }
    },
    {
      path: '/betKs/:type/:gameType',
      name: 'BetKs',
      component: BetKs,
      beforeEnter: (to, from, next) => {
        verifyLogin(next);
      }
    },
    {
      path: '/bet28/:type/:gameType/:roomId',
      name: 'Bet28',
      component: Bet28,
      beforeEnter: (to, from, next) => {
        verifyLogin(next);
      }
    },
    {
      path: '/betLhc/:type/:gameType',
      name: 'BetLhc',
      component: BetLhc,
      beforeEnter: (to, from, next) => {
        verifyLogin(next);
      }
    },
    {
      path: '/betHall/:type/:gameType',
      name: 'BetHall',
      component: BetHall,
      beforeEnter: (to, from, next) => {
        verifyLogin(next);
      }
    },
    {
      path: '/lotteryRes',
      name: 'LotteryRes',
      component: LotteryRes,
      beforeEnter: (to, from, next) => {
        verifyLogin(next);
      }
    },
    {
      path: '/lotteryResCon/:gameType',
      name: 'LotteryResCon',
      component: LotteryResCon
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/helpCon/:id',
      name: 'HelpCon',
      component: HelpCon
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
      beforeEnter: (to, from, next) => {
        verifyLogin(next);
      }
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/service',
      name: 'Service',
      component: Service
    },
    {
      path: '/backWater',
      name: 'BackWater',
      component: BackWater,
      beforeEnter: (to, from, next) => {
        verifyLogin(next);
      }
    },
    {
      path: '/withdraw',
      name: 'Withdraw',
      component: Withdraw,
      beforeEnter: (to, from, next) => {
        verifyLogin(next);
      }
    },
    {
      path: '/integral',
      name: 'Integral',
      component: Integral,
      beforeEnter: (to, from, next) => {
        verifyLogin(next);
      }
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
      beforeEnter: (to, from, next) => {
        verifyLogin(next);
      }
    },
    {
      path: '/messageCon/:type/:id',
      name: 'MessageCon',
      component: MessageCon,
      beforeEnter: (to, from, next) => {
        verifyLogin(next);
      }
    },
    {
      path: '/activity',
      name: 'Activity',
      component: Activity
    },
    {
      path: '/activityCon/1',
      name: 'ActivityCon1',
      component: ActivityCon1
    },
    {
      path: '/activityCon/5',
      name: 'ActivityCon5',
      component: ActivityCon5
    },
    {
      path: '/recharge',
      name: 'Recharge',
      component: Recharge,
      beforeEnter: (to, from, next) => {
        verifyLogin(next);
      }
    },
    {
      path: '/password',
      name: 'Password',
      component: Password,
      beforeEnter: (to, from, next) => {
        verifyLogin(next);
      }
    },
    {
      path: '/moneyPassword',
      name: 'MoneyPassword',
      component: MoneyPassword,
      beforeEnter: (to, from, next) => {
        verifyLogin(next);
      }
    },
    {
      path: '/info',
      name: 'Info',
      component: Info,
      beforeEnter: (to, from, next) => {
        verifyLogin(next);
      }
    },
    {
      path: '/*',
      name: 'NotFound',
      component: NotFound
    }
  ]
});

// 未登录状态，个人中心全都跳转login
function verifyLogin(next) {
  if (window.localStorage.getItem('token')) {
    next();
  } else {
    next('/login');
  }
}
