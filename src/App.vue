<template>
  <Main />
</template>

<script lang="ts">
import { defineComponent, provide, getCurrentInstance, onMounted } from 'vue'
import Main from './components/Main.vue'

export default defineComponent({
  name: 'App',
  components: {
    Main
  },
  setup() {
    const BUS = getCurrentInstance()?.appContext.config.globalProperties.$bus

    onMounted(() => {
    })

  }
})
</script>

<style lang="stylus">
#app {
  font-family: Futura, Optima, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  position: relative;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  height: 100vh;
}
</style>
