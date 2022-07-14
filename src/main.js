/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-30 04:21:59
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-09 23:28:25
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
