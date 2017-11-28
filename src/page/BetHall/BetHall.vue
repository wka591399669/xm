<template>
  <div id="BetHall">
    <XHeader :left-options="{backText: ''}">{{info.gameType}}</XHeader>
    <div class="box" v-for="(it,i) in room" :key="i">
      <div class="title">
        <img class="title" :src="require(`../../assets/img/lottery/room${i+1}.png`)" alt=""  @click="$router.push('/betRuleDes')">
        <p>回水{{it.roomRakeOffMin}}%-{{it.roomRakeOffMax}}%</p>
      </div>
      <div class="rooms">
        <div @click="toGame(it,is)" class="room" v-for="(is,j) in it.roomInfoList" :key="j">
          <img :src="require(`../../assets/img/lottery/room${i+1}${j+1}.png`)" alt="">
          <p><img src="../../assets/img/lottery/user.png" alt="">{{is.onlineUser}}人</p>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { XHeader } from 'vux';
// /betHall/:type/:gameType
export default {
  name: 'BetHall',
  components: {
    XHeader
  },
  data() {
    return {
      info: {}, // 彩种信息
      room: [] // 房间信息
    };
  },
  async created() {
    this.$vux.loading.show({
      text: 'Loading'
    });
    await this.getBetInfo();
    await this.getHallInfo();
    this.$vux.loading.hide();
  },
  methods: {
    // 获取用户信息
    // 获取彩种信息
    async getBetInfo() {
      let res = await this.$http('/querySaleGameInfo', {
        body: {
          gameType: this.$route.params.gameType
        }
      });
      this.info = Object.assign({}, res.returnMap);
    },
    // 获取房间信息
    async getHallInfo() {
      let res = await this.$http('/queryRoomRankInfo', {
        body: { gameType: this.$route.params.gameType }
      });
      this.room = res.returnList;
    },
    // 进入游戏
    async toGame(it, is) {
      this.$store.commit('bet/roomInfo', is);
      this.$router.push(
        `/bet28/${this.$route.params.type}/${this.$route.params
          .gameType}/${is.roomId}`
      );
    }
  }
};
</script>
<style lang="less">
@import url('./BetHall.less');
</style>

