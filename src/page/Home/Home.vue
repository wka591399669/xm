<template>
  <div id="Home">
    <XHeader :left-options="{showBack: false}">购彩大厅
      <!-- <span slot="right" v-if="isLogin">余额：{{userInfo.amount}}</span> -->
    </XHeader>
    <div class="banner">
      <swiper :options="swiperOption">
      <swiper-slide v-for="(it,i) in banner" :key="i">
        <a v-if="it.url" :href="bannerHref(it.url)" target="_blank">
          <img :src="it.imageUrl">  
        </a>
        <img v-else :src="it.imageUrl">     
      </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="marquee">
        <span>
          <img src="../../assets/img/bulletin.png" alt="">
        </span>
        <marquee v-html="bulletin">
        </marquee> 
      </div>
       
    </div>
     
    <flexbox class="quickMenu">
      <flexbox-item>
        <router-link to="/recharge">
          <img src="../../assets/img/recharge.png" alt="">
          <p>充值中心</p>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <router-link to="/message">
          <img src="../../assets/img/message.png" alt="">
          <p>消息公告</p>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <router-link to="/activity">
          <img src="../../assets/img/activity.png" alt="">
          <p>优惠活动</p>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <a target="_blank" :href="serviceLink">
          <img src="../../assets/img/service.png" alt="">
          <p>联系客服</p>
        </a>
      </flexbox-item>
    </flexbox>
    <p class="title">
      热门彩种
      <!-- <span class="more" @click="showOther=!showOther">更多</span> -->
    </p>
    <ul class="lotteryList">
      <router-link v-for="(it,i) in hotGame" :key="i" :to="betRouter(it.gameType)" tag="li">
        <img :src="require(`../../assets/img/lottery/${it.gameType}.png`)" alt="">
        <p>
          <span>{{it.gameTypeName}}</span>
          <span>{{it.Desc}}</span>
        </p>
      </router-link>
      <li @click="showOther=!showOther">
        <img src="../../assets/img/lottery/qtcz.png" alt="">
        <p>
          <span>其他彩种</span>
          <span></span>
        </p>
      </li>
    </ul>
    <p class="title" v-if="showOther">
      其他彩种
    </p>
    <ul class="lotteryList" v-if="showOther">
      <router-link v-for="(it,i) in otherGame" :key="i" :to="betRouter(it.gameType)" tag="li">
        <img :src="require(`../../assets/img/lottery/${it.gameType}.png`)" alt="">
        <p>
          <span>{{it.gameName}}</span>
          <span>{{it.gameDes}}</span>
        </p>
      </router-link>
    </ul>
    <div class="win">
      <img src="../../assets/img/win.png" alt="">
      <ul>
        <li v-for="it in winInfoList" :key="it.batchOrderId">
          恭喜ID:{{it.userName}} 【{{it.gameTypeName}}】 中奖{{it.winAmount}}元
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { Flexbox, FlexboxItem, Marquee, MarqueeItem, XHeader } from 'vux';
export default {
  name: 'Home',
  components: {
    swiper,
    swiperSlide,
    Flexbox,
    FlexboxItem,
    XHeader
  },
  data() {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplay: 2500
      },
      banner: [],
      hotGame: [],
      otherGame: [],
      showOther: false,
      winInfoList: [],
      isLogin: false,
      userInfo: {},
      bulletin: '',
      serviceLink: ''
    };
  },
  async created() {
    this.$vux.loading.show({
      text: 'Loading'
    });
    await this.getIndexPage();
    if (window.localStorage.getItem('token')) {
      await this.getUser();
    }
    await this.service();
    this.$vux.loading.hide();
  },
  methods: {
    async getUser() {
      let res = await this.$http('/queryUserCommonInfo', {
        body: {
          userId: window.localStorage.getItem('userId'),
          token: window.localStorage.getItem('token')
        }
      });
      this.isLogin = true;
      this.userInfo = Object.assign({}, res.returnMap);
    },
    async getIndexPage() {
      let res = await this.$http('/indexPage');
      // format
      res.returnMap.bannerList.map(x => {
        x.imageUrl = SETTING.apiHost + '/' + x.imageUrl;
      });
      let hot = [];
      res.returnMap.hotGame.map(x => {
        hot.push(x.gameType);
      });
      // save
      this.banner = res.returnMap.bannerList;
      this.hotGame = res.returnMap.hotGame;
      this.otherGame = res.returnMap.gameType.filter(
        x => hot.indexOf(x.gameType) == -1
      );
      this.winInfoList = res.returnMap.winInfoList;
      this.bulletin = res.returnMap.bulletinList
        .map(x => `${x.content}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`)
        .join('');
    },
    // 获取客服地址
    async service() {
      let res = await this.$http('/queryCustomerServiceInfo');
      this.serviceLink = res.returnMap.customerServiceUrl;
    },
    bannerHref(href){
      if(window.localStorage.getItem('userId')){
        href = href + `?userId=${window.localStorage.getItem('userId')}&token=${window.localStorage.getItem('token')}`
      }
      return href;
    },
    betRouter(lottery) {
      let path;
      let type = this.betType(lottery);
      if (type === 'xyrb') {
        path = `/betHall/${type}/${lottery}`;
      } else if (type === 'ks') {
        path = `/betKs/${type}/${lottery}`;
      } else if (type === 'lhc') {
        path = `/betLhc/${type}/${lottery}`;
      } else {
        path = `/bet/${type}/${lottery}`;
      }
      return path;
    }
  }
};
</script>
<style lang="less">
@import url('./Home.less');
</style>


