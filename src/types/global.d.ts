declare global {
  interface Window {
    // ethereum?: any
    BinanceChain: any
  }

  interface Navigator {
    userLanguage: string
  }

  interface ChainNativeCurrency {
    name: string
    symbol: string
    decimals: number
    chainid: number
  }
}

export {}
