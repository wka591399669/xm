<template>
  <div id="Question">
    <XHeader :left-options="{backText: ''}">设置密保</XHeader>
    <Group class="questionClass" labelWidth="1.65rem">
      <selector ref="question1Ref" title="问题一：" v-model="question1" :options="questionList" :value-map="['questionId', 'questionContent']" ></selector>
      <x-input type="text" v-model="answer1" title="答案" placeholder="请输入您的答案"></x-input>
      <selector ref="question2Ref" title="问题二：" v-model="question2" :options="questionList" :value-map="['questionId', 'questionContent']" ></selector>
      <x-input type="text" v-model="answer2" title="答案" placeholder="请输入您的答案"></x-input>
      <selector ref="question3Ref" title="问题三：" v-model="question3" :options="questionList" :value-map="['questionId', 'questionContent']" ></selector>
      <x-input type="text" v-model="answer3" title="答案" placeholder="请输入您的答案"></x-input>
    </Group>
    <div class="btn">
      <x-button @click.native="sub">确认修改</x-button>
    </div>
  </div>
</template>
<script>
import { XHeader,Selector, Group, XInput, XButton } from 'vux';
export default {
  name: 'Question',
  components: {
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
      answer3:''
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
@import url('./Question.less');
</style>
