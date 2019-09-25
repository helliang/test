import Vue from 'vue'
import Router from 'vue-router'
// 主页
import home from '@/components/home'
// 种类
import category from '@/components/category'
// 信息
import notification from '@/components/notification'
// 我的
import account from '@/components/account'


Vue.use(Router)

export default new Router({
  linkActiveClass: "on",
  scrollBehavior(to, from, savedPosition) {
    // 退回页面所在的位置
    if (savedPosition) {
      return savedPosition;
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 };
    }
  },
  routes: [
    {
      path: "/home",
      name: "home",
      component: home,
      meta: {
        title: "首页"
      }
    },
    {
      path: "*", // 重定向的组件
      redirect: "/home"
    },
    {
      path: "/category",
      name: "category",
      component: category,
      meta: {
        title: "发现"
      }
    },
    {
      path: "/notification",
      name: "notification",
      component: notification,
      meta: {
        title: "任务"
      }
    },
    {
      path: "/account",
      name: "account",
      component: account,
      meta: {
        title: "我的"
      }
    }
  ]
})
