<template>
  <div class="xx-layout">
    <Header v-if="isShowHeader"></Header>
    <main class="main-container">
      <slot>
      </slot>
    </main>
    <Footer v-if="isShowFooter"></Footer>
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
export default {
  components: { Header, Footer },

  computed: {
    isShowHeader () {
      return true
    },
    isShowFooter () {
      return true
    }
  },
  
}
</script>

<style lang="less" scoped>
.xx-layout {
  background-color: #cccccc
}
.main-container {
  padding-top: 60px;
}
</style>