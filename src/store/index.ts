import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import RootStateTypes from './types'
import { getLocalStroageWeb3ProviderType } from '@/components/wallet/walletReducer'

const stateDefault = {
  isLogin: false,
  lang: localStorage.getItem('lang') || 'en',
  settings: {
    slippage: 0.5
  },
  chainInfo: {
    chainId: -1,
    chainSymbol: ''
  },
  layout: {
    globalMessages: [],
    pageAnnouncementHeight: 0
  },
  wallet: {
    web3ProviderType: getLocalStroageWeb3ProviderType(),
    providerNetwork: {},
    address: '',
    transactions: {},
    pendingTransactions: {}
  }
}

export const store = createStore<RootStateTypes>({
  state: stateDefault,
  getters: {
    isLogin: (state) => state.isLogin,
    wallet: (state) => state.wallet,
    settings: (state) => state.settings,
    lang: (state) => state.lang,
    chainInfo: (state) => state.chainInfo,
    layout: (state) => state.layout
  },
  mutations: {
    // 设置用户登录状态
    SET_USER(state) {
      // 先让登录状态变为登录了
      state.isLogin = true
      state.wallet.address = localStorage.getItem('wallet_address') || ''
    },
    // 取消用户登录状态
    REMOVE_USER(state) {
      // 这个同理
      localStorage.removeItem('wallet_address')
      localStorage.removeItem('settings')
      localStorage.removeItem('chain_info')

      state.isLogin = false
      state.wallet = {
        web3ProviderType: getLocalStroageWeb3ProviderType(),
        providerNetwork: {},
        address: '',
        transactions: {},
        pendingTransactions: {}
      }
    },
    SET_SETTINGS(state) {
      if (localStorage.getItem('settings')) {
        const settingsStr = localStorage.getItem('settings') || '{}'
        const settingsJsonObj = JSON.parse(settingsStr)
        if (Object.prototype.hasOwnProperty.call(settingsJsonObj, 'slippage')) {
          state.settings = settingsJsonObj.slippage
        }
      }
    },
    SET_LANG(state) {
      state.lang = localStorage.getItem('lang') || 'zh'
    },
    SET_CHAININFO(state) {
      const settingsChainInfo = localStorage.getItem('chain_info') || '{}'
      const settingsJsonChainInfo = JSON.parse(settingsChainInfo)
      state.chainInfo = {
        chainId: settingsJsonChainInfo.chainId,
        chainSymbol: settingsJsonChainInfo.chainSymbol
      }
    }
  },
  actions: {
    set_user({ commit }) {
      commit('SET_USER')
    },
    // 同样来个logout
    remove_user({ commit }) {
      commit('REMOVE_USER')
    },
    set_settings({ commit }) {
      commit('SET_SETTINGS')
    },
    set_lang({ commit }) {
      commit('SET_LANG')
    },
    set_chaininfo({ commit }) {
      commit('SET_CHAININFO')
    }
  },
  modules: {}
})

export const key: InjectionKey<Store<RootStateTypes>> = Symbol('vue-store')

export function useStore<T = RootStateTypes>() {
  return baseUseStore<T>(key)
}

export default store
