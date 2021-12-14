/* eslint-disable new-cap */
// import momentBC from 'moment'
import { BigNumber } from '@ethersproject/bignumber'

import * as Config from './Config'

// const infura = {
//   1: 'mainnet',
//   42: 'kovan'
// }

const ChainNativeCurrency = ({ name = '', symbol = '', decimals = 18 }) => {
  return { name, symbol, decimals }
}

const BLOCKCHAIN_CONFIG = {
  isDebug: Config.isDebug,
  isLocal: Config.isLocal,
  isIDO: Config.isIDO,
  // noLPPoolPlantformTokenAddress: '0xd3287a838892c734fb7eb984c80b52af466edcc2',
  noLPPoolPlantformTokenAddress: false,
  sliipageWarning: 0.01,
  liquidationListUrl: '/api/liquidation/page2/',
  defaultChainId: 56,
  defaultSymbol: 'BNB',
  defaultChainName: 'BSC',
  defaultRpcUrl: 'https://bsc-dataseed.binance.org/',
  defaultBlockchainBrowserUrl: 'https://bscscan.com/',
  abis: {
    ETH: {},
    HT: {
    },
    BNB: {},
    OKT: {}
  },
  CHAIN_NATIVE_CURRENCY: {
    ETH: ChainNativeCurrency({
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    }),
    BNB: ChainNativeCurrency({
      name: 'Binance Chain Native Token',
      symbol: 'BNB',
      decimals: 18
    })
  },
  tokens: {
    ETH: {
      USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
    },
    HT: {
      USDT: '0xa71edc38d189767582c38a3145b5873052c3e47a',
      WHT: '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f'
    },
    BNB: {
      WBNB: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
    },
    OKT: {
      WOKT: ''
    }
  },
  tokenPriceFromPoolList: {
    HT: ['DOGE', 'HBCH', 'UNI', 'ADA', 'EOS', 'XRP'],
    BNB: ['DOGE', 'HBCH', 'UNI', 'ADA', 'EOS', 'XRP']
  },
  tokenLeverageThirdpartyList: {
    HT: {

    },
    BNB: {

    },
    OKT: {

    }
  },
  tokensLogoUrl: {
    HT: '/static/tokens/heco/{}.png',
    BNB: '/static/tokens/bsc/{}.png',
    OKT: '/static/tokens/oec/{}.png',
    ETH: '../../../static/tokens/{}/logo.png'
  },
  BLOCK_RATE: {
    ETH: 15,
    HT: 3,
    BNB: 3,
    OKT: 4
  },
  UNISWAP_V2_SYMBOL: {
    ETH: ['UNI-V2'],
    HT: ['HMDX'],
    BNB: ['CAKE-LP'],
    OKT: ['CHE-LP', 'JLP']
  },
  SWAPEX: {
    ETH: 'app.uniswap.org',
    BNB: 'exchange.pancakeswap.finance',
  },
  plantformTokenLP: {
    address: '',
    decimals: 18,
    token0: {
      address: '',
      symbol: '',
      decimals: -1,
      price: 0.3,
      priceUsdt: 0.3
    },
    token1: {
      address: '0xeca2605f0bcf2ba5966372c99837b1f182d3d620',
      symbol: 'USDT',
      decimals: 18,
      price: 1,
      priceUsdt: 1
    },
    totalSupply: 1001806.0586052517,
    priceUsdt: 0.4756794067399671
  },
  REWARD_BLOCK_START_NUMBER: {
    HT: 5012233,
    BNB: 5012233,
    OKT: 5012233
  },
  MinStakeValue: Config.isDebug ? 0.00001 : 1,
  PREFIX_IB_TOKEN: ['d', 'y'],
  chain_symbol: 'HT',
  ZERO_ADDRESS: '0x0000000000000000000000000000000000000000',
  ZERO_BYTES32: '0x0000000000000000000000000000000000000000000000000000000000000000',
  MAX_UINT256: BigNumber.from(2).pow(BigNumber.from(256)).sub(BigNumber.from(1)),
  MAX_INT256: BigNumber.from(2).pow(BigNumber.from(255)).sub(BigNumber.from(1)),
  MIN_INT256: BigNumber.from(2).pow(BigNumber.from(255)).sub(BigNumber.from(-1)),
  bidTimeout: {
    1: 60 * 60 * 4,
    42: 60 * 60 * 4,
    128: 60 * 60 * 4,
    256: 60 * 60 * 4
  },

  EVENT_WALLET_STATE_CHANGED: 'EVENT_WALLET_STATE_CHANGED',
  EVENT_WALLET_CONNECT: 'EVENT_WALLET_CONNECT',
  EVENT_WRONGNET_WORK: 'EVENT_WRONGNET_WORK',
  EVENT_OPEN_BANK: 'EVENT_OPEN_BANK',
  EVENT_CLOSE_MASK: 'EVENT_CLOSE_MASK',
  EVENT_LOAD_DATA: 'LOAD_DATA',
  EVENT_LOAD_FINISH: 'LOAD_FINISH',
  EVENT_GET_DATA: 'EVENT_GET_DATA'
}

export default BLOCKCHAIN_CONFIG
