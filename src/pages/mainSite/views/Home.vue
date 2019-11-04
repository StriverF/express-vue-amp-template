<template>
  <div class="xx-home">
    <h2>抖音热搜标签</h2>
    <!-- <a href="/subsite/home">去子站点首页</a> -->
    <div v-if="tikTokHotTagData">{{tikTokHotTagData}}</div>
    <div v-else> 服务端没注入数据到htm文档 </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tikTokHotTagData: null
    }
  },
  mounted() {
    if (window.apiJonsContent && window.apiJonsContent.pageType === 'home' && window.apiJonsContent.apiData.tikTokHotTag) {
      this.tikTokHotTagData = window.apiJonsContent.apiData.tikTokHotTag
      console.log('获取服务端数据', tikTokHotTagData)
      // if (faceIndexRes.status === 200 && faceIndexRes.content.length > 0) {
      //   this.moduleFloorInfo = faceIndexRes.content
      //   this.hasLoad = true
      // }
    }
  },
  methods: {

  }
  
}
</script>

<style lang="less" scoped>
.xx-home {
  text-align: center;
  height: 700px;
  h2 {
    margin-top: 30px;
  }
}
</style>
