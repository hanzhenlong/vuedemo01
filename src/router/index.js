import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index'
import List from '../views/List'
import Topic from '../views/Topic'
import Login from '../views/Login'
import User from '../views/User'
import New from '../views/New'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/topic/:id',
      name: 'Topic',
      component: Topic
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/:username',
      name: 'User',
      component: User
    },
    {
      path: '/new',
      name: 'New',
      component: New,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
