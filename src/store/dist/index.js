exports.__esModule = true
exports.useStore = exports.key = exports.store = void 0
const vuex_1 = require('vuex')
const walletReducer_1 = require('@/components/wallet/walletReducer')

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
    web3ProviderType: walletReducer_1.getLocalStroageWeb3ProviderType(),
    providerNetwork: {},
    address: '',
    transactions: {},
    pendingTransactions: {}
  }
}
exports.store = vuex_1.createStore({
  state: stateDefault,
  getters: {
    isLogin(state) {
      return state.isLogin
    },
    wallet(state) {
      return state.wallet
    },
    settings(state) {
      return state.settings
    },
    lang(state) {
      return state.lang
    },
    chainInfo(state) {
      return state.chainInfo
    },
    layout(state) {
      return state.layout
    }
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
        web3ProviderType: walletReducer_1.getLocalStroageWeb3ProviderType(),
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
    set_user(_a) {
      const { commit } = _a
      commit('SET_USER')
    },
    // 同样来个logout
    remove_user(_a) {
      const { commit } = _a
      commit('REMOVE_USER')
    },
    set_settings(_a) {
      const { commit } = _a
      commit('SET_SETTINGS')
    },
    set_lang(_a) {
      const { commit } = _a
      commit('SET_LANG')
    },
    set_chaininfo(_a) {
      const { commit } = _a
      commit('SET_CHAININFO')
    }
  },
  modules: {}
})
exports.key = Symbol('vue-store')
function useStore() {
  return vuex_1.useStore(exports.key)
}
exports.useStore = useStore
exports.default = exports.store
