<template>
  <div id="app">
   <Layout :nav='nav'>
       <router-view/>
    </Layout>
  </div>
</template>

<script>
import Layout from '../../components/layouts/Layout'
export default {
  data() {
    return {
      nav: {
        title: '子站点',
        leftText: '主站点',
        rightText: 'AMP页面',
      }
    }
  },
  components: {Layout}
}
</script>
<style lang="less">
@import '../../styles/custom.less';
</style>
