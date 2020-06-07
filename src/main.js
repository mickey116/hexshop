import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap'
import VeeValidate from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import router from './router'
import store from './store'
import './bus'
import currencyFilters from './filters/currency'

// library.add(faSpinner)


Vue.config.productionTip = false
//跨域登入
axios.defaults.withCredentials = true;


Vue.component('Loading',Loading)
// Vue.component('font-awesome-icon', FontAwesomeIcon)
// 全域filter
Vue.filter('currency', currencyFilters)

Vue.use(VueAxios, axios)
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'zhTW'
});
Vue.use(VeeValidate, {
  events: 'input|blur', //這是為了讓使用者離開該欄位時觸發驗證
  i18n,
  dictionary: {
    zhTW
  }
});

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 登入驗證

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth){
    // 需要驗證
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((response) => {
      console.log(response.data)
      if (response.data.success) {
      //成功登入
      next()
      }else{
        next({
          path:'/login'
        });
      }
    })
  }else{
    next();
  }
})
