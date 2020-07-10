import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Login from "../components/Login";
import Main from "../components/Main"
import ShopCart from "../components/ShopCart";
import Order from "../components/Order";
import PersonalSetting from "../components/PersonalSetting";
import Store from "../components/Store";
import StoreInfo from "../components/StoreInfo";
import AssistantApply from "../components/AssistantApply";
import BookInfo from "../components/BookInfo";
import AdminMain from "../components/AdminMain";
import BusinessList from "../components/BusinessList";
import StoreList from "../components/StoreList";
import ApplyCheck from "../components/ApplyCheck";
import SearchResult from "../components/SearchResult";

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/main',
      name: 'Main',
      component: Main
    },

    {
      path: '/searchResult',
      name: 'SearchResult',
      component: SearchResult,
    },

    {
      path: '/shopCart',
      name: 'ShopCart',
      component: ShopCart
    },

    {
      path: '/order',
      name: 'Order',
      component: Order
    },

    {
      path: '/personalSetting',
      name: 'PersonalSetting',
      component: PersonalSetting
    },

    {
      path: '/store',
      name: 'Store',
      component: Store
    },

    {
      path: '/storeInfo',
      name: 'StoreInfo',
      component: StoreInfo
    },

    {
      path: '/assistantApply',
      name: 'AssistantApply',
      component: AssistantApply
    },

    {
      path: '/bookInfo',
      name: BookInfo,
      component: BookInfo
    },

    {
      path: '/adminMain',
      name: AdminMain,
      component: AdminMain
    },

    {
      path: '/businessList',
      name: BusinessList,
      component: BusinessList
    },

    {
      path: '/storeList',
      name: StoreList,
      component: StoreList
    },

    {
      path: '/applyCheck',
      name: ApplyCheck,
      component: ApplyCheck
    },
  ]
})
