// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/user'

Vue.config.productionTip = false;

// 处理刷新的时候vuex被清空，但是用户已经登录的情况
if (window.sessionStorage.user) {
  store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.user));
}

// 登录中间验证，页面需要登录而没有登录的情况下，直接跳转登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.userInfo.userId) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next() // 确保一定要调用 next()
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
