<template>
  <div id="Share">
    <XHeader :left-options="{backText: ''}">分享</XHeader> 
    <div> 
      <ul>
        <li>
          <img src="../../assets/img/shareit_tittle.png" alt=""> 
        </li>
        <li>
          <div id="qrcode" ref="qrcode"></div>  
        </li>
        <li> 
          <input type="text" v-model="serviceLink" readonly >
        </li>
        <li> 
          <span>扫码安装</span>
        </li>
        <li> 
          <span>用户名：</span><span class="userIdColor">{{userId}}</span>
        </li>
         <li> 
          <span>温馨提示：请长按二维码保存图片</span>
        </li>
      </ul> 
    </div> 
  </div>
</template>
<script>
import { XHeader} from 'vux';
export default {
  name: 'Setting',
  components: {
    XHeader
  },
  data() {
    return {
      loading: false,
      userId :window.localStorage.getItem('userId'),
      serviceLink: ''
    };
  },
  computed: {
    lang() {
      return this.$store.state.lang.lang;
    }
  },
  created() {
    this.service();
  },
  methods: {
    
    // 获取客服地址
    async service() {
      let res = await this.$http('/queryPromotionUrl');
      this.serviceLink = res.returnMap.url;
      this._getQart();
    },
    _getQart: function() {
         
      if(this.serviceLink){
        var qrcode = new QRCode(document.getElementById("qrcode"), {  
            width : 120,//设置宽高  
            height : 120 
             
        });   
        qrcode.makeCode(this.serviceLink); 

      }
  
			 
			}
  }
};
</script>


<style lang="less" scoped>
@import url('./Share.less');
</style>