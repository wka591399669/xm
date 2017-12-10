<template>
  <div id="Question">
    <XHeader :left-options="{backText: ''}">设置密保</XHeader>
    <Group class="questionClass" labelWidth="1.65rem">
      <popup-picker title="问题一" :data="questionList" v-model="question1" placeholder="请选择问题一" value-text-align="left" show-name></popup-picker>
      <x-input type="text" v-model="answer1" title="答案" placeholder="请输入您的答案"></x-input>
      <popup-picker title="问题二" :data="questionList" v-model="question2" placeholder="请选择问题二" value-text-align="left" show-name></popup-picker>
      <x-input type="text" v-model="answer2" title="答案" placeholder="请输入您的答案"></x-input>
      <popup-picker title="问题三" :data="questionList" v-model="question3" placeholder="请选择问题三" value-text-align="left" show-name></popup-picker>
      <x-input type="text" v-model="answer3" title="答案" placeholder="请输入您的答案"></x-input>
    </Group>
    <div class="btn">
      <x-button @click.native="sub">确认修改</x-button>
    </div>
  </div>
</template>
<script>
import { XHeader, Group, XInput, XButton, PopupPicker } from 'vux';
export default {
  name: 'Question',
  components: {
    XHeader,
    Group,
    XInput,
    XButton,
    PopupPicker
  },
  data() {
    return {
      questionList: [],
      question1: [],
      question2: [],
      question3: [],
      answer1: '',
      answer2: '',
      answer3: ''
    };
  },
  async created() {
    await this.getData();
  },
  methods: {
    async getData() {
      let res = await this.$http('/queryQuestionList');
      res.returnList.map(x => {
        x.name = x.questionContent;
        x.value = x.questionId;
      });
      this.questionList = [res.returnList];
      // this.questionList = res.returnList;
      // this.question1 = this.questionList[0].questionId;
      // this.question2 = this.questionList[0].questionId;
      // this.question3 = this.questionList[0].questionId;
    },
    async sub() {
      if (
        !this.question1.length ||
        !this.question2.length ||
        !this.question3.length
      ) {
        this.$vux.toast.show({
          type: 'text',
          text: '请正确填写信息',
          time: 1500
        });
        return;
      }
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
          questionIdList:
            this.question1[0] +
            ',' +
            this.question2[0] +
            ',' +
            this.question3[0],
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
