<template>
  <Index />
  <main ref="root" class="App d-flex flex-column">
    <router-view :wallet-address="walletAddress" />
  </main>
</template>

<script lang="ts">
import { aggregate as aggregateMain } from '@makerdao/multicall'
import { defineComponent, onMounted, ref, getCurrentInstance } from 'vue'
import Index from '../views/Index.vue'
import { useRouter } from 'vue-router'
import { connectWeb3Provider, WEB3_PROVIDER_TYPES } from '../utils/provider'
import { fetchWalletProvider, clearWallet } from './wallet/walletAction'
import { useStore } from '../store'
import TOOL from '../utils/tool'

export default defineComponent({
  name: 'Main',
  components: {
    Index
  },

  setup() {
    const pageChainConfig: any = {}
    const root = ref(null)
    const isLoading = ref(true)
    const isShowMask = ref(false)
    const maskIndex = ref(-1)
    const modelObj = ref(null)

    const router = useRouter()

    // console.log(router.currentRoute.value)

    const store = useStore()

    const walletAddress = ref('')
    const updateWalletProvider = async () => {
      await fetchWalletProvider()
      walletAddress.value = store.getters.wallet.address
    }

    function goAnchor(id: string) {
      const anchorEle = document.querySelector(id)
      if (id === '#parent') {
        if (anchorEle) {
          anchorEle.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'center'
          })
        }
      } else if (anchorEle) {
        anchorEle.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'center'
        })
      }
    }

    const BUS = getCurrentInstance()?.appContext.config.globalProperties.$bus

    const state = ref({
      height: window.innerHeight,
      width: window.innerWidth,
      isMobile: false
    })

    const resize = () => {
      state.value.isMobile = !TOOL.getDeviceScreenIsPC()
      state.value.height = window.innerHeight
      state.value.width = window.innerWidth

      BUS.$emit('RESIZE_WINDOW', {
        height: state.value.height,
        width: state.value.width,
        isMobile: state.value.isMobile
      })
    }

    const closeMask = () => {
      // setTimeout(() => {
      maskIndex.value = -1
      isShowMask.value = false
      modelObj.value = null
      // }, 1000)
    }

    // For now, 'eth_accounts' will continue to always return an array
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        clearWallet()
        store.dispatch('remove_user')
        walletAddress.value = ''
      } else if (accounts[0] !== walletAddress.value) {
        updateWalletProvider()
      }
    }

    onMounted(async () => {
      // setTimeout(() => {
      //   mainContainer.value!.scrollTop = 0
      // }, 2000)
      // 连接钱包

      const projectConfig = TOOL.getConfigProject()
      const chainSymbol = await TOOL.getChainSymbol()
      const chainRPCConfig = TOOL.getDynamicObject(chainSymbol, projectConfig.rpcurls)
      const chainABIConfig = TOOL.getDynamicObject(chainSymbol, projectConfig.abis)
      const chainTokensConfig = TOOL.getDynamicObject(chainSymbol, projectConfig.tokens)

      pageChainConfig.projectConfig = projectConfig
      pageChainConfig.chainSymbol = chainSymbol
      pageChainConfig.chainRPCConfig = chainRPCConfig
      pageChainConfig.chainABIConfig = chainABIConfig
      pageChainConfig.chainTokensConfig = chainTokensConfig
      pageChainConfig.multicallConfig = {
        rpcUrl: chainRPCConfig,
        multicallAddress: chainABIConfig.MULTICALL
      }

      let calls: any[] = []

      try {
        calls = calls.concat([
          {
            // target: pageChainConfig.chainTokensConfig.USDT,
            call: [
              'getEthBalance(address)(uint256)',
              '0x72776bb917751225d24c07d0663b3780b2ada67c'
            ],
            returns: [['ETH_BALANCE', (val: any) => val / 10 ** 18]]
          }
        ])

        const returnValue = await aggregateMain(calls, pageChainConfig.multicallConfig)
      } catch (err) {
        console.error(err)
      }

      if (window.ethereum) {
        const ethereumMain = (window as any).ethereum

        ethereumMain.on('accountsChanged', handleAccountsChanged)
        ethereumMain.on('chainChanged', (_chainId: string) => window.location.reload())
        // ethereumMain.on('disconnect', (error: any) => {
        //   // store.dispatch('remove_user')
        //   // clearWallet()
        //   console.error(error)
        // })
      }

      const web3ProviderType = localStorage.getItem('web3ProviderType')
      if (
        web3ProviderType &&
        Object.keys(WEB3_PROVIDER_TYPES).includes(web3ProviderType)
      ) {
        const provider = await connectWeb3Provider(web3ProviderType)
        if (provider) {
          updateWalletProvider()
        }
      }

      resize()
      window.addEventListener('resize', resize)

      BUS.$on('WALLET_UPDATE', (para: any) => {
        walletAddress.value = store.state.wallet.address
      })

      BUS.$on('SHOW_MASK', (para: any) => {
        maskIndex.value = para.maskIndex
        isShowMask.value = para.isShowMask
        if (para.maskIndex === 1) {
          const { modelIndex, nftList } = para
          modelObj.value = nftList
        }
      })
    })

    return {
      root,
      goAnchor,
      state,
      isShowMask,
      maskIndex,
      closeMask,
      walletAddress,
      isLoading
    }
  }
})
</script>

<style scoped lang="stylus"></style>
