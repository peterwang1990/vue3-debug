import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
// import WalletConnectProvider from '@walletconnect/web3-provider'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import BLOCKCHAIN_CONFIG from '../constants/blockchain_config'
// import {
//   addLayoutGlobalMessage,
//   GlobalMessage,
//   GLOBAL_MESSAGE_TYPES
// } from '@/components/layout/layoutAction'
import TOOL from './tool'
import store from '../store'
import { configProject } from '../../configProject'
import * as Config from '../constants/Config'

const projectConfig = Config.isDebug ? configProject.test : configProject.main

let web3Provider: ethers.providers.Web3Provider | null = null
let defaultProvider: ethers.providers.BaseProvider | null = null
let isDetectingMetaMaskProvider = false

// const ChainNativeCurrency = ({ name = '', symbol = '', decimals = 18 }) => {
//   return { name, symbol, decimals }
// }

const chainMap = new Map()
chainMap.set(56, {
  chainId: `0x${Number(56).toString(16)}`,
  chainName: 'BSC',
  nativeCurrency: {
    symbol: 'BNB',
    name: 'BNB',
    decimals: 18
  },
  rpcUrls: [projectConfig.rpcurls.BNB],
  blockExplorerUrls: [projectConfig.blockchain_browser_url.BNB.replace('/tx', '')]
})
chainMap.set(128, {
  chainId: `0x${Number(128).toString(16)}`,
  chainName: 'HECO',
  nativeCurrency: {
    symbol: 'HT',
    name: 'HT',
    decimals: 18
  },
  rpcUrls: [projectConfig.rpcurls.HT],
  blockExplorerUrls: [projectConfig.blockchain_browser_url.HT.replace('/tx', '')]
})

export const WEB3_PROVIDER_TYPES = {
  META_MASK: 'META_MASK',
  WALLET_CONNECT: 'WALLET_CONNECT',
  BSC: 'BSC'
}

export const getDefaultProvider = () => {
  try {
    defaultProvider =
      defaultProvider ||
      new ethers.providers.JsonRpcProvider(BLOCKCHAIN_CONFIG.defaultRpcUrl)
    return defaultProvider
  } catch (error) {
    console.error(`getDefaultProvider Error: `, error)
  }
  return null
}

export const addMetaMaskEthereumChain = (chainId: number) => {
  if (window.ethereum) {
    (window as any).ethereum
      .request({
        method: 'wallet_addEthereumChain',
        params: [chainMap.get(chainId)]
      })
      .then((res: null) => {
        if (res === null) {
          const jsonChainInfo = JSON.stringify({
            chainId,
            chainSymbol: TOOL.getChainSymbol(false)
          })
          localStorage.setItem('chain_info', jsonChainInfo)
          store.dispatch('set_chaininfo')
        }
      })
  }
}

export const connectWeb3Provider = async (type = WEB3_PROVIDER_TYPES.META_MASK) => {
  type providerTypes = keyof typeof WEB3_PROVIDER_TYPES
  if (WEB3_PROVIDER_TYPES[type as providerTypes] !== undefined) {
    const connectType = WEB3_PROVIDER_TYPES[type as providerTypes]
    const chainId = Number(BLOCKCHAIN_CONFIG.defaultChainId)
    let provider: any = null
    try {
      if (type === WEB3_PROVIDER_TYPES.META_MASK && !isDetectingMetaMaskProvider) {
        isDetectingMetaMaskProvider = true
        provider = await detectEthereumProvider()
        isDetectingMetaMaskProvider = false
        if (_.isNil(provider)) {
          // addLayoutGlobalMessage(
          //   GlobalMessage({
          //     id: uuidv4(),
          //     type: GLOBAL_MESSAGE_TYPES.ERROR,
          //     text: 'Missing wallet: please install MetaMask browser extension and try again',
          //     hash: ''
          //   })
          // )
        } else {
          await provider.enable()
        }
      } else if (type === WEB3_PROVIDER_TYPES.WALLET_CONNECT) {
        // provider = new WalletConnectProvider({
        //   rpc: {
        //     [BLOCKCHAIN_CONFIG.defaultChainId]: BLOCKCHAIN_CONFIG.defaultRpcUrl
        //   },
        //   chainId
        // })
        // await provider.enable()
      } else if (type === WEB3_PROVIDER_TYPES.BSC) {
        if (window.BinanceChain) {
          provider = window.BinanceChain
          await window.BinanceChain.enable()
          window.BinanceChain.autoRefreshOnNetworkChange = false
          // if (!isBinanceChainRegisteredEvent) {
          //   window.BinanceChain.on('accountsChanged', () => {
          //     window.location.reload()
          //   })
          //   window.BinanceChain.on('chainChanged', () => {
          //     window.location.reload()
          //   })
          //   isBinanceChainRegisteredEvent = true
          // }
        }
      }
    } catch (error) {
      console.error('connectWeb3Provider Error: ', error)
      web3Provider = null
    }

    localStorage.setItem('web3ProviderType', type)

    try {
      if (provider) {
        web3Provider = new ethers.providers.Web3Provider(provider, 'any')
        const providerNetwork = await web3Provider.getNetwork()
        if (
          _.has(providerNetwork, 'chainId') &&
          providerNetwork.chainId.toString() !==
          BLOCKCHAIN_CONFIG.defaultChainId.toString()
        ) {
          if (type === WEB3_PROVIDER_TYPES.META_MASK) {
            // addMetaMaskEthereumChain(BLOCKCHAIN_CONFIG.defaultChainId)
          }
        } else {
          const jsonChainInfo = JSON.stringify({
            chainId: await TOOL.getChainId(false),
            chainSymbol: await TOOL.getChainSymbol(false)
          })
          localStorage.setItem('chain_info', jsonChainInfo)
          store.dispatch('set_chaininfo')
        }
      }
    } catch (error) {
      console.error('connectWeb3Provider getNetwork Error: ', error)
      // addLayoutGlobalMessage(
      //   GlobalMessage({
      //     id: uuidv4(),
      //     type: GLOBAL_MESSAGE_TYPES.ERROR,
      //     text: `Wrong network: please connect ${connectType || ''} wallet to ${BLOCKCHAIN_CONFIG.defaultChainName
      //       } network and try again`,
      //     hash: ''
      //   })
      // )
      web3Provider = null
    }

    return web3Provider
  }
  return null
}

export const getWeb3Provider = async (connectIfNil = false) => {
  try {
    if (_.isNil(web3Provider) && connectIfNil) {
      web3Provider = await connectWeb3Provider(WEB3_PROVIDER_TYPES.META_MASK)
    }
    return web3Provider
  } catch (error) {
    console.error('getWeb3Provider Error', error)
  }
  return null
}

export const getWalletProvider = async () => {
  const web3ProviderType = localStorage.getItem('web3ProviderType')
  if (web3ProviderType && Object.keys(WEB3_PROVIDER_TYPES).includes(web3ProviderType)) {
    return await connectWeb3Provider(web3ProviderType)
  }
  return null
}

getDefaultProvider()
