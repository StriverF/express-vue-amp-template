<template>
  <div class="list-content">
      <ul v-if="tikTokListContent.length > 0" class="hot-tag-list-content">
        <li v-for="(contentItem, index) in tikTokListContent" :key="index" >
          <img :src="contentItem.DOUYIN_OWNER_IMAGE_SRC || contentItem.DOUYIN_BRAND_IMAGE_SRC | httpOrHttpsToAuto" :alt="contentItem.DOUYIN_OWNER_TITLE" class="list-content-image">
          <span v-text="contentItem.DOUYIN_OWNER_TITLE || contentItem.DOUYIN_BRAND_TITLE"></span>
          <p v-text="contentItem.DOUYIN_TOPIC_SUB_TITLE"></p>
        </li>
      </ul>
      <div v-else class="hot-tag-list-content">
        <SKGrid/>
      </div>
    </div>
</template>

<script>
import SKGrid from '../../../components/spinkit/SKGrid'
export default {
  components: { SKGrid },
  props: {
    tikTokListContent: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    httpOrHttpsToAuto (imageUrl) {
      if (!imageUrl) return imageUrl
      let splitArr = imageUrl.split(':')
      return splitArr[1] ? splitArr[1] : imageUrl
    }
  }
}
</script>

<style lang="less" scoped>
.list-content {
  background-color: #ffffff;
  width: 75%;
  float: left;
  .hot-tag-list-content {
    overflow-y: scroll;
    justify-content: flex-start;
    height: 700px;
    li {
      padding: 8px;
      background-color: #ffffff;
      border-bottom: 1px solid #eeeeee;
      text-align: left;
      .list-content-image {
        width: 60px;
        height: 60px;
      }
      span, p {
        color: dimgray
      }
    }
  }
  .sk-grid {
    margin-left: 130px;
    margin-top: 300px;
  }
}
</style>
