import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import Vuex from 'vuex'
Vue.use(Vuex)

Vue.prototype.$ajax = Axios
Vue.config.productionTip = false

var store = new Vuex.Store({
  state:{
    infoInline: [],
    infoCounter: [],
    cates: [
      "臺幣交易",
      "各項申請",
      "開戶服務",
      "繳費服務",
      "外幣交易",
      "理財諮詢",
      "帳戶相關",
      "理專服務",
    ]
  },
  mutations:{
  }
})

new Vue({
  router,
  store ,
  render: function (h) { return h(App) }
}).$mount('#app')
