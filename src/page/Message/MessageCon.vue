<template>
  <div id="MessageCon">
    <XHeader :left-options="{backText: ''}">消息详情</XHeader>
    <div v-if="$route.params.type=='message'">
      <div class="title">
        <p v-html="info.messageTitle"></p>
        <div>
          <span v-if="info.createTime">{{info.createTime.substr(0,4) + '-'+info.createTime.substr(4,2) + '-'+info.createTime.substr(6,2)}}</span>
          <span   >来源：消息</span>
        </div>
        
      </div>
      <div class="main" v-html="info.message">
      </div>
    </div>
    <div v-else>
      <div class="title">
        <p v-html="info.title" ></p>
        <div>
          <span v-if="info.createDate">{{info.createDate.substr(0,4) + '-'+info.createDate.substr(4,2) + '-'+info.createDate.substr(6,2)}}</span>
          <span   >来源：公告</span>
        </div> 
      </div>
      <div class="main" v-html="info.content">
      </div>
    </div>
  </div>
</template>
<script>
import { XHeader } from 'vux';

export default {
  name: 'MessageCon',
  components: {
    XHeader
  },
  created() {
    this.$route.params.type == 'message' ? this.getMessage() : this.getBulletin()
    
  },
  data() {
    return {
      info: {}
    };
  },
  methods: {
    async getMessage() {
      let res = await this.$http('/querySystemMessageDetails', {
        body: {
          id: this.$route.params.id
        }
      });
      this.info = Object.assign({}, res.returnMap);
      console.log(res);
    },
    async getBulletin() {
      let res = await this.$http('/queryBulletinById', {
        body: {
          bulletinId: this.$route.params.id
        }
      });
      this.info = Object.assign({}, res.returnMap);
      console.log(res);
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./MessageCon.less');
</style>
