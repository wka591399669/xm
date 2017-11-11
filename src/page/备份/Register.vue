<template>
  <div id="Register">
    <XHeader :left-options="{backText: ''}">{{lang['register']}}</XHeader>
    <group labelWidth="2.387rem">
      <x-input v-model="form.user_name" v-for="(it,i) in item" v-if="it.name=='user_name' && it.show" :key="i" :title="lang['user_name']" :min="6" :max="16" :placeholder="lang['user_name_placeholder']">
      </x-input>

      <x-input v-model="form.password" v-else-if="it.name=='password' &&  it.show" :title="lang['password']" :min="6" :max="16" :placeholder="lang['password_placeholder']" type='password'>
      </x-input>

      <x-input v-model="form.re_pwd" v-else-if="it.name=='re_pwd' &&  it.show" :title="lang['re_pwd']" :min="6" :max="16" :placeholder="lang['re_pwd_placeholder']" type='password'>
      </x-input>

      <x-input v-model="form.name" v-else-if="it.name=='name' && it.show" :title="lang['name']" :placeholder="lang['name_placeholder']">
      </x-input>

      <datetime v-model="form.birth" v-else-if="it.name=='birth' && it.show" :title="lang['birth']" value-text-align="left" :placeholder="lang['placeholder_select']">
      </datetime>

      <popup-picker v-model="form.gender" v-else-if="it.name=='gender' && it.show" :title="lang['gender']" :data="[it.info]" value-text-align="left" show-name :placeholder="lang['placeholder_select']">
      </popup-picker>

      <x-input v-model="form.email" v-else-if="it.name=='email' &&  it.show" :title="lang['email']" :placeholder="lang['email_placeholder']" type="email">
      </x-input>

      <popup-picker v-model="form.city" v-else-if="it.name=='city' && it.show" :title="lang['city']" :data="[it.info]" value-text-align="left" show-name :placeholder="lang['placeholder_select']">
      </popup-picker>

      <x-input v-model="form.address" v-else-if="it.name=='address' &&  it.show" :title="lang['address']" :placeholder="lang['address_placeholder']">
      </x-input>

      <x-input v-model="form.mobile" v-else-if="it.name=='mobile' &&  it.show" :title="lang['mobile']" :placeholder="lang['mobile_placeholder']">
      </x-input>

      <x-input v-model="form.postcode" v-else-if="it.name=='postcode' &&  it.show" :title="lang['postcode']" :placeholder="lang['postcode_placeholder']">
      </x-input>

      <popup-picker v-model="form.nationality" v-else-if="it.name=='nationality' && it.show" :title="lang['nationality']" :data="[it.info]" value-text-align="left" show-name :placeholder="lang['nationality_placeholder']">
      </popup-picker>

      <popup-picker v-model="form.birth_place" v-else-if="it.name=='birth_place' && it.show" :title="lang['birth_place']" :data="[it.info]" value-text-align="left" show-name :placeholder="lang['birth_place_placeholder']">
      </popup-picker>

      <popup-picker v-model="form.currency" v-else-if="it.name=='currency' && it.show" :title="lang['currency']" :data="[it.info]" value-text-align="left" show-name :placeholder="lang['currency_placeholder']">
      </popup-picker>

      <popup-picker v-model="form.language" v-else-if="it.name=='language' && it.show" :title="lang['language']" :data="[it.info]" value-text-align="left" show-name :placeholder="lang['language_placeholder']">
      </popup-picker>

      <popup-picker v-model="form.first_account" v-else-if="it.name=='first_account' && it.show" :title="lang['first_account']" :data="[it.info]" value-text-align="left" show-name :placeholder="lang['first_account_placeholder']">
      </popup-picker>

      <x-input v-model="form.invit_code" v-else-if="it.name=='invit_code' &&  it.show" :title="lang['invit_code']" :placeholder="lang['invit_code_placeholder']" type="tel">
      </x-input>

      <x-input v-model="form.withdraw_pwd" v-else-if="it.name=='withdraw_pwd' && it.show" :title="lang['withdraw_pwd']" :placeholder="lang['withdraw_pwd_placeholder']" :min="4" :max="4" type="password" pattern="[0-9]">
      </x-input>

      <popup-picker v-model="form.question" v-else-if="it.name=='question' && it.show" :title="lang['question']" :data="[it.info]" value-text-align="left" show-name :placeholder="lang['question_placeholder']">
      </popup-picker>

      <x-input v-model="form.answer" v-else-if="it.name=='answer' &&  it.show" :title="lang['answer']" :placeholder="lang['answer_placeholder']">
      </x-input>

      <x-input v-model="form.verify" v-else-if="it.name=='verify' &&  it.show" :title="lang['verify']" :placeholder="lang['verify_placeholder']" :min="4" :max="4" pattern="[0-9]" type="tel">
      </x-input>

    </group>

    <div class="big-btn">
      <x-button v-if="!loading" type="primary" @click.native="onSubmit">{{lang['register']}}</x-button>
      <x-button v-else type="primary" show-loading @click.native="onSubmit">{{lang['register']}}</x-button>
    </div>
    <div class="rules">
      <check-icon :value.sync="checkRules">{{lang['accepted18years']}}</check-icon>
      <router-link tag="p" to="/rules">《{{lang['termsAgreement']}}》</router-link>
    </div>
  </div>
</template>
<script>
import { XHeader, Group, XButton, XInput, CheckIcon, Datetime, PopupPicker, Toast } from 'vux'

export default {
  name: 'Register',
  components: {
    XHeader, Group, XButton, XInput, CheckIcon, Datetime, PopupPicker, Toast
  },
  data() {
    return {
      loading: false,
      checkRules: true,
      form: {
        user_name: '',
        password: '',
        re_pwd: '',
        name: '',
        birth: '',
        gender: [],
        email: '',
        city: [],
        address: '',
        mobile: '',
        postcode: '',
        nationality: [],
        birth_place: [],
        currency: [],
        language: [],
        first_account: [],
        invit_code: '',
        withdraw_pwd: '',
        question: [],
        answer: '',
        verify: '',
        token: ''
      }
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang.lang
    },
    item() {
      return this.$store.state.user.registerItem
    }
  },
  created() {
    this.$store.dispatch('user/registerItem')
    // this.$store.dispatch('user/verify')
  },
  methods: {
    // 提交
    onSubmit() {
      let data = {}
      for (let i in this.item) {
        if (this.item[i].show) {
          if (this.item[i].required && !this.form[this.item[i].name].length) {
            return this.$vux.toast.show({
              type: 'warn',
              text: this.lang[this.item[i].name] + this.lang['writeError']
            })
          }
          data[this.item[i].name] = this.form[this.item[i].name]
        }
      }
      this.$store.dispatch('user/register', data).then(res => {
        if (res.state !== 0) {
          this.$vux.toast.show({
            type: 'warn',
            text: res.message
          })
        } else {
          this.$vux.toast.show({
            type: 'success',
            text: this.lang['register'] + this.lang['success']
          })
          this.$store.dispatch('user/bindUser', {
            expiration: res.data.auth.expiration,
            token: res.data.auth.token
          })
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        }
      })
    }
  }
}
</script>
<style lang="less">
#Register {
  .rules {
    text-align: center;
    font-size: 0.32rem;
    p {
      color: #d6a23e;
      margin-top: 0.2rem;
    }
  }
  .weui-cells {
    font-size: 0.36rem;
  }
}
</style>

