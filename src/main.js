import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'
import VueRouter from 'vue-router';
// 接口配置文件
import apis from './httpUrl'

//实例化
Vue.prototype.apis = apis;
Vue.prototype.$http = axios;
Vue.config.productionTip = false

//定义我们需要显示的路由页面
let isShowFooter = ['/home', "/category", "/notification", "/account"];
router.beforeEach(function (to, from, next) {
  if (to.path == "/home") {
    store.commit('updateHeadStatus', { isShowHeader: false })
  } else {
    store.commit('updateHeadStatus', { isShowHeader: true })
  }

  //如果存在 就说明改页面是需要隐藏的
  if (isShowFooter.indexOf(to.path) >= 0) {
    store.commit('updateLoadingStatus', { isShowFooter: true })
  } else {
    store.commit('updateLoadingStatus', { isShowFooter: false })
    store.commit('updateReturnStatus', { btnStatus: true })
  }
  store.commit('getHeaderTitle', { headerTitle: to.meta.title });
  if (to.path == "/category" || to.path == "/home" || to.path == "/notification" || to.path == "/account") {
    router.isBack = 1;
    store.commit('updateReturnStatus', { btnStatus: false });
  } else {
    store.commit('updateReturnStatus', { btnStatus: true });
  }
  next()
})
window.addEventListener('popstate', function (e) {
  router.isBack = 3
}, false)

VueRouter.prototype.goBack = function () {
  this.isBack = 3
  window.history.go(-1)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  axios,
  render: h => h(App)
})
