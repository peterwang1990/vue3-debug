'use strict'
let __awaiter =
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
          step(generator['throw'](value))
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
let __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    let _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g
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
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
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
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
// @ts-ignore
let multicall_1 = require('@makerdao/multicall')
// import { JsonRpcProvider as JsonRpcProviderTool } from '@ethersproject/providers'
// import BigNumber from 'bignumber.js'
// import uniswapPairV2Tool from '../abis/IUniswapV2Pair.json'
let bignumber_js_1 = require('bignumber.js')
// import ContractTool from 'web3-eth-contract'
// import BigNumberTool from 'bignumber.js'
let networks_1 = require('../constants/networks')
let store_1 = require('../store')
let blockchain_config_1 = require('../constants/blockchain_config')
let ERC20_json_1 = require('../abis/ERC20.json')
let IMdexFactory_json_1 = require('../abis/IMdexFactory.json')
let provider_1 = require('./provider')
let configProject_1 = require('../../configProject')
let Config = require('../constants/Config')
let ContractTool = require('web3-eth-contract')
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
let tool = {
  getUserBrowserDefaultLang: function () {
    var lang = navigator.language || navigator.userLanguage // 常规浏览器语言和IE浏览器
    lang = lang.substr(0, 2)
    if (lang !== 'zh') {
      lang = 'en'
    }
    return lang
  },
  getPageLang (langPara) {
        var lang = langPara;
        // let lang = Store.getters.lang
        if (typeof lang === 'undefined' || lang === 'undefined' || lang.length === 0) {
            lang = store_1["default"].getters.lang;
            if (typeof lang === 'undefined' || lang === 'undefined' || lang.length === 0) {
                lang = this.getUserBrowserDefaultLang();
            }
        }
        // localStorage.setItem('lang', this.lang)
        // Store.dispatch('set_lang')
        return lang;
    },
  canPageScroll (flag) {
        var m = function (e) {
            e.preventDefault();
        };
        if (!flag) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('touchmove', m, { passive: false }); // 禁止页面滑动
        }
        else {
            document.body.style.overflow = '';
            document.removeEventListener('touchmove', m, {}); // 允许页面滑动
        }
    },
  checkNullObj: function (obj) {
    return Object.keys(obj).length === 0
  },
  getLangLink (langSet) {
        var localLang = this.getUserBrowserDefaultLang();
        var displayLang = window.location.pathname.replace('zh/', '').replace('en/', '');
        if (localLang !== langSet) {
            if (window.location.pathname.substr(window.location.pathname.length - 1, 1) === '/') {
                displayLang = window.location.pathname + langSet + "/";
            }
            else {
                displayLang = window.location.pathname + "/" + langSet + "/";
            }
        }
        return displayLang;
    },
  getLangLinkByLink: function (langSet, link) {
    // const localLangLink = this.getUserBrowserDefaultLang()
    var displayLang = link.replace('zh/', '').replace('en/', '')
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
  isEnglish (str) {
        return /[a-zA-Z]+/.test(str);
    },
  sortByKey: function (array, key) {
    return array.sort(function (a, b) {
      var x = a[key]
      var y = b[key]
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
  formatBigNumber: function (bn, decimals) {
    if (bn.toNumber() === 0) {
      return '0'
    }
    if (bn.toNumber() < 1) {
      return bn.toFixed(decimals).toString()
    }
    return bn.toString()
  },
  formatNumber (number) {
        if (number.toString().includes('.')) {
            var arrNumber = number.toString().split('.');
            if (arrNumber[1].length <= 9) {
                return number.toString();
            }
            var arr_1 = [];
            var lastChar_1 = '';
            arrNumber.forEach(function (char) {
                if (char === '0') {
                    arr_1.push(char);
                }
                else if (lastChar_1 === '0' || lastChar_1 === '') {
                    throw new Error();
                }
                lastChar_1 = char;
            });
            // for (const char of arrNumber[1]) {
            // }
            return number.toFixed(arr_1.length + 2);
        }
        return number.toString();
    },
  toNonExponential: function (num) {
    if (num.toString().includes('e')) {
      var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/)
      if (m) {
        return num.toFixed(Math.max(0, (m[1] || '').length - m[2]))
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
  getChainSymbol: function (hasDefault) {
    if (hasDefault === void 0) {
      hasDefault = true
    }
    return __awaiter(this, void 0, void 0, function () {
      var web3Provider, symbol, providerNetwork, chainId, chainIdObj
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, provider_1.getWeb3Provider()]
          case 1:
            web3Provider = _a.sent()
            symbol = hasDefault ? blockchain_config_1['default'].defaultSymbol : ''
            if (!(web3Provider !== null)) return [3 /*break*/, 3]
            return [4 /*yield*/, web3Provider.getNetwork()]
          case 2:
            providerNetwork = _a.sent()
            if (providerNetwork.chainId && providerNetwork.chainId > 0) {
              chainId = providerNetwork.chainId
              chainIdObj = this.getDynamicObject(
                chainId.toString(),
                networks_1['default']
              )
              symbol = chainIdObj.symbol
            }
            _a.label = 3
          case 3:
            return [2 /*return*/, symbol]
        }
      })
    })
  },
  getChainId (hasDefault) {
        if (hasDefault === void 0) { hasDefault = true; }
        return __awaiter(this, void 0, void 0, function () {
            var web3Provider, chainId, providerNetwork, chainId_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, provider_1.getWeb3Provider()];
                    case 1:
                        web3Provider = _a.sent();
                        chainId = hasDefault ? blockchain_config_1["default"].defaultChainId : -1;
                        if (!(web3Provider !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, web3Provider.getNetwork()];
                    case 2:
                        providerNetwork = _a.sent();
                        if (providerNetwork.chainId && providerNetwork.chainId > 0) {
                            chainId_1 = providerNetwork.chainId;
                            return [2 /*return*/, chainId_1];
                        }
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, blockchain_config_1["default"].defaultChainId];
                    case 4: return [2 /*return*/, chainId];
                }
            });
        });
    },
  getTokenByAddressAndChainSymbol (address, chainSymbol) {
        var chainSymbolObj = this.getDynamicObject(chainSymbol, blockchain_config_1["default"].tokensLogoUrl);
        if (chainSymbol !== null) {
            return chainSymbolObj.replace('{}', address);
        }
        return '';
    },
  getTokenByAddress: function (address) {
    return __awaiter(this, void 0, void 0, function () {
      var chainSymbol, chainSymbolObj
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.getChainSymbol()]
          case 1:
            chainSymbol = _a.sent()
            chainSymbolObj = this.getDynamicObject(
              chainSymbol,
              blockchain_config_1['default'].tokensLogoUrl
            )
            if (chainSymbol !== null) {
              return [2 /*return*/, chainSymbolObj.replace('{}', address)]
            }
            return [2 /*return*/, '']
        }
      })
    })
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
  getPoolWeight (poolId, starPoolsContract) {
        return __awaiter(this, void 0, void 0, function () {
            var allocPoint, totalAllocPoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, starPoolsContract.methods.poolInfo(poolId).call()];
                    case 1:
                        allocPoint = (_a.sent()).allocPoint;
                        return [4 /*yield*/, starPoolsContract.methods.totalAllocPoint().call()];
                    case 2:
                        totalAllocPoint = _a.sent();
                        return [2 /*return*/, allocPoint / totalAllocPoint];
                }
            });
        });
    },
  caculateTokenAndLPPriceV1FromTokenPair: function (
    token0Address,
    token1Address,
    uniswapFactoryContract,
    multicallConfig,
    usdtAddress
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var lpAddress, e_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 4, , 5])
            return [
              4 /*yield*/,
              uniswapFactoryContract.methods
                .getPair(token0Address, token1Address)
                .call()
            ]
          case 1:
            lpAddress = _a.sent()
            if (
              !(
                lpAddress &&
                lpAddress.length > 0 &&
                lpAddress !== blockchain_config_1['default'].ZERO_ADDRESS
              )
            )
              return [3 /*break*/, 3]
            return [
              4 /*yield*/,
              this.caculateTokenAndLPPriceV1FromLP(
                lpAddress,
                uniswapFactoryContract,
                multicallConfig,
                usdtAddress
              )
            ]
          case 2:
            return [2 /*return*/, _a.sent()]
          case 3:
            console.error('No LP: ' + token0Address + '|' + token1Address)
            return [3 /*break*/, 5]
          case 4:
            e_1 = _a.sent()
            console.error(e_1)
            return [3 /*break*/, 5]
          case 5:
            return [2 /*return*/, null]
        }
      })
    })
  },
  caculateTokenAndLPPriceV1FromLPOnlyUSDT (lpAddress, multicallConfig) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.caculateTokenAndLPPriceV1FromLP(lpAddress, null, multicallConfig, null)];
            });
        });
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
  caculateTokenAndLPPriceV1FromLPNoBaseInfoFaster: function (
    index,
    lpObj,
    vueInstance
  ) {
    var calls = []
    try {
      // console.log(lpObj)
      calls = calls.concat([
        {
          target: lpObj.address,
          call: ['totalSupply()(uint256)'],
          returns: [
            [
              'TOTALSUPPLY_' + index,
              function (val) {
                return val
              }
            ]
          ]
        },
        {
          target: lpObj.token0.address,
          call: ['balanceOf(address)(uint256)', lpObj.address],
          returns: [
            [
              'TOKEN0_AMOUNT_' + index,
              function (val) {
                return val
              }
            ]
          ]
        },
        {
          target: lpObj.token1.address,
          call: ['balanceOf(address)(uint256)', lpObj.address],
          returns: [
            [
              'TOKEN1_AMOUNT_' + index,
              function (val) {
                return val
              }
            ]
          ]
        }
      ])
      var isFromOracle = false
      var token0Symbol = lpObj.token0.symbol
      var token1Symbol = lpObj.token1.symbol
      var tokenPriceFromPollList = this.getDynamicObject(
        vueInstance.chain_symbol,
        blockchain_config_1['default'].tokenPriceFromPoolList
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
                returns: [
                  [
                    'TOKEN1_PRICE_USD_' + index,
                    function (val) {
                      return val / Math.pow(10, 8)
                    }
                  ]
                ]
              }
            ])
          } else {
            calls = calls.concat([
              {
                target: vueInstance.$networkenv.abis[vueInstance.chain_symbol].Oracle,
                call: ['getPrice(address)(uint256)', lpObj.token0.address],
                returns: [
                  [
                    'TOKEN0_PRICE_USD_' + index,
                    function (val) {
                      return val / Math.pow(10, 8)
                    }
                  ]
                ]
              }
            ])
          }
        } else {
          calls = calls.concat([
            {
              target: vueInstance.$networkenv.abis[vueInstance.chain_symbol].Oracle,
              call: ['getPrice(address)(uint256)', lpObj.token0.address],
              returns: [
                [
                  'TOKEN0_PRICE_USD_' + index,
                  function (val) {
                    return val / Math.pow(10, 8)
                  }
                ]
              ]
            },
            {
              target: vueInstance.$networkenv.abis[vueInstance.chain_symbol].Oracle,
              call: ['getPrice(address)(uint256)', lpObj.token1.address],
              returns: [
                [
                  'TOKEN1_PRICE_USD_' + index,
                  function (val) {
                    return val / Math.pow(10, 8)
                  }
                ]
              ]
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
  caculateTokenAndLPPriceV1FromLPNoBaseInfo: function (
    lpObj,
    uniswapFactoryContract,
    multicallConfig,
    usdtAddress,
    vueInstance
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var calls,
        baseUSDToken,
        returnValueTool,
        priceUSDT2USD,
        token0Pie,
        token1Pie,
        lpPrice,
        e_2
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3])
            calls = [
              {
                target: lpObj.address,
                call: ['totalSupply()(uint256)'],
                returns: [
                  [
                    'TOTALSUPPLY',
                    function (val) {
                      return val
                    }
                  ]
                ]
              },
              {
                target: lpObj.token0.address,
                call: ['balanceOf(address)(uint256)', lpObj.address],
                returns: [
                  [
                    'TOKEN0_AMOUNT',
                    function (val) {
                      return val
                    }
                  ]
                ]
              },
              {
                target: lpObj.token1.address,
                call: ['balanceOf(address)(uint256)', lpObj.address],
                returns: [
                  [
                    'TOKEN1_AMOUNT',
                    function (val) {
                      return val
                    }
                  ]
                ]
              },
              {
                target: vueInstance.$networkenv.abis[vueInstance.chain_symbol].Oracle,
                call: [
                  'getPrice(address)(uint256)',
                  vueInstance.$networkenv.tokens[vueInstance.chain_symbol].USDT
                ],
                returns: [
                  [
                    'TOKEN_PRICE_USDT_USD',
                    function (val) {
                      return val / Math.pow(10, 8)
                    }
                  ]
                ]
              }
            ]
            baseUSDToken =
              vueInstance.chain_symbol === 'BNB'
                ? vueInstance.$networkenv.tokens[
                    vueInstance.chain_symbol
                  ].BUSD.toLowerCase()
                : vueInstance.$networkenv.tokens[
                    vueInstance.chain_symbol
                  ].USDT.toLowerCase()
            if (
              lpObj.token0.address.toLowerCase() === baseUSDToken ||
              lpObj.token1.address.toLowerCase() === baseUSDToken
            ) {
              if (lpObj.token0.address.toLowerCase() === baseUSDToken) {
                calls = calls.concat([
                  {
                    target:
                      vueInstance.$networkenv.abis[vueInstance.chain_symbol].Oracle,
                    call: ['getPrice(address)(uint256)', lpObj.token1.address],
                    returns: [
                      [
                        'TOKEN1_PRICE_USD',
                        function (val) {
                          return val / Math.pow(10, 8)
                        }
                      ]
                    ]
                  }
                ])
              } else {
                calls = calls.concat([
                  {
                    target:
                      vueInstance.$networkenv.abis[vueInstance.chain_symbol].Oracle,
                    call: ['getPrice(address)(uint256)', lpObj.token0.address],
                    returns: [
                      [
                        'TOKEN0_PRICE_USD',
                        function (val) {
                          return val / Math.pow(10, 8)
                        }
                      ]
                    ]
                  }
                ])
              }
            } else {
              calls = calls.concat([
                {
                  target: vueInstance.$networkenv.abis[vueInstance.chain_symbol].Oracle,
                  call: ['getPrice(address)(uint256)', lpObj.token0.address],
                  returns: [
                    [
                      'TOKEN0_PRICE_USD',
                      function (val) {
                        return val / Math.pow(10, 8)
                      }
                    ]
                  ]
                },
                {
                  target: vueInstance.$networkenv.abis[vueInstance.chain_symbol].Oracle,
                  call: ['getPrice(address)(uint256)', lpObj.token1.address],
                  returns: [
                    [
                      'TOKEN1_PRICE_USD',
                      function (val) {
                        return val / Math.pow(10, 8)
                      }
                    ]
                  ]
                }
              ])
            }
            return [4 /*yield*/, multicall_1.aggregate(calls, multicallConfig)]
          case 1:
            returnValueTool = _a.sent()
            lpObj.totalSupply = new bignumber_js_1['default'](
              returnValueTool.results.transformed.TOTALSUPPLY.toString()
            )
              .div(Math.pow(10, lpObj.decimals))
              .toNumber()
            lpObj.token0.amount = new bignumber_js_1['default'](
              returnValueTool.results.transformed.TOKEN0_AMOUNT.toString()
            )
              .div(Math.pow(10, lpObj.token0.decimals))
              .toNumber()
            lpObj.token1.amount = new bignumber_js_1['default'](
              returnValueTool.results.transformed.TOKEN1_AMOUNT.toString()
            )
              .div(Math.pow(10, lpObj.token1.decimals))
              .toNumber()
            // console.log('3 --- all muticall end')
            // console.log(lpObj)
            lpObj.token0.price = lpObj.token1.amount / lpObj.token0.amount
            lpObj.token1.price = lpObj.token0.amount / lpObj.token1.amount
            priceUSDT2USD = returnValueTool.results.transformed.TOKEN_PRICE_USDT_USD
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
            token0Pie = (1 / lpObj.totalSupply) * lpObj.token0.amount
            token1Pie = (1 / lpObj.totalSupply) * lpObj.token1.amount
            lpPrice = 0
            lpPrice += lpObj.token0.priceUsdt * token0Pie
            lpPrice += lpObj.token1.priceUsdt * token1Pie
            lpObj.priceUsdt = lpPrice
            return [3 /*break*/, 3]
          case 2:
            e_2 = _a.sent()
            console.error(e_2)
            console.error(lpObj)
            return [3 /*break*/, 3]
          case 3:
            return [2 /*return*/, lpObj]
        }
      })
    })
  },
  caculateTokenAndLPPriceV1FromLP: function (
    lpAddress,
    uniswapFactoryContract,
    multicallConfig,
    usdtAddress
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var lpObj,
        returnValueTool,
        token0Contract,
        token0SymbolTemp,
        token0AddrTemp,
        lpToken1UsdtLPInfo,
        token0Pie,
        token1Pie,
        lpPrice,
        e_3
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            lpObj = {}
            _a.label = 1
          case 1:
            _a.trys.push([1, 8, , 9])
            lpObj.address = lpAddress
            return [
              4 /*yield*/,
              multicall_1.aggregate(
                [
                  {
                    target: lpObj.address,
                    call: ['token0()(address)'],
                    returns: [
                      [
                        'TOKEN0_ADDRESS',
                        function (val) {
                          return val
                        }
                      ]
                    ]
                  },
                  {
                    target: lpObj.address,
                    call: ['token1()(address)'],
                    returns: [
                      [
                        'TOKEN1_ADDRESS',
                        function (val) {
                          return val
                        }
                      ]
                    ]
                  },
                  {
                    target: lpObj.address,
                    call: ['decimals()(uint256)'],
                    returns: [
                      [
                        'DECIMALS',
                        function (val) {
                          return parseInt(val, 10)
                        }
                      ]
                    ]
                  }
                ],
                multicallConfig
              )
            ]
          case 2:
            returnValueTool = _a.sent()
            lpObj.decimals = returnValueTool.results.transformed.DECIMALS
            lpObj.token0 = {
              address: returnValueTool.results.transformed.TOKEN0_ADDRESS
            }
            lpObj.token1 = {
              address: returnValueTool.results.transformed.TOKEN1_ADDRESS
            }
            token0Contract = new ContractTool(
              ERC20_json_1['default'],
              lpObj.token0.address
            )
            return [
              4 /*yield*/,
              token0Contract.methods.symbol().call()
              // console.log('1.1 --- ' + token0_symbol_temp)
              // console.log(lpObj)
            ]
          case 3:
            token0SymbolTemp = _a.sent()
            // console.log('1.1 --- ' + token0_symbol_temp)
            // console.log(lpObj)
            if (token0SymbolTemp.includes('USD')) {
              token0AddrTemp = lpObj.token0.address
              lpObj.token0.address = lpObj.token1.address
              lpObj.token1.address = token0AddrTemp
            }
            return [
              4 /*yield*/,
              multicall_1.aggregate(
                [
                  {
                    target: lpObj.address,
                    call: ['totalSupply()(uint256)'],
                    returns: [
                      [
                        'TOTALSUPPLY',
                        function (val) {
                          return val
                        }
                      ]
                    ]
                  },
                  {
                    target: lpObj.token0.address,
                    call: ['symbol()(string)'],
                    returns: [
                      [
                        'TOKEN0_SYMBOL',
                        function (val) {
                          return val
                        }
                      ]
                    ]
                  },
                  {
                    target: lpObj.token0.address,
                    call: ['decimals()(uint256)'],
                    returns: [
                      [
                        'TOKEN0_DECIMALS',
                        function (val) {
                          return parseInt(val, 10)
                        }
                      ]
                    ]
                  },
                  {
                    target: lpObj.token0.address,
                    call: ['balanceOf(address)(uint256)', lpObj.address],
                    returns: [
                      [
                        'TOKEN0_AMOUNT',
                        function (val) {
                          return val
                        }
                      ]
                    ]
                  },
                  {
                    target: lpObj.token1.address,
                    call: ['symbol()(string)'],
                    returns: [
                      [
                        'TOKEN1_SYMBOL',
                        function (val) {
                          return val
                        }
                      ]
                    ]
                  },
                  {
                    target: lpObj.token1.address,
                    call: ['decimals()(uint256)'],
                    returns: [
                      [
                        'TOKEN1_DECIMALS',
                        function (val) {
                          return parseInt(val, 10)
                        }
                      ]
                    ]
                  },
                  {
                    target: lpObj.token1.address,
                    call: ['balanceOf(address)(uint256)', lpObj.address],
                    returns: [
                      [
                        'TOKEN1_AMOUNT',
                        function (val) {
                          return val
                        }
                      ]
                    ]
                  }
                ],
                multicallConfig
              )
            ]
          case 4:
            // console.log('2 --- ' + token0_symbol_temp)
            // console.log(lpObj)
            returnValueTool = _a.sent()
            lpObj.totalSupply = new bignumber_js_1['default'](
              returnValueTool.results.transformed.TOTALSUPPLY.toString()
            )
              .div(Math.pow(10, lpObj.decimals))
              .toNumber()
            lpObj.token0.symbol = returnValueTool.results.transformed.TOKEN0_SYMBOL
            lpObj.token0.decimals = returnValueTool.results.transformed.TOKEN0_DECIMALS
            lpObj.token0.amount = new bignumber_js_1['default'](
              returnValueTool.results.transformed.TOKEN0_AMOUNT.toString()
            )
              .div(Math.pow(10, lpObj.token0.decimals))
              .toNumber()
            lpObj.token1.symbol = returnValueTool.results.transformed.TOKEN1_SYMBOL
            lpObj.token1.decimals = returnValueTool.results.transformed.TOKEN1_DECIMALS
            lpObj.token1.amount = new bignumber_js_1['default'](
              returnValueTool.results.transformed.TOKEN1_AMOUNT.toString()
            )
              .div(Math.pow(10, lpObj.token1.decimals))
              .toNumber()
            // console.log('3 --- all muticall end')
            // console.log(lpObj)
            lpObj.token0.price = lpObj.token1.amount / lpObj.token0.amount
            lpObj.token1.price = lpObj.token0.amount / lpObj.token1.amount
            if (!(lpObj.token1.address.toLowerCase() === usdtAddress.toLowerCase()))
              return [3 /*break*/, 5]
            lpObj.token1.priceUsdt = 1
            return [3 /*break*/, 7]
          case 5:
            return [
              4 /*yield*/,
              this.caculateTokenAndLPPriceV1FromTokenPair(
                lpObj.token1.address,
                usdtAddress,
                uniswapFactoryContract,
                multicallConfig,
                usdtAddress
              )
            ]
          case 6:
            lpToken1UsdtLPInfo = _a.sent()
            lpObj.token1.priceUsdt = lpToken1UsdtLPInfo.token0.price
            _a.label = 7
          case 7:
            lpObj.token0.priceUsdt = lpObj.token0.price * lpObj.token1.priceUsdt
            token0Pie = (1 / lpObj.totalSupply) * lpObj.token0.amount
            token1Pie = (1 / lpObj.totalSupply) * lpObj.token1.amount
            lpPrice = 0
            lpPrice += lpObj.token0.priceUsdt * token0Pie
            lpPrice += lpObj.token1.priceUsdt * token1Pie
            lpObj.priceUsdt = lpPrice
            return [3 /*break*/, 9]
          case 8:
            e_3 = _a.sent()
            console.error(e_3)
            console.error(lpObj)
            return [3 /*break*/, 9]
          case 9:
            return [2 /*return*/, lpObj]
        }
      })
    })
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
  scientificToNumber: function (num) {
    var str = num
    if (typeof num === 'number') {
      str = num.toString()
    }
    var regFloatExp = /^(\d+\.\d+)(e)([-]?\d+)$/
    var regIntegerExp = /^(\d+)(e)([-]?\d+)$/
    var arr
    var len
    var zero = ''
    if (!regFloatExp.test(str)) {
      if (!regIntegerExp.test(str)) {
        return str
      }
      arr = regIntegerExp.exec(str)
      if (arr) {
        len = Math.abs(Number(arr[3])) - 1
        for (var i = 0; i < len; i += 1) {
          zero += '0'
        }
        return '0.' + zero + arr[1]
      }
    }
    /* 6e-7 需要手动转换 */
    arr = regFloatExp.exec(str)
    if (arr) {
      len = Math.abs(Number(arr[3])) - 1
      for (var i = 0; i < len; i += 1) {
        zero += '0'
      }
      return '0.' + zero + arr[1].replace('.', '')
    }
    return str
  },
  formatFloatNumber: function (numStr, decimals) {
    var typeofStr = typeof numStr
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
    var regFloatExp = /^\d+\.\d+$/
    var regFormatFloat = new RegExp('^\\d+(?:\\.\\d{0,' + decimals + '})?', 'g')
    if (numStr.indexOf('e') >= 0) {
      return this.scientificToNumber(numStr).match(regFormatFloat).toString()
    }
    if (regFloatExp.test(numStr)) {
      var result = numStr.match(regFormatFloat)
      if (result !== null) {
        return result.toString()
      }
    }
    return numStr
  },
  dateTransform (seconds) {
        var _a = [0, 0, 0, 0], day = _a[0], hour = _a[1], minute = _a[2], second = _a[3]; // 初始化
        if (seconds > 0) {
            day = Math.floor(seconds / (60 * 60 * 24));
            hour = Math.floor(seconds / (60 * 60)) - day * 24;
            minute = Math.floor(seconds / 60) - day * 24 * 60 - hour * 60;
            second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
        }
        // 小于10的，在前面加0
        var dayResult = day < 10 ? "0" + day : day;
        var hourResult = hour < 10 ? "0" + hour : hour;
        var minuteResult = minute < 10 ? "0" + minute : minute;
        var secondResult = second < 10 ? "0" + second : second;
        if (day >= 1) {
            return dayResult + " days";
        }
        return hourResult + ":" + minuteResult + ":" + secondResult;
    },
  dateTransformLong (seconds) {
        var _a = [0, 0, 0, 0], day = _a[0], hour = _a[1], minute = _a[2], second = _a[3]; // 初始化
        if (seconds > 0) {
            day = Math.floor(seconds / (60 * 60 * 24));
            hour = Math.floor(seconds / (60 * 60)) - day * 24;
            minute = Math.floor(seconds / 60) - day * 24 * 60 - hour * 60;
            second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
        }
        // 小于10的，在前面加0
        var dayResult = day < 10 ? "0" + day : day;
        var hourResult = hour < 10 ? "0" + hour : hour;
        var minuteResult = minute < 10 ? "0" + minute : minute;
        var secondResult = second < 10 ? "0" + second : second;
        return [dayResult, hourResult, minuteResult, secondResult];
        // if(day >= 1){
        //   return day + " days " + hour + " hours " + minute + " mins " + second + " secs "
        // }else{
        //   return hour + " hours " + minute + " mins " + second + " secs "
        // }
    },
  getPendingTextHtml (text) {
        var pendingHtml = "<svg class='rotate-circle' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='#6F4397' style='width: 16px;height: 16px;margin-left:5px;margin-top:0px'><path d='M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'></path></svg>";
        return "<div class='item-flex-center' style='align-items: center;'><span>" + text + "</span>" + pendingHtml + "</div>";
    },
  },
  retainDecimals (numStr, decimal) {
        if (typeof numStr === 'string') {
            numStr = numStr.toString();
        }
        var index = numStr.indexOf('.');
        if (index !== -1) {
            numStr = numStr.substring(0, decimal + index + 1);
        }
        else {
            numStr = numStr.substring(0);
        }
        return Math.floor(parseFloat(numStr) * Math.pow(10, decimal)) / Math.pow(10, decimal);
    },
  zeroize (num) {
        return (num.toString().length === 1 ? '0' : '') + num;
    },
  timestampFormat: function (timestamp) {
    var curTimestamp = parseInt((new Date().getTime() / 1000).toString(), 10) // 当前时间戳
    var timestampDiff = curTimestamp - timestamp // 参数时间戳与当前时间戳相差秒数
    var curDate = new Date(curTimestamp * 1000) // 当前时间日期对象
    var tmDate = new Date(timestamp * 1000) // 参数时间戳转换成的日期对象
    var Y = tmDate.getFullYear()
    var m = tmDate.getMonth() + 1
    var d = tmDate.getDate()
    var H = tmDate.getHours()
    var i = tmDate.getMinutes()
    // const s = tmDate.getSeconds()
    if (timestampDiff < 60) {
      // 一分钟以内
      return '刚刚'
    }
    if (timestampDiff < 3600) {
      // 一小时前之内
      return Math.floor(timestampDiff / 60) + '\u5206\u949F\u524D'
    }
    if (
      curDate.getFullYear() === Y &&
      curDate.getMonth() + 1 === m &&
      curDate.getDate() === d
    ) {
      return '\u4ECA\u5929' + this.zeroize(H) + ':' + this.zeroize(i)
    }
    var newDate = new Date((curTimestamp - 86400) * 1000) // 参数中的时间戳加一天转换成的日期对象
    if (
      newDate.getFullYear() === Y &&
      newDate.getMonth() + 1 === m &&
      newDate.getDate() === d
    ) {
      return '\u6628\u5929' + this.zeroize(H) + ':' + this.zeroize(i)
    }
    if (curDate.getFullYear() === Y) {
      return (
        this.zeroize(m) +
        '\u6708' +
        this.zeroize(d) +
        '\u65E5 ' +
        this.zeroize(H) +
        ':' +
        this.zeroize(i)
      )
    }
    return (
      Y +
      '\u5E74' +
      this.zeroize(m) +
      '\u6708' +
      this.zeroize(d) +
      '\u65E5 ' +
      this.zeroize(H) +
      ':' +
      this.zeroize(i)
    )
  },
  getTotalApy: function (
    apyFarm,
    feeRefund,
    borrowApy,
    plantformApy,
    plantformBorrowSubsidyApy,
    boxBorrowSubsidyApy,
    lavarage
  ) {
    var capital = 1
    var dailyAPR = apyFarm / 365
    var refundCount = (60 / 15) * 24
    // const refundCount=24503
    var amountYear =
      capital * Math.pow(1 + ((dailyAPR / refundCount) * 1) / 100, refundCount * 365)
    var apyRefund = ((amountYear - capital) / capital) * 100
    var result =
      (apyRefund + plantformApy) * lavarage +
      (plantformBorrowSubsidyApy + boxBorrowSubsidyApy - borrowApy) * (lavarage - 1)
    if (Number.isNaN(result)) {
      return '---'
    }
    return result.toFixed(2)
  },
  getDeviceScreenIsPC: function () {
    if (document.documentElement.clientWidth > 1140) {
      return true
    }
    if (document.documentElement.clientWidth < 360) {
      window.resizeTo(360, document.documentElement.clientHeight)
    }
    return false
  },
  dealSwapMap (vueInstance) {
        var map = new Map();
        if (vueInstance.chain_symbol === 'BNB') {
            var chainSymbol = vueInstance.chainSymbol;
            var swapList = ['PANCAKE', 'MDEX'];
            for (var i = 0; i < swapList.length; i += 1) {
                var ele = swapList[i];
                map.set(ele, {
                    Factory: vueInstance.$networkenv.abis[chainSymbol].SWAPEX[ele].Factory,
                    Router: vueInstance.$networkenv.abis[chainSymbol].SWAPEX[ele].Router,
                    FarmPool: vueInstance.$networkenv.abis[chainSymbol].SWAPEX[ele].FarmPool,
                    RewardToken: vueInstance.$networkenv.abis[chainSymbol].SWAPEX[ele].RewardToken,
                    swapFactory: new ContractTool(vueInstance.$networkenv.abis[chainSymbol].SWAPEX[ele].Factory, IMdexFactory_json_1["default"])
                });
            }
        }
        return map;
    },
  getSwapExName (vueInstance) {
        if (vueInstance.chain_symbol === 'BNB') {
            // const chainId = this.getChainId()
            return 'PANCAKE';
        }
        return '';
    },
  getDynamicObject: function (key, typeKeyObj) {
    var keyObj = typeKeyObj[key]
    if (keyObj !== undefined) {
      return keyObj
    }
    return null
  },
  getConfigProject: function () {
    return Config.isDebug
      ? configProject_1.configProject.test
      : configProject_1.configProject.main
  },
  getPageCount (pagesize, recordcount) {
        var pagecount = (recordcount + pagesize - 1) / pagesize;
        return pagecount;
    }
}
exports.default = tool;
