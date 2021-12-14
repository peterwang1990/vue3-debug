/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
// @ts-ignore
import { aggregate as aggregateTool } from '@makerdao/multicall'
// import { JsonRpcProvider as JsonRpcProviderTool } from '@ethersproject/providers'
// import BigNumber from 'bignumber.js'
// import uniswapPairV2Tool from '../abis/IUniswapV2Pair.json'
import BigNumber from 'bignumber.js'
// import ContractTool from 'web3-eth-contract'
// import BigNumberTool from 'bignumber.js'
import NETWORKS from '../constants/networks'
import Store from '../store'
import BLOCKCHAIN_CONFIG from '../constants/blockchain_config'
import ERC20TOOL from '../abis/ERC20.json'
import IMdexFactory from '../abis/IMdexFactory.json'
import { getWeb3Provider } from './provider'
import { configProject } from '../../configProject'
import * as Config from '../constants/Config'

const ContractTool = require('web3-eth-contract')

// const Web3HttpProvider = require('web3-providers-http')

// const optionsTool = {
//   keepAlive: true,
//   timeout: 10000, // milliseconds,
//   headers: [{ name: 'Access-Control-Allow-Origin', value: '*' }],
//   withCredentials: false
// }
// let provider: JsonRpcProviderTool = new JsonRpcProviderTool(
//   BLOCKCHAIN_CONFIG.defaultRpcUrl
// )

// if (typeof ethereumTool === 'undefined' || ethereumTool.chainId === null) {
//   provider = new ethersTool.providers.JsonRpcProvider(BLOCKCHAIN_CONFIG.defaultRpcUrl)
// } else {
//   provider = new ethersTool.providers.Web3Provider(window.ethereum)
// }

// const tpTool = require('tp-js-sdk')

