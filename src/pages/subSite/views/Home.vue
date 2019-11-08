<template>
  <div class="subsite-home">
    子站点首页<br>
    <a href="/">返回主站点首页</a>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("子站点首页mounted")
  }
  
}
</script>

<style lang="less" scoped>
.subsite-home {
  text-align: center;
  padding: 200px 0;
}
</style>
