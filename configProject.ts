export const configProject = {
  test: {
    abis: {
      HT: {

      },
      BNB: {

      }
    },
    tokens: {
      HT: {
        USDT: '0xee4d1297ba3bb705962dbc57f09a2f1d083d63f5',
      },
      BNB: {
        USDT: '0x55d398326f99059fF775485246999027B3197955',
        BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56'
      }
    },
    hide_poollist: {
      HT: [],
      BNB: []
    },
    blockchain_browser_url: {
      HT: 'https://hecoinfo.com/tx/',
      BNB: 'https://bscscan.com/tx/',
    },
    rpcurls: {
      HT: 'https://http-mainnet.hecochain.com/',
      BNB: 'https://bsc-dataseed.binance.org/',
    }
  },
  main: {
    abis: {
      BNB: {
      }
    },
    tokens: {
      BNB: {
        USDT: '0x55d398326f99059fF775485246999027B3197955',
        BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56'
      }
    },
    hide_poollist: {
      BNB: [],
    },
    blockchain_browser_url: {
      HT: '',
      BNB: 'https://bscscan.com/tx/',
    },
    rpcurls: {
      HT: '',
      BNB: 'https://bsc-dataseed.binance.+org/',
    }
  }
}

export default configProject
