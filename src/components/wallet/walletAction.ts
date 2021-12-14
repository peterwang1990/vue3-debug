import _ from 'lodash'
import dotProp from 'dot-prop-immutable'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import store from '../../store'

import { bus } from '../../utils/bus'
import BLOCKCHAIN_CONFIG from '../../constants/blockchain_config'

import { getWeb3Provider, WEB3_PROVIDER_TYPES } from '../../utils/provider'
// import { TokenAllowance } from './walletReducer'
// import {
//   addLayoutGlobalMessage,
//   GlobalMessage,
//   GLOBAL_MESSAGE_TYPES,
//   updateLayoutGlobalMessage
// } from '../../components/layout/layoutAction'
import { parseWeb3TransactionErrorMessage } from '../../utils/commonUtils'

export const CLEAR_WALLET = 'CLEAR_WALLET'
export const UPDATE_WALLET_WEB3_PROVIDER_TYPE = 'UPDATE_WALLET_WEB3_PROVIDER_TYPE'
export const UPDATE_WALLET_PROVIDER_NETWORK = 'UPDATE_WALLET_PROVIDER_NETWORK'
export const UPDATE_WALLET_ADDRESS = 'UPDATE_WALLET_ADDRESS'

export const UPDATE_WALLET_BALANCE = 'UPDATE_WALLET_BALANCE'
export const UPDATE_WALLET_ALLOWANCE = 'UPDATE_WALLET_ALLOWANCE'
export const UPDATE_WALLET_TOKEN_ALLOWANCE = 'UPDATE_WALLET_TOKEN_ALLOWANCE'

export const UPDATE_WALLET_PENDING_TRANSACTION = 'UPDATE_WALLET_PENDING_TRANSACTION'
export const REMOVE_WALLET_PENDING_TRANSACTION = 'REMOVE_WALLET_PENDING_TRANSACTION'

export const UPDATE_WALLET_TRANSACTION = 'UPDATE_WALLET_TRANSACITON'

export const isValidProviderNetwork = (walletProviderNetwork: any) => {
  return (
    _.has(walletProviderNetwork, 'chainId') &&
    walletProviderNetwork.chainId.toString() === BLOCKCHAIN_CONFIG.defaultChainId
  )
}

export const PENDING_TRANSACITON_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  REVERTED: 'REVERTED'
}

export const WALLET_TRANSACTION_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  REVERTED: 'REVERTED'
}

const WalletTransaction = ({
  hash = '',
  title = '',
  status = WALLET_TRANSACTION_STATUS.PENDING,
  createdTimestamp = ''
}) => {
  return {
    hash,
    title,
    status,
    createdTimestamp
  }
}

export function clearWallet() {
  return (dispatch: any) => {
    dispatch({
      type: CLEAR_WALLET
    })
  }
}

export function updateWalletWeb3ProviderType(providerType: any) {
  store.dispatch('set_web3ProviderType', providerType)
}

export async function fetchWalletProvider() {
  const { providerNetwork: prevProviderNetwork, address: prevAddress } =
    store.getters.wallet
  try {
    const web3Provider = await getWeb3Provider()
    const providerAccountList = web3Provider ? await web3Provider.listAccounts() : []
    if (web3Provider && !_.isEmpty(providerAccountList)) {
      const providerNetwork = await web3Provider.getNetwork()
      if (!_.isEqual(prevProviderNetwork, providerNetwork)) {
        // const { data } = store.getters
        // store.dispatch(
        //   'set_data',
        dotProp.set(store.getters, 'wallet.providerNetwork', providerNetwork)
        // )
        if (_.isNil(store.getters.wallet.web3ProviderType)) {
          updateWalletWeb3ProviderType(WEB3_PROVIDER_TYPES.META_MASK)
        }
      }
      const signer = web3Provider.getSigner()
      const address = await signer.getAddress()
      if (!_.isEqual(prevAddress, address)) {
        if (!_.isNil(prevAddress)) {
          store.dispatch('remove_user')
          clearWallet()
          // clearExchangeAccountData()
          // clearGovernanceAccountData()
        }
        localStorage.setItem('wallet_address', address)
        store.dispatch('set_user')

        // fetchFundProtocolData
        // fetchExchangeUnsettledTrades()

        // if (window.gtag && window.navigator) {
        //   window.gtag('event', 'connect_wallet', {
        //     formatted_address: address ? address.substring(2) : null,
        //     user_agent: navigator.userAgent
        //   })
        // }
      }
    } else if (!_.isEmpty(prevProviderNetwork) || !_.isNil(prevAddress)) {
      store.dispatch('remove_user')
      // clearExchangeAccountData()
      // clearGovernanceAccountData()
      clearWallet()
      // bus.emit(BLOCKCHAIN_CONFIG.EVENT_GET_DATA, {})
    }
  } catch (error) {
    console.error('fetchWalletProvider error:', error)
  }
}

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