const tool = {
  getUserBrowserDefaultLang() {
    let lang = navigator.language || navigator.userLanguage // 常规浏览器语言和IE浏览器
    lang = lang.substr(0, 2)
    if (lang !== 'zh') {
      lang = 'en'
    }
    return lang
  },

  getPageLang(langPara: string) {
    let lang = langPara

    // let lang = Store.getters.lang

    if (typeof lang === 'undefined' || lang === 'undefined' || lang.length === 0) {
      lang = Store.getters.lang
      if (typeof lang === 'undefined' || lang === 'undefined' || lang.length === 0) {
        lang = this.getUserBrowserDefaultLang()
      }
    }

    // localStorage.setItem('lang', this.lang)
    // Store.dispatch('set_lang')

    return lang
  },

  canPageScroll(flag: boolean) {
    const m = function (e: any) {
      e.preventDefault()
    }
    if (!flag) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', m, { passive: false }) // 禁止页面滑动
    } else {
      document.body.style.overflow = ''
      document.removeEventListener('touchmove', m, {}) // 允许页面滑动
    }
  },

  checkNullObj(obj: any) {
    return Object.keys(obj).length === 0
  },

  getLangLink(langSet: string) {
    const localLang = this.getUserBrowserDefaultLang()

    let displayLang = window.location.pathname.replace('zh/', '').replace('en/', '')

    if (localLang !== langSet) {
      if (
        window.location.pathname.substr(window.location.pathname.length - 1, 1) === '/'
      ) {
        displayLang = `${window.location.pathname + langSet}/`
      } else {
        displayLang = `${window.location.pathname}/${langSet}/`
      }
    }

    return displayLang
  },

  getLangLinkByLink(langSet: string, link: string) {
    // const localLangLink = this.getUserBrowserDefaultLang()

    const displayLang = link.replace('zh/', '').replace('en/', '')

    // if (localLangLink !== lang_set) {
    //     if (link.substr(link.length - 1, 1) === "/") {
    //         displayLang = link + lang_set + "/"
    //     } else {
    //         displayLang = link + "/" + lang_set + "/"
    //     }
    //
    // }

    return displayLang
  },

  isEnglish(str: string) {
    return /[a-zA-Z]+/.test(str)
  },

  sortByKey(array: Array<any>, key: any) {
    return array.sort(function (a, b) {
      const x = a[key]
      const y = b[key]

      if (x < y) {
        return -1
      }
      if (x > y) {
        return 1
      }
      return 0

      // return x < y ? -1 : x > y ? 1 : 0
    })
  },

  // awaitWrap(promise:any) {
  //   return promise
  //     .then((data) => [null, data])
  //     .catch(err => [err, null])
  // },

  formatBigNumber(bn: BigNumber, decimals: number) {
    if (bn.toNumber() === 0) {
      return '0'
    }
    if (bn.toNumber() < 1) {
      return bn.toFixed(decimals).toString()
    }
    return bn.toString()
  },

  formatNumber(number: number) {
    if (number.toString().includes('.')) {
      const arrNumber = number.toString().split('.')
      if (arrNumber[1].length <= 9) {
        return number.toString()
      }
      const arr = []
      let lastChar = ''
      arrNumber.forEach((char) => {
        if (char === '0') {
          arr.push(char)
        } else if (lastChar === '0' || lastChar === '') {
          throw new Error()
        }
        lastChar = char
      })

      // for (const char of arrNumber[1]) {
      // }

      return number.toFixed(arr.length + 2)
    }
    return number.toString()
  },
  toNonExponential(num: number) {
    if (num.toString().includes('e')) {
      const m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/)
      if (m) {
        return num.toFixed(Math.max(0, (m[1] || '').length - (m[2] as any)))
      }
    }
    return num
  },
  // getLPFormatNumber(number, maxNumber) {
  //   if (parseFloat(number) > maxNumber) {
  //     number = maxNumber.toString()
  //   }
  //   if (number.includes('e')) {
  //     number = parseFloat(number).toFixed(9)
  //   }
  //   if (number.includes('.')) {
  //     const arr = number.split('.')
  //     if (arr[1].length > 18) {
  //       return arr[0] + '.' + arr[1].substr(0, 18)
  //     } else {
  //       return number
  //     }
  //   } else {
  //     return number
  //   }
  // },

  async getChainSymbol(hasDefault = true) {
    const web3Provider = await getWeb3Provider()
    let symbol = hasDefault ? BLOCKCHAIN_CONFIG.defaultSymbol : ''
    if (web3Provider !== null) {
      const providerNetwork = await web3Provider.getNetwork()
      if (providerNetwork.chainId && providerNetwork.chainId > 0) {
        const { chainId } = providerNetwork
        const chainIdObj = this.getDynamicObject(chainId.toString(), NETWORKS)
        symbol = chainIdObj.symbol
      }
    }
    return symbol
  },
  async getChainId(hasDefault = true) {
    const web3Provider = await getWeb3Provider()
    const chainId = hasDefault ? BLOCKCHAIN_CONFIG.defaultChainId : -1
    if (web3Provider !== null) {
      const providerNetwork = await web3Provider.getNetwork()
      if (providerNetwork.chainId && providerNetwork.chainId > 0) {
        const { chainId } = providerNetwork
        return chainId
      }
    } else {
      return BLOCKCHAIN_CONFIG.defaultChainId
    }
    return chainId
  },

  getTokenByAddressAndChainSymbol(address: string, chainSymbol: string) {
    const chainSymbolObj = this.getDynamicObject(
      chainSymbol,
      BLOCKCHAIN_CONFIG.tokensLogoUrl
    )
    if (chainSymbol !== null) {
      return chainSymbolObj.replace('{}', address)
    }
    return ''
  },

  async getTokenByAddress(address: string) {
    const chainSymbol = await this.getChainSymbol()
    const chainSymbolObj = this.getDynamicObject(
      chainSymbol,
      BLOCKCHAIN_CONFIG.tokensLogoUrl
    )
    if (chainSymbol !== null) {
      return chainSymbolObj.replace('{}', address)
    }
    return ''
  },
  // async dealWalletAddress() {
  //   const isDebugWallet = false
  //   // const debugWalletAddress = '0xe1B3A029cE1a22A3B2B96e50E866d0E81BE4A5D0'
  //   // const debugWalletAddress = '0xbE7aa1D730909eaDae032AAb64cfd3c4db73b024'
  //   // const debugWalletAddress = '0x4e42e3f3936e9b417fa095374de633166a99bdf1'
  //   const debugWalletAddress = '0x9a9c6bf7aa60e287bf8e8b127ffc57be3f8bdf88'
  //   if (isDebugWallet) {
  //     return debugWalletAddress
  //   }
  //   let walletAddress = ''
  //   const ethereumWallet = window.ethereum
  //   const Web3EthTool = new EthTool(ethereumWallet)
  //   const accounts = await Web3EthTool.getAccounts()
  //   if (accounts && accounts.length > 0) {
  //     walletAddress = accounts[0]
  //     if (walletAddress && walletAddress.length > 0) {
  //       if (Store.getters.isLogin) {
  //         Store.dispatch('remove_user')
  //       }
  //       localStorage.setItem('wallet_address', walletAddress)
  //       Store.dispatch('set_user')
  //       return walletAddress
  //     }
  //   } else if (
  //     ethereumWallet &&
  //     ethereumWallet.selectedAddress !== null &&
  //     ethereumWallet.selectedAddress.length > 0
  //   ) {
  //     walletAddress = ethereumWallet.selectedAddress
  //     console.log(walletAddress)
  //     if (walletAddress && walletAddress.length > 0) {
  //       if (Store.getters.isLogin) {
  //         Store.dispatch('remove_user')
  //       }
  //       localStorage.setItem('wallet_address', walletAddress)
  //       Store.dispatch('set_user')
  //       return walletAddress
  //     }
  //   } else {
  //     walletAddress = Store.getters.walletAddress
  //     if (walletAddress && walletAddress.length > 0) {
  //       return walletAddress
  //     }
  //   }
  //   return ''
  // },

  async getPoolWeight(poolId: number, starPoolsContract: any) {
    const { allocPoint } = await starPoolsContract.methods.poolInfo(poolId).call()
    const totalAllocPoint = await starPoolsContract.methods.totalAllocPoint().call()
    return allocPoint / totalAllocPoint
  },

  async caculateTokenAndLPPriceV1FromTokenPair(
    token0Address: any,
    token1Address: any,
    uniswapFactoryContract: any,
    multicallConfig: any,
    usdtAddress: any
  ) {
    try {
      // const chain_symbol = this.getChainSymbol(ethereumTool)
      const lpAddress = await uniswapFactoryContract.methods
        .getPair(token0Address, token1Address)
        .call()

      if (
        lpAddress &&
        lpAddress.length > 0 &&
        lpAddress !== BLOCKCHAIN_CONFIG.ZERO_ADDRESS
      ) {
        return await this.caculateTokenAndLPPriceV1FromLP(
          lpAddress,
          uniswapFactoryContract,
          multicallConfig,
          usdtAddress
        )
      }
      console.error(`No LP: ${token0Address}|${token1Address}`)
    } catch (e) {
      console.error(e)
    }
    return null
  },

  async caculateTokenAndLPPriceV1FromLPOnlyUSDT(
    lpAddress: string,
    multicallConfig: any
  ) {
    return this.caculateTokenAndLPPriceV1FromLP(lpAddress, null, multicallConfig, null)
  },

  // async caculateDesirePrice(lpAddress, multicallConfig) {
  //   const returnValueTool = await aggregateTool(
  //     [
  //       {
  //         target: lpAddress,
  //         call: ['getReserves()(uint112,uint112,uint112)'],
  //         returns: [
  //           ['TOKEN0_RESERVES', (val) => val.toString()],
  //           ['TOKEN1_RESERVES', (val) => val.toString()],
  //           ['BLOCK_TIMESTAMP_LAST', (val) => val.toString()]
  //         ]
  //       }
  //     ],
  //     multicallConfig
  //   )

  //   const { TOKEN0_RESERVES } = returnValueTool.results.transformed
  //   const { TOKEN1_RESERVES } = returnValueTool.results.transformed

  //   return { token0Resevers: TOKEN0_RESERVES, token1Resevers: TOKEN1_RESERVES }
  // },

  caculateTokenAndLPPriceV1FromLPNoBaseInfoFaster(
    index: number,
    lpObj: any,
    vueInstance: any
  ) {
    let calls: any[] = []
    try {
      // console.log(lpObj)
      calls = calls.concat([
        {
          target: lpObj.address,
          call: ['totalSupply()(uint256)'],
          returns: [[`TOTALSUPPLY_${index}`, (val: any) => val]]
        },
        {
          target: lpObj.token0.address,
          call: ['balanceOf(address)(uint256)', lpObj.address],
          returns: [[`TOKEN0_AMOUNT_${index}`, (val: any) => val]]
        },
        {
          target: lpObj.token1.address,
          call: ['balanceOf(address)(uint256)', lpObj.address],
          returns: [[`TOKEN1_AMOUNT_${index}`, (val: any) => val]]
        }
      ])
      let isFromOracle = false
      const token0Symbol = lpObj.token0.symbol
      const token1Symbol = lpObj.token1.symbol

      const tokenPriceFromPollList = this.getDynamicObject(
        vueInstance.chain_symbol,
        BLOCKCHAIN_CONFIG.tokenPriceFromPoolList
      )

      if (
        tokenPriceFromPollList.indexOf(token0Symbol) < 0 &&
        tokenPriceFromPollList.indexOf(token1Symbol) < 0
      ) {
        isFromOracle = true
      }

      if (isFromOracle) {
        if (
          lpObj.token0.address.toLowerCase() ===
            vueInstance.$networkenv.tokens[
              vueInstance.chain_symbol
            ].USDT.toLowerCase() ||
          lpObj.token1.address.toLowerCase() ===
            vueInstance.$networkenv.tokens[vueInstance.chain_symbol].USDT.toLowerCase()
        ) {
          if (
            lpObj.token0.address.toLowerCase() ===
            vueInstance.$networkenv.tokens[vueInstance.chain_symbol].USDT.toLowerCase()
          ) {
            calls = calls.concat([
              {
                target: vueInstance.$networkenv.abis[vueInstance.chain_symbol].Oracle,
                call: ['getPrice(address)(uint256)', lpObj.token1.address],
                returns: [[`TOKEN1_PRICE_USD_${index}`, (val: any) => val / 10 ** 8]]
              }
            ])
          } else {
            calls = calls.concat([
              {
                target: vueInstance.$networkenv.abis[vueInstance.chain_symbol].Oracle,
                call: ['getPrice(address)(uint256)', lpObj.token0.address],
                returns: [[`TOKEN0_PRICE_USD_${index}`, (val: any) => val / 10 ** 8]]
              }
            ])
          }
        } else {
          calls = calls.concat([
            {
              target: vueInstance.$networkenv.abis[vueInstance.chain_symbol].Oracle,
              call: ['getPrice(address)(uint256)', lpObj.token0.address],
              returns: [[`TOKEN0_PRICE_USD_${index}`, (val: any) => val / 10 ** 8]]
            },
            {
              target: vueInstance.$networkenv.abis[vueInstance.chain_symbol].Oracle,
              call: ['getPrice(address)(uint256)', lpObj.token1.address],
              returns: [[`TOKEN1_PRICE_USD_${index}`, (val: any) => val / 10 ** 8]]
            }
          ])
        }
      }
    } catch (e) {
      console.error(e)
      console.error(lpObj)
    }
    return calls
  },

  async caculateTokenAndLPPriceV1FromLPNoBaseInfo(
    lpObj: any,
    uniswapFactoryContract: any,
    multicallConfig: any,
    usdtAddress: any,
    vueInstance: any
  ) {
    try {
      // console.log(lpObj)
      let calls = [
        {
          target: lpObj.address,
          call: ['totalSupply()(uint256)'],
          returns: [['TOTALSUPPLY', (val: any) => val]]
        },
        {
          target: lpObj.token0.address,
          call: ['balanceOf(address)(uint256)', lpObj.address],
          returns: [['TOKEN0_AMOUNT', (val: any) => val]]
        },
        {
          target: lpObj.token1.address,
          call: ['balanceOf(address)(uint256)', lpObj.address],
          returns: [['TOKEN1_AMOUNT', (val: any) => val]]
        },
        {
          target: vueInstance.$networkenv.abis[vueInstance.chain_symbol].Oracle,
          call: [
            'getPrice(address)(uint256)',
            vueInstance.$networkenv.tokens[vueInstance.chain_symbol].USDT
          ],
          returns: [['TOKEN_PRICE_USDT_USD', (val: number) => val / 10 ** 8]]
        }
      ]
      const baseUSDToken =
        vueInstance.chain_symbol === 'BNB'
          ? vueInstance.$networkenv.tokens[vueInstance.chain_symbol].BUSD.toLowerCase()
          : vueInstance.$networkenv.tokens[vueInstance.chain_symbol].USDT.toLowerCase()
      if (
        lpObj.token0.address.toLowerCase() === baseUSDToken ||
        lpObj.token1.address.toLowerCase() === baseUSDToken
      ) {
        if (lpObj.token0.address.toLowerCase() === baseUSDToken) {
          calls = calls.concat([
            {
              target: vueInstance.$networkenv.abis[vueInstance.chain_symbol].Oracle,
              call: ['getPrice(address)(uint256)', lpObj.token1.address],
              returns: [['TOKEN1_PRICE_USD', (val: any) => val / 10 ** 8]]
            }
          ])
        } else {
          calls = calls.concat([
            {
              target: vueInstance.$networkenv.abis[vueInstance.chain_symbol].Oracle,
              call: ['getPrice(address)(uint256)', lpObj.token0.address],
              returns: [['TOKEN0_PRICE_USD', (val: any) => val / 10 ** 8]]
            }
          ])
        }
      } else {
        calls = calls.concat([
          {
            target: vueInstance.$networkenv.abis[vueInstance.chain_symbol].Oracle,
            call: ['getPrice(address)(uint256)', lpObj.token0.address],
            returns: [['TOKEN0_PRICE_USD', (val: any) => val / 10 ** 8]]
          },
          {
            target: vueInstance.$networkenv.abis[vueInstance.chain_symbol].Oracle,
            call: ['getPrice(address)(uint256)', lpObj.token1.address],
            returns: [['TOKEN1_PRICE_USD', (val: any) => val / 10 ** 8]]
          }
        ])
      }
      const returnValueTool = await aggregateTool(calls, multicallConfig)

      lpObj.totalSupply = new BigNumber(
        returnValueTool.results.transformed.TOTALSUPPLY.toString()
      )
        .div(10 ** lpObj.decimals)
        .toNumber()
      lpObj.token0.amount = new BigNumber(
        returnValueTool.results.transformed.TOKEN0_AMOUNT.toString()
      )
        .div(10 ** lpObj.token0.decimals)
        .toNumber()
      lpObj.token1.amount = new BigNumber(
        returnValueTool.results.transformed.TOKEN1_AMOUNT.toString()
      )
        .div(10 ** lpObj.token1.decimals)
        .toNumber()

      // console.log('3 --- all muticall end')
      // console.log(lpObj)

      lpObj.token0.price = lpObj.token1.amount / lpObj.token0.amount
      lpObj.token1.price = lpObj.token0.amount / lpObj.token1.amount

      const priceUSDT2USD = returnValueTool.results.transformed.TOKEN_PRICE_USDT_USD

      if (
        lpObj.token0.address.toLowerCase() === baseUSDToken ||
        lpObj.token1.address.toLowerCase() === baseUSDToken
      ) {
        if (lpObj.token0.address.toLowerCase() === baseUSDToken) {
          lpObj.token0.priceUsdt = 1
          lpObj.token1.priceUsdt =
            returnValueTool.results.transformed.TOKEN1_PRICE_USD / priceUSDT2USD
        } else {
          lpObj.token0.priceUsdt =
            returnValueTool.results.transformed.TOKEN0_PRICE_USD / priceUSDT2USD
          lpObj.token1.priceUsdt = 1
        }
      } else {
        lpObj.token0.priceUsdt =
          returnValueTool.results.transformed.TOKEN0_PRICE_USD / priceUSDT2USD
        lpObj.token1.priceUsdt =
          returnValueTool.results.transformed.TOKEN1_PRICE_USD / priceUSDT2USD
      }

      // if (lpObj.token1.symbol === ('USDT')) {
      //     lpObj.token1.priceUsdt = 1
      // } else {
      //     // console.log('4 --- calc usdt price...')
      //     // console.log(lpObj)
      //     // if(lpObj.token0.symbol.indexOf('F') !== 0){
      //     //   usdtAddress = '0xa71edc38d189767582c38a3145b5873052c3e47a'
      //     // }
      //     // if(lpObj.token1.symbol === 'WHT'){
      //     //     console.log(lpObj)
      //     // }
      //     const lpToken1UsdtLPInfo = await this.caculateTokenAndLPPriceV1FromTokenPair(lpObj.token1.address, usdtAddress, uniswapFactoryContract, multicallConfig, usdtAddress)
      //
      //     // if(lpObj.token1.symbol === 'WHT'){
      //     //     console.log(lpToken1UsdtLPInfo)
      //     // }
      //
      //     lpObj.token1.priceUsdt = lpToken1UsdtLPInfo.token0.price
      // }
      //
      // lpObj.token0.priceUsdt = lpObj.token0.price * lpObj.token1.priceUsdt

      const token0Pie = (1 / lpObj.totalSupply) * lpObj.token0.amount
      const token1Pie = (1 / lpObj.totalSupply) * lpObj.token1.amount

      let lpPrice = 0
      lpPrice += lpObj.token0.priceUsdt * token0Pie
      lpPrice += lpObj.token1.priceUsdt * token1Pie

      lpObj.priceUsdt = lpPrice
    } catch (e) {
      console.error(e)
      console.error(lpObj)
    }
    return lpObj
  },

  async caculateTokenAndLPPriceV1FromLP(
    lpAddress: string,
    uniswapFactoryContract: null,
    multicallConfig: any,
    usdtAddress: string | null
  ) {
    const lpObj: any = {}
    try {
      lpObj.address = lpAddress

      // console.log('0 --- ' + lpAddress)

      let returnValueTool = await aggregateTool(
        [
          {
            target: lpObj.address,
            call: ['token0()(address)'],
            returns: [['TOKEN0_ADDRESS', (val: any) => val]]
          },
          {
            target: lpObj.address,
            call: ['token1()(address)'],
            returns: [['TOKEN1_ADDRESS', (val: any) => val]]
          },
          {
            target: lpObj.address,
            call: ['decimals()(uint256)'],
            returns: [['DECIMALS', (val: any) => parseInt(val, 10)]]
          }
        ],
        multicallConfig
      )

      lpObj.decimals = returnValueTool.results.transformed.DECIMALS
      lpObj.token0 = {
        address: returnValueTool.results.transformed.TOKEN0_ADDRESS
      }
      lpObj.token1 = {
        address: returnValueTool.results.transformed.TOKEN1_ADDRESS
      }

      // console.log('1 --- 0:' + lpObj.token0.address + " --- 1:" + lpObj.token1.address)
      // console.log(lpObj)

      const token0Contract = new ContractTool(ERC20TOOL, lpObj.token0.address)
      const token0SymbolTemp = await token0Contract.methods.symbol().call()

      // console.log('1.1 --- ' + token0_symbol_temp)
      // console.log(lpObj)

      if (token0SymbolTemp.includes('USD')) {
        const token0AddrTemp = lpObj.token0.address
        lpObj.token0.address = lpObj.token1.address
        lpObj.token1.address = token0AddrTemp
      }

      // console.log('2 --- ' + token0_symbol_temp)
      // console.log(lpObj)

      returnValueTool = await aggregateTool(
        [
          {
            target: lpObj.address,
            call: ['totalSupply()(uint256)'],
            returns: [['TOTALSUPPLY', (val: any) => val]]
          },
          {
            target: lpObj.token0.address,
            call: ['symbol()(string)'],
            returns: [['TOKEN0_SYMBOL', (val: any) => val]]
          },
          {
            target: lpObj.token0.address,
            call: ['decimals()(uint256)'],
            returns: [['TOKEN0_DECIMALS', (val: any) => parseInt(val, 10)]]
          },
          {
            target: lpObj.token0.address,
            call: ['balanceOf(address)(uint256)', lpObj.address],
            returns: [['TOKEN0_AMOUNT', (val: any) => val]]
          },
          {
            target: lpObj.token1.address,
            call: ['symbol()(string)'],
            returns: [['TOKEN1_SYMBOL', (val: any) => val]]
          },
          {
            target: lpObj.token1.address,
            call: ['decimals()(uint256)'],
            returns: [['TOKEN1_DECIMALS', (val: any) => parseInt(val, 10)]]
          },
          {
            target: lpObj.token1.address,
            call: ['balanceOf(address)(uint256)', lpObj.address],
            returns: [['TOKEN1_AMOUNT', (val: any) => val]]
          }
        ],
        multicallConfig
      )

      lpObj.totalSupply = new BigNumber(
        returnValueTool.results.transformed.TOTALSUPPLY.toString()
      )
        .div(10 ** lpObj.decimals)
        .toNumber()
      lpObj.token0.symbol = returnValueTool.results.transformed.TOKEN0_SYMBOL
      lpObj.token0.decimals = returnValueTool.results.transformed.TOKEN0_DECIMALS
      lpObj.token0.amount = new BigNumber(
        returnValueTool.results.transformed.TOKEN0_AMOUNT.toString()
      )
        .div(10 ** lpObj.token0.decimals)
        .toNumber()
      lpObj.token1.symbol = returnValueTool.results.transformed.TOKEN1_SYMBOL
      lpObj.token1.decimals = returnValueTool.results.transformed.TOKEN1_DECIMALS
      lpObj.token1.amount = new BigNumber(
        returnValueTool.results.transformed.TOKEN1_AMOUNT.toString()
      )
        .div(10 ** lpObj.token1.decimals)
        .toNumber()

      // console.log('3 --- all muticall end')
      // console.log(lpObj)

      lpObj.token0.price = lpObj.token1.amount / lpObj.token0.amount
      lpObj.token1.price = lpObj.token0.amount / lpObj.token1.amount

      if (lpObj.token1.address.toLowerCase() === usdtAddress!.toLowerCase()) {
        lpObj.token1.priceUsdt = 1
      } else {
        const lpToken1UsdtLPInfo = await this.caculateTokenAndLPPriceV1FromTokenPair(
          lpObj.token1.address,
          usdtAddress,
          uniswapFactoryContract,
          multicallConfig,
          usdtAddress
        )

        lpObj.token1.priceUsdt = lpToken1UsdtLPInfo.token0.price
      }

      lpObj.token0.priceUsdt = lpObj.token0.price * lpObj.token1.priceUsdt

      const token0Pie = (1 / lpObj.totalSupply) * lpObj.token0.amount
      const token1Pie = (1 / lpObj.totalSupply) * lpObj.token1.amount

      let lpPrice = 0
      lpPrice += lpObj.token0.priceUsdt * token0Pie
      lpPrice += lpObj.token1.priceUsdt * token1Pie

      lpObj.priceUsdt = lpPrice
    } catch (e) {
      console.error(e)
      console.error(lpObj)
    }
    return lpObj
  },

  // async caculateTokenPrice(
  //   tokenSymbol: string | string[],
  //   tokenContract: any,
  //   starPoolsContract: any,
  //   orcalContract: any,
  //   usdtAddress: any
  // ) {
  //   const totalValue = await tokenContract.methods
  //     .balanceOf(starPoolsContract._address)
  //     .call()
  //   const decimal = await tokenContract.methods.decimals().call()
  //   if (tokenSymbol.includes('USD')) {
  //     return {
  //       totalUsdtValue: totalValue / Math.pow(10, decimal),
  //       tokenPriceInWeth: 1
  //     }
  //   }
  //   let price = 0
  //   try {
  //     price = await orcalContract.methods
  //       .consult(
  //         tokenContract._address,
  //         string(Math.pow(10, parseInt(decimal))),
  //         usdtAddress
  //       )
  //       .call()
  //   } catch (error) {
  //     console.log(tokenSymbol, 'get price', error)
  //   }
  //   return {
  //     totalUsdtValue: ((totalValue / Math.pow(10, decimal)) * price) / Math.pow(10, 18),
  //     tokenPriceInUsdt: price / Math.pow(10, 18)
  //   }
  // },

  // async caculateLPPrice(
  //   lpContract: {
  //     methods: {
  //       totalSupply: () => { (): any; new (): any; call: { (): any; new (): any } }
  //       decimals: () => { (): any; new (): any; call: { (): any; new (): any } }
  //     }
  //     _address: any
  //   },
  //   tokenQueryContract: {
  //     methods: {
  //       balanceOf: (arg0: any) => {
  //         (): any
  //         new (): any
  //         call: { (): any; new (): any }
  //       }
  //     }
  //     _address: any
  //   },
  //   starPoolsContract: { _address: any },
  //   orcalContract: {
  //     methods: {
  //       consult: (
  //         arg0: any,
  //         arg1: any,
  //         arg2: any
  //       ) => {
  //         (): any
  //         new (): any
  //         call: { (): number | PromiseLike<number>; new (): any }
  //       }
  //     }
  //   },
  //   usdtAddress: any
  // ) {
  //   const totalSupply = await lpContract.methods.totalSupply().call()
  //   // chef的总量
  //   const balance = await tokenQueryContract.methods
  //     .balanceOf(starPoolsContract._address)
  //     .call()
  //   const decimal = await lpContract.methods.decimals().call()
  //   let price = 0
  //   try {
  //     price = await orcalContract.methods
  //       .consult(
  //         tokenQueryContract._address,
  //         string(Math.pow(10, decimal)),
  //         usdtAddress
  //       )
  //       .call()
  //   } catch (error) {
  //     console.error('lp get price', error)
  //   }
  //   const tokenAmount = await tokenQueryContract.methods
  //     .balanceOf(lpContract._address)
  //     .call()
  //   // 份额
  //   const portionLp = balance / totalSupply
  //   const totalAmount = (tokenAmount * portionLp) / Math.pow(10, decimal)
  //   return {
  //     totalUsdtValue: ((totalAmount * price) / Math.pow(10, 18)) * 2,
  //     tokenPriceInUsdt: price / Math.pow(10, 18)
  //   }
  // },

  scientificToNumber(num: any) {
    let str = num
    if (typeof num === 'number') {
      str = num.toString()
    }

    const regFloatExp = /^(\d+\.\d+)(e)([-]?\d+)$/
    const regIntegerExp = /^(\d+)(e)([-]?\d+)$/
    let arr
    let len
    let zero = ''

    if (!regFloatExp.test(str)) {
      if (!regIntegerExp.test(str)) {
        return str
      }
      arr = regIntegerExp.exec(str)
      if (arr) {
        len = Math.abs(Number(arr[3])) - 1
        for (let i = 0; i < len; i += 1) {
          zero += '0'
        }
        return `0.${zero}${arr[1]}`
      }
    }
    /* 6e-7 需要手动转换 */
    arr = regFloatExp.exec(str)
    if (arr) {
      len = Math.abs(Number(arr[3])) - 1
      for (let i = 0; i < len; i += 1) {
        zero += '0'
      }
      return `0.${zero}${arr[1].replace('.', '')}`
    }
    return str
  },

  formatFloatNumber(numStr: string, decimals: any) {
    const typeofStr = typeof numStr
    if (typeofStr === 'number') {
      numStr = numStr.toString()
    } else if (typeofStr === 'object') {
      numStr = numStr.toString()
      // console.log(numStr)
    } else if (typeofStr === 'undefined') {
      return '---'
    }

    if (parseInt(numStr, 10) === 0 && numStr.length === 1) {
      return '0'
    }

    const regFloatExp = /^\d+\.\d+$/
    const regFormatFloat = new RegExp(`^\\d+(?:\\.\\d{0,${decimals}})?`, 'g')

    if (numStr.indexOf('e') >= 0) {
      return this.scientificToNumber(numStr).match(regFormatFloat).toString()
    }

    if (regFloatExp.test(numStr)) {
      const result = numStr.match(regFormatFloat)
      if (result !== null) {
        return result.toString()
      }
    }
    return numStr
  },

  dateTransform(seconds: number) {
    let [day, hour, minute, second] = [0, 0, 0, 0] // 初始化
    if (seconds > 0) {
      day = Math.floor(seconds / (60 * 60 * 24))
      hour = Math.floor(seconds / (60 * 60)) - day * 24
      minute = Math.floor(seconds / 60) - day * 24 * 60 - hour * 60
      second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60
    }
    // 小于10的，在前面加0
    const dayResult = day < 10 ? `0${day}` : day
    const hourResult = hour < 10 ? `0${hour}` : hour
    const minuteResult = minute < 10 ? `0${minute}` : minute
    const secondResult = second < 10 ? `0${second}` : second
    if (day >= 1) {
      return `${dayResult} days`
    }
    return `${hourResult}:${minuteResult}:${secondResult}`
  },

  dateTransformLong(seconds: number) {
    let [day, hour, minute, second] = [0, 0, 0, 0] // 初始化
    if (seconds > 0) {
      day = Math.floor(seconds / (60 * 60 * 24))
      hour = Math.floor(seconds / (60 * 60)) - day * 24
      minute = Math.floor(seconds / 60) - day * 24 * 60 - hour * 60
      second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60
    }
    // 小于10的，在前面加0
    const dayResult = day < 10 ? `0${day}` : day
    const hourResult = hour < 10 ? `0${hour}` : hour
    const minuteResult = minute < 10 ? `0${minute}` : minute
    const secondResult = second < 10 ? `0${second}` : second

    return [dayResult, hourResult, minuteResult, secondResult]

    // if(day >= 1){
    //   return day + " days " + hour + " hours " + minute + " mins " + second + " secs "
    // }else{
    //   return hour + " hours " + minute + " mins " + second + " secs "
    // }
  },

  getPendingTextHtml(text: any) {
    const pendingHtml =
      "<svg class='rotate-circle' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='#6F4397' style='width: 16px;height: 16px;margin-left:5px;margin-top:0px'><path d='M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'></path></svg>"
    return `<div class='item-flex-center' style='align-items: center;'><span>${text}</span>${pendingHtml}</div>`
  },

  retainDecimals(numStr: string, decimal: number) {
    if (typeof numStr === 'string') {
      numStr = numStr.toString()
    }
    const index = numStr.indexOf('.')
    if (index !== -1) {
      numStr = numStr.substring(0, decimal + index + 1)
    } else {
      numStr = numStr.substring(0)
    }
    return Math.floor(parseFloat(numStr) * 10 ** decimal) / 10 ** decimal
  },

  zeroize(num: number) {
    return (num.toString().length === 1 ? '0' : '') + num
  },

  timestampFormat(timestamp: number) {
    const curTimestamp = parseInt((new Date().getTime() / 1000).toString(), 10) // 当前时间戳
    const timestampDiff = curTimestamp - timestamp // 参数时间戳与当前时间戳相差秒数

    const curDate = new Date(curTimestamp * 1000) // 当前时间日期对象
    const tmDate = new Date(timestamp * 1000) // 参数时间戳转换成的日期对象

    const Y = tmDate.getFullYear()
    const m = tmDate.getMonth() + 1
    const d = tmDate.getDate()
    const H = tmDate.getHours()
    const i = tmDate.getMinutes()
    // const s = tmDate.getSeconds()

    if (timestampDiff < 60) {
      // 一分钟以内
      return '刚刚'
    }
    if (timestampDiff < 3600) {
      // 一小时前之内
      return `${Math.floor(timestampDiff / 60)}分钟前`
    }
    if (
      curDate.getFullYear() === Y &&
      curDate.getMonth() + 1 === m &&
      curDate.getDate() === d
    ) {
      return `今天${this.zeroize(H)}:${this.zeroize(i)}`
    }
    const newDate = new Date((curTimestamp - 86400) * 1000) // 参数中的时间戳加一天转换成的日期对象
    if (
      newDate.getFullYear() === Y &&
      newDate.getMonth() + 1 === m &&
      newDate.getDate() === d
    ) {
      return `昨天${this.zeroize(H)}:${this.zeroize(i)}`
    }
    if (curDate.getFullYear() === Y) {
      return `${this.zeroize(m)}月${this.zeroize(d)}日 ${this.zeroize(
        H
      )}:${this.zeroize(i)}`
    }
    return `${Y}年${this.zeroize(m)}月${this.zeroize(d)}日 ${this.zeroize(
      H
    )}:${this.zeroize(i)}`
  },

  getTotalApy(
    apyFarm: number,
    feeRefund: number,
    borrowApy: number,
    plantformApy: number,
    plantformBorrowSubsidyApy: any,
    boxBorrowSubsidyApy: any,
    lavarage: number
  ) {
    const capital = 1
    const dailyAPR = apyFarm / 365
    const refundCount = (60 / 15) * 24
    // const refundCount=24503
    const amountYear =
      capital * (1 + ((dailyAPR / refundCount) * 1) / 100) ** (refundCount * 365)
    const apyRefund = ((amountYear - capital) / capital) * 100
    const result =
      (apyRefund + plantformApy) * lavarage +
      (plantformBorrowSubsidyApy + boxBorrowSubsidyApy - borrowApy) * (lavarage - 1)

    if (Number.isNaN(result)) {
      return '---'
    }
    return result.toFixed(2)
  },

  getDeviceScreenIsPC() {
    if (document.documentElement.clientWidth > 1140) {
      return true
    }
    if (document.documentElement.clientWidth < 360) {
      window.resizeTo(360, document.documentElement.clientHeight)
    }
    return false
  },

  dealSwapMap(vueInstance: any) {
    const map = new Map()
    if (vueInstance.chain_symbol === 'BNB') {
      const { chainSymbol } = vueInstance
      const swapList = ['PANCAKE', 'MDEX']

      for (let i = 0; i < swapList.length; i += 1) {
        const ele = swapList[i]
        map.set(ele, {
          Factory: vueInstance.$networkenv.abis[chainSymbol].SWAPEX[ele].Factory,
          Router: vueInstance.$networkenv.abis[chainSymbol].SWAPEX[ele].Router,
          FarmPool: vueInstance.$networkenv.abis[chainSymbol].SWAPEX[ele].FarmPool,
          RewardToken:
            vueInstance.$networkenv.abis[chainSymbol].SWAPEX[ele].RewardToken,
          swapFactory: new ContractTool(
            vueInstance.$networkenv.abis[chainSymbol].SWAPEX[ele].Factory,
            IMdexFactory
          )
        })
      }
    }
    return map
  },

  getSwapExName(vueInstance: any) {
    if (vueInstance.chain_symbol === 'BNB') {
      // const chainId = this.getChainId()
      return 'PANCAKE'
    }

    return ''
  },

  getDynamicObject(key: string, typeKeyObj: any) {
    type keyTypes = keyof typeof typeKeyObj
    const keyObj = typeKeyObj[key as keyTypes]

    if (keyObj !== undefined) {
      return keyObj
    }
    return null
  },

  getConfigProject() {
    return Config.isDebug ? configProject.test : configProject.main
  },

  getPageCount(pagesize: number, recordcount: number) {
    const pagecount = (recordcount + pagesize - 1) / pagesize
    return pagecount
  }
}

export default tool
