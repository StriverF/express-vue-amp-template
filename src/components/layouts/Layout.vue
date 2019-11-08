<template>
  <div class="xx-layout">
    <Header v-if="isShowHeader" :title="nav.title" :leftText="nav.leftText" :rightText="nav.rightText"></Header>
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
  props: {
    nav: {
      type: Object,
      default: () => {
        return {
          title: '导航栏标题',
          leftText: '左按钮',
          rightText: '右按钮'
        }
      }
    },
    foter: Object,
  },
  data() {
    return {
      
    }
  },
  components: { Header, Footer },
  computed: {
    isShowHeader () {
      return true
    },
    isShowFooter () {
      return true
    }
  }
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