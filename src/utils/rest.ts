/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import store from '../store'
import * as API from '../constants/api'

// axios 配置
axios.defaults.timeout = 10000
axios.defaults.baseURL = API.server_domain
axios.defaults.headers = { 'Content-Type': 'application/x-www-form-urlencoded;' }

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.data.code === -99 || response.data.code === 401) {
      console.log('登录有问题')
      console.log(response)
      // token有问题
      store.dispatch('remove_user')

      // 只有在当前路由不是登录页面才跳转
      // router.currentRoute.path !== ('/login' || '/register') &&
      // router.replace({
      //   path: '/login',
      //   query: {redirect: router.currentRoute.path},
      // })
      // return response
    }
    return response
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          // 401 清除token信息并跳转到登录页面
          store.dispatch('remove_user')

        // // 只有在当前路由不是登录页面才跳转
        // router.currentRoute.path !== ('/login' || '/register') &&
        // router.replace({
        //   path: '/login',
        //   query: {redirect: router.currentRoute.path},
        // })
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error)
  }
)

export default axios
