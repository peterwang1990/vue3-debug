const __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator.throw(value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
const __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    let _ = {
      label: 0,
      sent() {
        if (t[0] & 1) throw t[1]
        return t[1]
      },
      trys: [],
      ops: []
    }
    let f
    let y
    let t
    let g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y.return
                  : op[0]
                  ? y.throw || ((t = y.return) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
exports.__esModule = true
exports.removeWalletPendingTransaction =
  exports.waitWalletPendingTransaction =
  exports.fetchWalletProvider =
  exports.updateWalletWeb3ProviderType =
  exports.clearWallet =
  exports.WALLET_TRANSACTION_STATUS =
  exports.PENDING_TRANSACITON_STATUS =
  exports.isValidProviderNetwork =
  exports.UPDATE_WALLET_TRANSACTION =
  exports.REMOVE_WALLET_PENDING_TRANSACTION =
  exports.UPDATE_WALLET_PENDING_TRANSACTION =
  exports.UPDATE_WALLET_TOKEN_ALLOWANCE =
  exports.UPDATE_WALLET_ALLOWANCE =
  exports.UPDATE_WALLET_BALANCE =
  exports.UPDATE_WALLET_ADDRESS =
  exports.UPDATE_WALLET_PROVIDER_NETWORK =
  exports.UPDATE_WALLET_WEB3_PROVIDER_TYPE =
  exports.CLEAR_WALLET =
    void 0
const lodash_1 = require('lodash')
const dot_prop_immutable_1 = require('dot-prop-immutable')
const moment_1 = require('moment')
const store_1 = require('../../store')
const bus_1 = require('../../utils/bus')
const blockchain_config_1 = require('../../constants/blockchain_config')
const provider_1 = require('../../utils/provider')
// import { TokenAllowance } from './walletReducer'
// import {
//   addLayoutGlobalMessage,
//   GlobalMessage,
//   GLOBAL_MESSAGE_TYPES,
//   updateLayoutGlobalMessage
// } from '../../components/layout/layoutAction'
const commonUtils_1 = require('../../utils/commonUtils')

exports.CLEAR_WALLET = 'CLEAR_WALLET'
exports.UPDATE_WALLET_WEB3_PROVIDER_TYPE = 'UPDATE_WALLET_WEB3_PROVIDER_TYPE'
exports.UPDATE_WALLET_PROVIDER_NETWORK = 'UPDATE_WALLET_PROVIDER_NETWORK'
exports.UPDATE_WALLET_ADDRESS = 'UPDATE_WALLET_ADDRESS'
exports.UPDATE_WALLET_BALANCE = 'UPDATE_WALLET_BALANCE'
exports.UPDATE_WALLET_ALLOWANCE = 'UPDATE_WALLET_ALLOWANCE'
exports.UPDATE_WALLET_TOKEN_ALLOWANCE = 'UPDATE_WALLET_TOKEN_ALLOWANCE'
exports.UPDATE_WALLET_PENDING_TRANSACTION = 'UPDATE_WALLET_PENDING_TRANSACTION'
exports.REMOVE_WALLET_PENDING_TRANSACTION = 'REMOVE_WALLET_PENDING_TRANSACTION'
exports.UPDATE_WALLET_TRANSACTION = 'UPDATE_WALLET_TRANSACITON'
exports.isValidProviderNetwork = function (walletProviderNetwork) {
  return (
    lodash_1.default.has(walletProviderNetwork, 'chainId') &&
    walletProviderNetwork.chainId.toString() ===
      blockchain_config_1.default.defaultChainId
  )
}
exports.PENDING_TRANSACITON_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  REVERTED: 'REVERTED'
}
exports.WALLET_TRANSACTION_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  REVERTED: 'REVERTED'
}
const WalletTransaction = function (_a) {
  const _b = _a.hash
  const hash = _b === void 0 ? '' : _b
  const _c = _a.title
  const title = _c === void 0 ? '' : _c
  const _d = _a.status
  const status = _d === void 0 ? exports.WALLET_TRANSACTION_STATUS.PENDING : _d
  const _e = _a.createdTimestamp
  const createdTimestamp = _e === void 0 ? '' : _e
  return {
    hash,
    title,
    status,
    createdTimestamp
  }
}
function clearWallet() {
  return function (dispatch) {
    dispatch({
      type: exports.CLEAR_WALLET
    })
  }
}
exports.clearWallet = clearWallet
function updateWalletWeb3ProviderType(providerType) {
  store_1.default.dispatch('set_web3ProviderType', providerType)
}
exports.updateWalletWeb3ProviderType = updateWalletWeb3ProviderType
function fetchWalletProvider() {
  return __awaiter(this, void 0, void 0, function () {
    let _a
    let prevProviderNetwork
    let prevAddress
    let web3Provider
    let providerAccountList
    let _b
    let providerNetwork
    let signer
    let address
    let error_1
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          (_a = store_1.default.getters.wallet),
            (prevProviderNetwork = _a.providerNetwork),
            (prevAddress = _a.address)
          _c.label = 1
        case 1:
          _c.trys.push([1, 10, , 11])
          return [4 /* yield */, provider_1.getWeb3Provider()]
        case 2:
          web3Provider = _c.sent()
          if (!web3Provider) return [3 /* break */, 4]
          return [4 /* yield */, web3Provider.listAccounts()]
        case 3:
          _b = _c.sent()
          return [3 /* break */, 5]
        case 4:
          _b = []
          _c.label = 5
        case 5:
          providerAccountList = _b
          if (!(web3Provider && !lodash_1.default.isEmpty(providerAccountList)))
            return [3 /* break */, 8]
          return [4 /* yield */, web3Provider.getNetwork()]
        case 6:
          providerNetwork = _c.sent()
          if (!lodash_1.default.isEqual(prevProviderNetwork, providerNetwork)) {
            // const { data } = store.getters
            // store.dispatch(
            //   'set_data',
            dot_prop_immutable_1.default.set(
              store_1.default.getters,
              'wallet.providerNetwork',
              providerNetwork
            )
            // )
            if (
              lodash_1.default.isNil(store_1.default.getters.wallet.web3ProviderType)
            ) {
              updateWalletWeb3ProviderType(provider_1.WEB3_PROVIDER_TYPES.META_MASK)
            }
          }
          signer = web3Provider.getSigner()
          return [4 /* yield */, signer.getAddress()]
        case 7:
          address = _c.sent()
          if (!lodash_1.default.isEqual(prevAddress, address)) {
            if (!lodash_1.default.isNil(prevAddress)) {
              store_1.default.dispatch('remove_user')
              clearWallet()
              // clearExchangeAccountData()
              // clearGovernanceAccountData()
            }
            localStorage.setItem('wallet_address', address)
            store_1.default.dispatch('set_user')
            // fetchFundProtocolData
            // fetchExchangeUnsettledTrades()
            // if (window.gtag && window.navigator) {
            //   window.gtag('event', 'connect_wallet', {
            //     formatted_address: address ? address.substring(2) : null,
            //     user_agent: navigator.userAgent
            //   })
            // }
          }
          return [3 /* break */, 9]
        case 8:
          if (
            !lodash_1.default.isEmpty(prevProviderNetwork) ||
            !lodash_1.default.isNil(prevAddress)
          ) {
            store_1.default.dispatch('remove_user')
            // clearExchangeAccountData()
            // clearGovernanceAccountData()
            clearWallet()
            // bus.emit(BLOCKCHAIN_CONFIG.EVENT_GET_DATA, {})
          }
          _c.label = 9
        case 9:
          return [3 /* break */, 11]
        case 10:
          error_1 = _c.sent()
          console.error('fetchWalletProvider error:', error_1)
          return [3 /* break */, 11]
        case 11:
          return [2 /* return */]
      }
    })
  })
}
exports.fetchWalletProvider = fetchWalletProvider
// export function updateWalletBalance({ underlyingToken, quoteToken, tokenM, tokenA, tokenB, chess }) {
//     return (dispatch) => {
//         dispatch({
//             type: UPDATE_WALLET_BALANCE,
//             balance: {
//                 underlyingToken,
//                 quoteToken,
//                 tokenM,
//                 tokenA,
//                 tokenB,
//                 chess
//             }
//         })
//     }
// }
// export function updateWalletAllowance(allowance) {
//     return (dispatch) => {
//         dispatch({
//             type: UPDATE_WALLET_ALLOWANCE,
//             allowance
//         })
//     }
// }
// export async function fetchWalletTokenAllowance(tokenAddress, spenderAddress) {
//     const address = store.getters.walletAddress
//     const tokenContract = getTokenByAddress(tokenAddress)
//     if (_.isNil(address) || _.isNil(tokenContract)) {
//         console.error('fetchWalletTokenAllowance Error: Either wallet Address or Token Contract is missing')
//     } else {
//         const allowance = await tokenContract.allowance(address, spenderAddress)
//         const symbol = await tokenContract.symbol()
//         console.log("address === store.getters.walletAddress", address === store.getters.walletAddress)
//         if (address === store.getters.walletAddress) {
//             const tokenAllowance = TokenAllowance({
//                 tokenAddress,
//                 symbol,
//                 spenderAddress,
//                 value: allowance
//             })
//             const data = store.getters.data
//             tokenAllowanceIndex = _.findIndex(data.tokenAllowances, allowance =>
//                 allowance.tokenAddress === tokenAllowance.tokenAddress
//                 && allowance.spenderAddress === tokenAllowance.spenderAddress)
//             if (tokenAllowanceIndex >= 0) {
//                 store.dispatch("set_data", dotProp.set(data, `wallet.tokenAllowances.${tokenAllowanceIndex}`, tokenAllowance))
//             } else {
//                 store.dispatch("set_data", dotProp.merge(data, 'wallet.tokenAllowances', tokenAllowance))
//             }
//         }
//     }
// }
function waitWalletPendingTransaction(_a) {
  const { transactionResponse } = _a
  const _b = _a.title
  const title = _b === void 0 ? '' : _b
  const _c = _a.successMessage
  const successMessage = _c === void 0 ? '' : _c
  const _d = _a.servicePendingMessageOnSuccess
  const servicePendingMessageOnSuccess = _d === void 0 ? null : _d
  return new Promise(function (resolve, reject) {
    if (lodash_1.default.has(transactionResponse, 'hash')) {
      const hash_1 = transactionResponse.hash
      // fetchFundProtocolData()
      bus_1.bus.emit(blockchain_config_1.default.EVENT_GET_DATA, {})
      // addLayoutGlobalMessage(
      //   GlobalMessage({
      //     id: hash,
      //     type: GLOBAL_MESSAGE_TYPES.PENDING,
      //     text: `Pending: ${title}`,
      //     hash
      //   })
      // )
      const transaction = WalletTransaction({
        hash: hash_1,
        title,
        createdTimestamp: moment_1.default().toISOString()
      })
      store_1.default.dispatch(
        'set_data',
        dot_prop_immutable_1.default.merge(
          store_1.default.getters,
          `wallet.transactions.${transaction.hash}`,
          transaction
        )
      )
      console.log(store_1.default.getters.wallet.transactions)
      transactionResponse
        .wait()
        .then(function (receipt) {
          const prevTransaction = store_1.default.getters.wallet.transactions[hash_1]
          if (prevTransaction) {
            // updateLayoutGlobalMessage(hash, {
            //   type:
            //     receipt.status === 1
            //       ? GLOBAL_MESSAGE_TYPES.SUCCESS
            //       : GLOBAL_MESSAGE_TYPES.ERROR,
            //   text: `${receipt.status === 1 ? 'Success' : 'Failed'}: ${receipt.status === 1 ? successMessage || title : title
            //     }`
            // })
            if (
              !lodash_1.default.isNil(servicePendingMessageOnSuccess) &&
              receipt.status === 1
            ) {
              // addLayoutGlobalMessage(
              //   GlobalMessage({
              //     id: uuidv4(),
              //     type: GLOBAL_MESSAGE_TYPES.SERVICE_PENDING,
              //     text: `Transaction confirmed: ${servicePendingMessageOnSuccess}`
              //   })
              // )
            }
            const { data } = store_1.default.getters
            const transaction1 = dot_prop_immutable_1.default.set(
              prevTransaction,
              'status',
              receipt.status === 1
                ? exports.WALLET_TRANSACTION_STATUS.CONFIRMED
                : exports.WALLET_TRANSACTION_STATUS.REVERTED
            )
            store_1.default.dispatch(
              'set_data',
              dot_prop_immutable_1.default.merge(
                data,
                `wallet.transactions.${transaction1.hash}`,
                transaction1
              )
            )
          }
          // fetchFundProtocolData()
          bus_1.bus.emit(blockchain_config_1.default.EVENT_GET_DATA, {})
          resolve(receipt)
        })
        .catch(function (error) {
          console.log(store_1.default.getters.wallet.transactions)
          const prevTransaction = store_1.default.getters.wallet.transactions[hash_1]
          if (prevTransaction) {
            const message = commonUtils_1.parseWeb3TransactionErrorMessage(error)
            // updateLayoutGlobalMessage(hash, {
            //   type: GLOBAL_MESSAGE_TYPES.ERROR,
            //   text: `Failed: ${title}, ${message}`
            // })
            const { data } = store_1.default.getters
            const transactionError = dot_prop_immutable_1.default.set(
              prevTransaction,
              'status',
              exports.WALLET_TRANSACTION_STATUS.REVERTED
            )
            store_1.default.dispatch(
              'set_data',
              dot_prop_immutable_1.default.merge(
                data,
                `wallet.transactions.${transactionError.hash}`,
                transactionError
              )
            )
          }
          // fetchFundProtocolData()
          bus_1.bus.emit(blockchain_config_1.default.EVENT_GET_DATA, {})
          console.log('waitWalletPendingTransaction error', title, error)
          reject(error)
        })
    }
  })
}
exports.waitWalletPendingTransaction = waitWalletPendingTransaction
function removeWalletPendingTransaction(hash) {
  return function (dispatch) {
    dispatch({
      type: exports.REMOVE_WALLET_PENDING_TRANSACTION,
      hash
    })
  }
}
exports.removeWalletPendingTransaction = removeWalletPendingTransaction
