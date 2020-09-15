import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../views/Login.vue'

import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import UserEdit from '../views/UserEdit.vue'
import UserList from '../views/UserList.vue'

import Grade from '../views/Grade.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    path: '/',

    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
    meta:{
      isPublic: true
    }
  },
  {
    path: '/home',
    component: Home,
    redirect: '/categories/create',
    children: [
      {
        path: '/grade',
        component: Grade
      },
      {
        path: '/categories/create',
        component: CategoryEdit
      },
      {
        path: '/categories/list',
        component: CategoryList
      },
      {
        path: '/categories/edit/:id',
        component: CategoryEdit,
        props: true
      },
      {
        path: '/item/create',
        component: ItemEdit
      },
      {
        path: '/item/list',
        component: ItemList
      },
      {
        path: '/item/edit/:id',
        component: ItemEdit,
        props: true
      },
      {
        path: '/heroes/create',
        component: HeroEdit
      },
      {
        path: '/heroes/list',
        component: HeroList
      },
      {
        path: '/heroes/edit/:id',
        component: HeroEdit,
        props: true
      },

      {
        path: '/users/create',
        component: UserEdit
      },
      {
        path: '/users/list',
        component: UserList
      },
      {
        path: '/users/edit/:id',
        component: UserEdit,
        props: true
      }


    ]
  },

]



const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next)=>{
  if(!localStorage.token&&!to.meta.isPublic){
    return next('/login')
  }
  next()
})
export default router
