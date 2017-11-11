import Vue from 'vue';
import Vuex from 'vuex';

// module
import bet from '../page/Bet/bet.model';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    bet
  }
});
