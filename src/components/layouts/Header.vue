<template>
  <div class="xx-header" @click="toHome">
    <h1>抖音搜索关键词排名</h1>
  </div>
</template>

<script>
export default {
  mounted() {

  },
  methods: {
    toHome () {
      this.$router.push({ path: '/' })
    }
  },
  
}
</script>

<style lang="less" scoped>
.xx-header {
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  box-shadow: 0 0 5px #b9b9b9;
  h1 {
    text-align: center;
    padding: 20px;
  }
}
</style>
