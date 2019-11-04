<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
    <Layout>
       <router-view/>
    </Layout>
  </div>
</template>

<script>
import Layout from '../../components/layouts/Layout'
export default {
  components: {Layout}
}
</script>

<style lang="less">
@import '../../styles/custom.less';

</style>
