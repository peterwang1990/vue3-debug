"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getWalletProvider = exports.getWeb3Provider = exports.connectWeb3Provider = exports.addMetaMaskEthereumChain = exports.getDefaultProvider = exports.WEB3_PROVIDER_TYPES = void 0;
var ethers_1 = require("ethers");
var detect_provider_1 = require("@metamask/detect-provider");
var lodash_1 = require("lodash");
var blockchain_config_1 = require("../constants/blockchain_config");
// import {
//   addLayoutGlobalMessage,
//   GlobalMessage,
//   GLOBAL_MESSAGE_TYPES
// } from '@/components/layout/layoutAction'
var tool_1 = require("./tool");
var store_1 = require("../store");
var configProject_1 = require("../../configProject");
var Config = require("../constants/Config");
var projectConfig = Config.isDebug ? configProject_1.configProject.test : configProject_1.configProject.main;
var web3Provider = null;
var defaultProvider = null;
var isDetectingMetaMaskProvider = false;
// const ChainNativeCurrency = ({ name = '', symbol = '', decimals = 18 }) => {
//   return { name, symbol, decimals }
// }
var chainMap = new Map();
chainMap.set(56, {
    chainId: "0x" + Number(56).toString(16),
    chainName: 'BSC',
    nativeCurrency: {
        symbol: 'BNB',
        name: 'BNB',
        decimals: 18
    },
    rpcUrls: [projectConfig.rpcurls.BNB],
    blockExplorerUrls: [projectConfig.blockchain_browser_url.BNB.replace('/tx', '')]
});
chainMap.set(128, {
    chainId: "0x" + Number(128).toString(16),
    chainName: 'HECO',
    nativeCurrency: {
        symbol: 'HT',
        name: 'HT',
        decimals: 18
    },
    rpcUrls: [projectConfig.rpcurls.HT],
    blockExplorerUrls: [projectConfig.blockchain_browser_url.HT.replace('/tx', '')]
});
exports.WEB3_PROVIDER_TYPES = {
    META_MASK: 'META_MASK',
    WALLET_CONNECT: 'WALLET_CONNECT',
    BSC: 'BSC'
};
exports.getDefaultProvider = function () {
    try {
        defaultProvider =
            defaultProvider ||
                new ethers_1.ethers.providers.JsonRpcProvider(blockchain_config_1["default"].defaultRpcUrl);
        return defaultProvider;
    }
    catch (error) {
        console.error("getDefaultProvider Error: ", error);
    }
    return null;
};
exports.addMetaMaskEthereumChain = function (chainId) {
    if (window.ethereum) {
        window.ethereum
            .request({
            method: 'wallet_addEthereumChain',
            params: [chainMap.get(chainId)]
        })
            .then(function (res) {
            if (res === null) {
                var jsonChainInfo = JSON.stringify({
                    chainId: chainId,
                    chainSymbol: tool_1["default"].getChainSymbol(false)
                });
                localStorage.setItem('chain_info', jsonChainInfo);
                store_1["default"].dispatch('set_chaininfo');
            }
        });
    }
};
exports.connectWeb3Provider = function (type) {
    if (type === void 0) { type = exports.WEB3_PROVIDER_TYPES.META_MASK; }
    return __awaiter(void 0, void 0, void 0, function () {
        var connectType, chainId, provider, error_1, providerNetwork, jsonChainInfo, _a, _b, _c, error_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!(exports.WEB3_PROVIDER_TYPES[type] !== undefined)) return [3 /*break*/, 20];
                    connectType = exports.WEB3_PROVIDER_TYPES[type];
                    chainId = Number(blockchain_config_1["default"].defaultChainId);
                    provider = null;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 10, , 11]);
                    if (!(type === exports.WEB3_PROVIDER_TYPES.META_MASK && !isDetectingMetaMaskProvider)) return [3 /*break*/, 6];
                    isDetectingMetaMaskProvider = true;
                    return [4 /*yield*/, detect_provider_1["default"]()];
                case 2:
                    provider = _d.sent();
                    isDetectingMetaMaskProvider = false;
                    if (!lodash_1["default"].isNil(provider)) return [3 /*break*/, 3];
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, provider.enable()];
                case 4:
                    _d.sent();
                    _d.label = 5;
                case 5: return [3 /*break*/, 9];
                case 6:
                    if (!(type === exports.WEB3_PROVIDER_TYPES.WALLET_CONNECT)) return [3 /*break*/, 7];
                    return [3 /*break*/, 9];
                case 7:
                    if (!(type === exports.WEB3_PROVIDER_TYPES.BSC)) return [3 /*break*/, 9];
                    if (!window.BinanceChain) return [3 /*break*/, 9];
                    provider = window.BinanceChain;
                    return [4 /*yield*/, window.BinanceChain.enable()];
                case 8:
                    _d.sent();
                    window.BinanceChain.autoRefreshOnNetworkChange = false;
                    _d.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    error_1 = _d.sent();
                    console.error('connectWeb3Provider Error: ', error_1);
                    web3Provider = null;
                    return [3 /*break*/, 11];
                case 11:
                    localStorage.setItem('web3ProviderType', type);
                    _d.label = 12;
                case 12:
                    _d.trys.push([12, 18, , 19]);
                    if (!provider) return [3 /*break*/, 17];
                    web3Provider = new ethers_1.ethers.providers.Web3Provider(provider, 'any');
                    return [4 /*yield*/, web3Provider.getNetwork()];
                case 13:
                    providerNetwork = _d.sent();
                    if (!(lodash_1["default"].has(providerNetwork, 'chainId') &&
                        providerNetwork.chainId.toString() !==
                            blockchain_config_1["default"].defaultChainId.toString())) return [3 /*break*/, 14];
                    if (type === exports.WEB3_PROVIDER_TYPES.META_MASK) {
                        // addMetaMaskEthereumChain(BLOCKCHAIN_CONFIG.defaultChainId)
                    }
                    return [3 /*break*/, 17];
                case 14:
                    _b = (_a = JSON).stringify;
                    _c = {};
                    return [4 /*yield*/, tool_1["default"].getChainId(false)];
                case 15:
                    _c.chainId = _d.sent();
                    return [4 /*yield*/, tool_1["default"].getChainSymbol(false)];
                case 16:
                    jsonChainInfo = _b.apply(_a, [(_c.chainSymbol = _d.sent(),
                            _c)]);
                    localStorage.setItem('chain_info', jsonChainInfo);
                    store_1["default"].dispatch('set_chaininfo');
                    _d.label = 17;
                case 17: return [3 /*break*/, 19];
                case 18:
                    error_2 = _d.sent();
                    console.error('connectWeb3Provider getNetwork Error: ', error_2);
                    // addLayoutGlobalMessage(
                    //   GlobalMessage({
                    //     id: uuidv4(),
                    //     type: GLOBAL_MESSAGE_TYPES.ERROR,
                    //     text: `Wrong network: please connect ${connectType || ''} wallet to ${BLOCKCHAIN_CONFIG.defaultChainName
                    //       } network and try again`,
                    //     hash: ''
                    //   })
                    // )
                    web3Provider = null;
                    return [3 /*break*/, 19];
                case 19: return [2 /*return*/, web3Provider];
                case 20: return [2 /*return*/, null];
            }
        });
    });
};
exports.getWeb3Provider = function (connectIfNil) {
    if (connectIfNil === void 0) { connectIfNil = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (!(lodash_1["default"].isNil(web3Provider) && connectIfNil)) return [3 /*break*/, 2];
                    return [4 /*yield*/, exports.connectWeb3Provider(exports.WEB3_PROVIDER_TYPES.META_MASK)];
                case 1:
                    web3Provider = _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, web3Provider];
                case 3:
                    error_3 = _a.sent();
                    console.error('getWeb3Provider Error', error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, null];
            }
        });
    });
};
exports.getWalletProvider = function () { return __awaiter(void 0, void 0, void 0, function () {
    var web3ProviderType;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                web3ProviderType = localStorage.getItem('web3ProviderType');
                if (!(web3ProviderType && Object.keys(exports.WEB3_PROVIDER_TYPES).includes(web3ProviderType))) return [3 /*break*/, 2];
                return [4 /*yield*/, exports.connectWeb3Provider(web3ProviderType)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2: return [2 /*return*/, null];
        }
    });
}); };
exports.getDefaultProvider();
