import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import animated from 'animate.css'
import vant from 'vant'
import 'vant/lib/index.css'
import { Tab, Tabs , Button } from 'vant'
import "../public/comment/js/setrem.js"
import "../public/comment/css/common.css"

Vue.use(Tab).use(Tabs);
Vue.use(Button);

Vue.config.productionTip = false
 
if (process.env.NODE_ENV === 'production') {
    /*第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
    console.log(process.env.VUE_APP_URL);
    if (process.env.VUE_APP_URL === 'PRO') {
        //production 生产环境
        console.log("生产");
        axios.defaults.baseURL = 'http://api.xinggeyun.com';

    }
    //  else {
    //     //test 测试环境
    //     axios.defaults.baseURL = 'http://192.168.0.152:8102';

    // }
} else {
    //dev 开发环境
    axios.defaults.baseURL = 'http://localhost:3003';
}

router.beforeEach((to,from,next) => {
    let cookie = document.cookie;
    if (cookie.length == 0 && to.fullPath != "/login") {
        next({path:"/login"});
    }else {
        next();
    }
    
})

Vue.use(animated)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
