<template>
  <div id="Message">
    <XHeader :left-options="{backText: ''}">消息公告</XHeader>
    <tab :line-width="3" custom-bar-width="0.8rem">
      <tab-item @on-item-click="onTabClick(0)" :selected="tab==0">消息</tab-item>
      <tab-item @on-item-click="onTabClick(1)" :selected="tab==1">公告</tab-item>
    </tab>
    <NotFound v-if="!list.length" noHeader='1'></NotFound>
    <ul v-else class="list">
      <!-- 消息 -->
      <router-link v-if="tab==0" tag="li" :to="`/messageCon/message/${it.id}`" v-for="(it,i) in list" :key="i">
        <p>
          <span v-if="it.messageTitle" v-html="it.messageTitle"></span>
          <span v-if="it.title" v-html="it.title"></span>
          <span v-if="it.createTime">{{it.createTime.substr(4,2)}}月{{it.createTime.substr(6,2)}}日</span>
          <span v-if="it.createDate">{{it.createDate.substr(4,2)}}月{{it.createDate.substr(6,2)}}日</span>
        </p>
        <p>
          <span></span>
          <span v-if="it.state">{{it.state== 1 ? '已读' : '未读'}}</span>
        </p>
      </router-link> 
      <!-- 公告 -->
      <router-link v-if="tab==1" tag="li" :to="`/messageCon/bulletin/${it.bulletinId}`" v-for="(it,i) in list" :key="i">
        <p>
          <span v-if="it.messageTitle" v-html="it.messageTitle"></span>
          <span v-if="it.title" v-html="it.title"></span>
          <span v-if="it.createTime">{{it.createTime.substr(4,2)}}月{{it.createTime.substr(6,2)}}日</span>
          <span v-if="it.createDate">{{it.createDate.substr(4,2)}}月{{it.createDate.substr(6,2)}}日</span>
        </p>
        <p>
          <span></span>
          <span v-if="it.state">{{it.state== 1 ? '已读' : '未读'}}</span>
        </p>
      </router-link>
    </ul>
    <Pages @change="getData" :startRow="startRow" :pageSize="pageSize" :totalCount="totalCount"></Pages>

  </div>
</template>
<script>
import NotFound from '../NotFound/NotFound';
import Pages from '../../components/Pages/Pages';
import { XHeader, Tab, TabItem } from 'vux';
export default {
  name: 'Message',
  components: {
    XHeader,
    Tab,
    TabItem,
    NotFound,
    Pages
  },
  created() {
    this.getData();
  },
  data() {
    return {
      tab: 0,
      list: [], // info
      totalCount: 0, // 总条数
      pageSize: 10, // 查询条数
      startRow: 0 // 起始条数
    };
  },
  methods: {
    onTabClick(e) {
      this.tab = e;
      this.getData(0, e);
    },
    async getData(v, type) {
      this.$vux.loading.show({
        text: 'Loading'
      });
      if (v != undefined) {
        this.startRow = v;
      } else {
        this.startRow = 0;
      }
      let api = type ? '/getBulletin' : '/querySystemMessageList';
      let res = await this.$http(api, {
        body: {
          startRow: this.startRow,
          pageSize: this.pageSize
        }
      });
      this.list = res.returnList;
      this.totalCount = res.totalCount;
      console.log(res);
      this.$vux.loading.hide();
    }
  }
};
</script>
<style lang="less">
@import url('./Message.less');
</style>