export function waitWalletPendingTransaction({
  transactionResponse,
  title = '',
  successMessage = '',
  servicePendingMessageOnSuccess = null
}: any) {
  return new Promise((resolve, reject) => {
    if (_.has(transactionResponse, 'hash')) {
      const { hash } = transactionResponse
      // fetchFundProtocolData()
      bus.emit(BLOCKCHAIN_CONFIG.EVENT_GET_DATA, {})
      // addLayoutGlobalMessage(
      //   GlobalMessage({
      //     id: hash,
      //     type: GLOBAL_MESSAGE_TYPES.PENDING,
      //     text: `Pending: ${title}`,
      //     hash
      //   })
      // )
      const transaction = WalletTransaction({
        hash,
        title,
        createdTimestamp: moment().toISOString()
      })
      store.dispatch(
        'set_data',
        dotProp.merge(
          store.getters,
          `wallet.transactions.${transaction.hash}`,
          transaction
        )
      )
      console.log(store.getters.wallet.transactions)
      transactionResponse
        .wait()
        .then((receipt: any) => {
          const prevTransaction = store.getters.wallet.transactions[hash]
          if (prevTransaction) {
            // updateLayoutGlobalMessage(hash, {
            //   type:
            //     receipt.status === 1
            //       ? GLOBAL_MESSAGE_TYPES.SUCCESS
            //       : GLOBAL_MESSAGE_TYPES.ERROR,
            //   text: `${receipt.status === 1 ? 'Success' : 'Failed'}: ${receipt.status === 1 ? successMessage || title : title
            //     }`
            // })
            if (!_.isNil(servicePendingMessageOnSuccess) && receipt.status === 1) {
              // addLayoutGlobalMessage(
              //   GlobalMessage({
              //     id: uuidv4(),
              //     type: GLOBAL_MESSAGE_TYPES.SERVICE_PENDING,
              //     text: `Transaction confirmed: ${servicePendingMessageOnSuccess}`
              //   })
              // )
            }
            const { data } = store.getters
            const transaction1 = dotProp.set(
              prevTransaction,
              'status',
              receipt.status === 1
                ? WALLET_TRANSACTION_STATUS.CONFIRMED
                : WALLET_TRANSACTION_STATUS.REVERTED
            )
            store.dispatch(
              'set_data',
              dotProp.merge(
                data,
                `wallet.transactions.${transaction1.hash}`,
                transaction1
              )
            )
          }
          // fetchFundProtocolData()
          bus.emit(BLOCKCHAIN_CONFIG.EVENT_GET_DATA, {})
          resolve(receipt)
        })
        .catch((error: any) => {
          console.log(store.getters.wallet.transactions)
          const prevTransaction = store.getters.wallet.transactions[hash]
          if (prevTransaction) {
            const message = parseWeb3TransactionErrorMessage(error)
            // updateLayoutGlobalMessage(hash, {
            //   type: GLOBAL_MESSAGE_TYPES.ERROR,
            //   text: `Failed: ${title}, ${message}`
            // })
            const { data } = store.getters
            const transactionError = dotProp.set(
              prevTransaction,
              'status',
              WALLET_TRANSACTION_STATUS.REVERTED
            )
            store.dispatch(
              'set_data',
              dotProp.merge(
                data,
                `wallet.transactions.${transactionError.hash}`,
                transactionError
              )
            )
          }
          // fetchFundProtocolData()
          bus.emit(BLOCKCHAIN_CONFIG.EVENT_GET_DATA, {})
          console.log('waitWalletPendingTransaction error', title, error)
          reject(error)
        })
    }
  })
}

export function removeWalletPendingTransaction(hash: string) {
  return (dispatch: any) => {
    dispatch({
      type: REMOVE_WALLET_PENDING_TRANSACTION,
      hash
    })
  }
}
