<template>
  <div id="QuestionValidate">
    <XHeader :left-options="{backText: ''}">找回密码</XHeader>
     <div class="first">
       <div>找回密码</div>
       <div>
         <span>请输入账号验证您的身份</span>
          <span><input type="text" v-model="validateUserId" placeholder="在这边输入您的账号"></span>
       </div>
        <div @click="openValidatePopup">下一步</div>
     </div>
    <popup v-model="questionShow" position="top"  height="100%" class="validateClass">  
      <XHeader :left-options="{backText: ''}">找回密码</XHeader>
      <div class="seconed">
        <div>密保验证</div>
        <div>
          <span>请验证您的密保问题</span>

          <Group class="questionClass" labelWidth="1.65rem">
              <x-input type="text" :value="`${questionValue1}`" readonly="readonly" title="问题一："></x-input>
              <x-input type="text" v-model="answer1" title="答 案：" placeholder="请输入您的答案" ></x-input>
              <x-input type="text" :value="`${questionValue2}`" readonly="readonly" title="问题二："></x-input> 
              <x-input type="text" v-model="answer2" title="答 案：" placeholder="请输入您的答案" ></x-input>
              <x-input type="text" :value="`${questionValue3}`" readonly="readonly" title="问题三："></x-input> 
              <x-input type="text" v-model="answer3" title="答 案：" placeholder="请输入您的答案" ></x-input>
          </Group>
          
        </div>
        <div @click="openSetPassword">下一步</div>
     </div>
    </popup>
    
    <popup v-model="setPasswordShow" position="top"  height="100%" class="setPasswordClass">  
      <XHeader :left-options="{backText: ''}">找回密码</XHeader>
      <div class="third">
        <div>设置密码</div>
        <div>
          <span>重新设置您的密码</span>

          <span><input type="text" v-model="newPassword" placeholder="请输入新密码"></span>
          
          <span><input type="text" v-model="comPassword" placeholder="再次请输入新密码"></span>
          
        </div>
        <div @click="openValidatePasswordPopup">下一步</div>
     </div>
    </popup>
    
    <popup v-model="valPasswordShow" position="top"  height="100%" class="valPasswordClass">  
      <XHeader :left-options="{backText: ''}">找回密码</XHeader>
      <div class="third">
        <div>设置成功</div>
        <div>
          <span>密码已经重置成功，快去登陆吧~</span> 
        </div>
        <div @click="goLogin">前往登陆</div>
     </div>
    </popup>

  </div>
</template>
<script>
import {  Popup,XHeader,Selector, Group, XInput, XButton} from 'vux';
export default {
  name: 'QuestionValidate',
  components: {
    Popup,
    XHeader,
    Group,
    XInput,
    Selector,
    XButton 
  },
  data() {
    return {
      questionList:[],
      validateUserId:'',
      newPassword:'',
      comPassword:'', 
      answer1:'',
      answer2:'',
      answer3:'',
      questionShow:false,
      setPasswordShow:false,
      valPasswordShow:false
    };
  },
  computed: {
    questionValue1() {
      if(this.questionList.length){
        return this.questionList[0].questionContent;
      }
      return '';
    } ,
    questionValue2() {
      if(this.questionList.length){
        return this.questionList[1].questionContent;
      }
      return '';
    } ,
    questionValue3() {
      if(this.questionList.length){
        return this.questionList[2].questionContent;
      }
      return '';
    } 
  },
//  async created() { 
//     await this.getData();
 
//   },
  methods: {
    async openValidatePasswordPopup(){
      if (!this.newPassword || !this.comPassword) {
        this.$vux.toast.show({
          type: 'text',
          text: '请正确填写密码信息',
          time: 1500
        });
        return;
      }
      if (this.newPassword != this.comPassword) {
        this.$vux.toast.show({
          type: 'text',
          text: '密码与确认密码不一致',
          time: 1500
        });
        return;
      }

      let res = await this.$http('/updateLowerUserPassword', {
        body: {
          userId:this.validateUserId,
          updatePassword:this.newPassword,
          questionIdList: this.questionList[0].questionId+','+this.questionList[1].questionId+','+this.questionList[2].questionId,
          answer1: this.answer1,
          answer2: this.answer2,
          answer3: this.answer3
        }
      });
      if (res.returnCode !== '0000') {
        this.$vux.toast.show({
          type: 'warn',
          text: res.returnMessage,
          time: 1500
        }); 
      } else {
        this.$vux.toast.show({
          type: 'success',
          text: '修改成功',
          time: 1500
        }); 
      this.valPasswordShow=true;
      } 
    },
    async openValidatePopup(){
      if (!this.validateUserId) {
        this.$vux.toast.show({
          type: 'text',
          text: '请输入您的账号',
          time: 1500
        });
        return;
      }
      let res = await this.$http('/queryQuestionInfoByUserId', {
        body: {
          userId: this.validateUserId
        }
      });
       
      if (res.returnCode !== '0000') {
        this.$vux.toast.show({
          type: 'warn',
          text: res.returnMessage,
          time: 1500
        });
        return;
      }
      if(!res.returnList){
        this.$vux.toast.show({
          type: 'warn',
          text: '未设置密保',
          time: 1500
        });
        return;
      } 
      this.questionList=res.returnList;

      this.questionShow=true;
    },
    async openSetPassword(){
      if (!this.answer1 || !this.answer2 || !this.answer3) {
        this.$vux.toast.show({
          type: 'text',
          text: '请正确填写信息',
          time: 1500
        });
        return;
      }
       
      let res = await this.$http('/checkQuestionAndAnswer', {
        body: {
          userId:this.validateUserId, 
          questionIdList: this.questionList[0].questionId+','+this.questionList[1].questionId+','+this.questionList[2].questionId,
          answer1: this.answer1,
          answer2: this.answer2,
          answer3: this.answer3
        }
      });
       
      if (res.returnCode !== '0000') {
        this.$vux.toast.show({
          type: 'warn',
          text: res.returnMessage,
          time: 1500
        });
        return;
      }
       
      this.setPasswordShow=true;
    }, 
    goLogin() {
      window.localStorage.clear();
      this.$router.push('/login');
 
    } 
  }
};
</script>
<style lang="less" scoped>
@import url('./QuestionValidate.less');
</style>
