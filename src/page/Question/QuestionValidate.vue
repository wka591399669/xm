<template>
  <div id="QuestionValidate">
    <XHeader :left-options="{backText: ''}">找回密码</XHeader>
     <div class="first">
       <div>找回密码</div>
       <div>
         <span>请输入账号验证您的身份</span>
          <span><input type="text" placeholder="请输入您的账号"></span>
       </div>
     </div>
    <popup v-model="questionShow" position="top"> 
       
      <div class="btn">
       fffffffffffffffff
      </div>
    </popup>
  </div>
</template>
<script>
import {  Popup,XHeader,Selector, Group, XInput, XButton } from 'vux';
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
      question1:'',
      question2:'',
      question3:'',
      answer1:'',
      answer2:'',
      answer3:'',
      questionShow:false
    };
  },
 async created() { 
    await this.getData();
 
  },
  methods: {
    async getData(){
      let res = await this.$http('/queryQuestionList');
      this.questionList=res.returnList;
      this.question1=this.questionList[0].questionId;
      this.question2=this.questionList[0].questionId;
      this.question3=this.questionList[0].questionId;
      
    },
    async sub() {
      if (!this.answer1 || !this.answer2 || !this.answer3) {
        this.$vux.toast.show({
          type: 'text',
          text: '请正确填写信息',
          time: 1500
        });
        return;
      }
       
      let res = await this.$http('/addQuestionAndAnswerForUser', {
        body: {
          questionIdList: this.question1+','+this.question2+','+this.question3,
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
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./QuestionValidate.less');
</style>
