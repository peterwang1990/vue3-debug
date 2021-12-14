import dotProp from 'dot-prop-immutable'

// import _ from 'lodash'
import {
  UPDATE_WALLET_WEB3_PROVIDER_TYPE,
  UPDATE_WALLET_PROVIDER_NETWORK,
  UPDATE_WALLET_ADDRESS,
  UPDATE_WALLET_BALANCE,
  UPDATE_WALLET_ALLOWANCE,
  //   UPDATE_WALLET_TOKEN_ALLOWANCE,
  UPDATE_WALLET_PENDING_TRANSACTION,
  REMOVE_WALLET_PENDING_TRANSACTION,
  UPDATE_WALLET_TRANSACTION,
  CLEAR_WALLET
} from './walletAction'
import { WEB3_PROVIDER_TYPES } from '../../utils/provider'

export const getLocalStroageWeb3ProviderType = () => {
  const providerType = localStorage.web3ProviderType
  return Object.values(WEB3_PROVIDER_TYPES).includes(providerType) ? providerType : null
}

const updateLocalStorageWeb3ProviderType = (type: string) => {
  localStorage.web3ProviderType = type
}

export const TokenAllowance = ({
  tokenAddress = '',
  symbol = '',
  spenderAddress = '',
  value = ''
}) => {
  return {
    tokenAddress,
    symbol,
    spenderAddress,
    value
  }
}

const initialState = {
  web3ProviderType: getLocalStroageWeb3ProviderType(),
  providerNetwork: {},
  address: '',
  transactions: {},
  pendingTransactions: {}
}

export function walletReducer(state = initialState, action: any) {
  // let tokenAllowanceIndex
  switch (action.type) {
    case UPDATE_WALLET_WEB3_PROVIDER_TYPE:
      updateLocalStorageWeb3ProviderType(action.providerType)
      return { ...state, web3ProviderType: getLocalStroageWeb3ProviderType() }

    case UPDATE_WALLET_PROVIDER_NETWORK:
      return dotProp.set(state, 'providerNetwork', action.providerNetwork)

    case UPDATE_WALLET_ADDRESS:
      return dotProp.set(state, 'address', action.address)

    case UPDATE_WALLET_BALANCE:
      return dotProp.merge(state, 'balance', action.balance)

    case UPDATE_WALLET_ALLOWANCE:
      return dotProp.merge(state, 'allowance', action.allowance)

    // case UPDATE_WALLET_TOKEN_ALLOWANCE:
    //   tokenAllowanceIndex = _.findIndex(
    //     state.tokenAllowances,
    //     (allowance) =>
    //       allowance.tokenAddress === action.tokenAllowance.tokenAddress &&
    //       allowance.spenderAddress === action.tokenAllowance.spenderAddress
    //   )
    //   if (tokenAllowanceIndex >= 0) {
    //     return dotProp.set(
    //       state,
    //       `tokenAllowances.${tokenAllowanceIndex}`,
    //       action.tokenAllowance
    //     )
    //   } else {
    //     return dotProp.merge(state, 'tokenAllowances', action.tokenAllowance)
    //   }

    case UPDATE_WALLET_PENDING_TRANSACTION:
      return dotProp.merge(
        state,
        `pendingTransactions.${action.pendingTransaction.hash}`,
        action.pendingTransaction
      )

    case REMOVE_WALLET_PENDING_TRANSACTION:
      return dotProp.delete(state, `pendingTransactions.${action.hash}`)

    case UPDATE_WALLET_TRANSACTION:
      return dotProp.merge(
        state,
        `transactions.${action.transaction.hash}`,
        action.transaction
      )

    case CLEAR_WALLET:
      updateLocalStorageWeb3ProviderType('')
      initialState.web3ProviderType = getLocalStroageWeb3ProviderType()
      return initialState

    default:
      return state
  }
}
