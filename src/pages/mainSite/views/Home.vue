<template>
  <div class="xx-home">
    <TagNav :tikTokHotTagData="tikTokHotTagData" :defaultTagActive="tagActive" @clickTopTag="clickTopTag" />

    <TagList :selectTagList="selectTagList" @clickTopTagND="clickTopTagND" />

    <TagComtent :tikTokListContent="tikTokListContent" />

  </div>
</template>

<script>
import vueApi from '../../../api/index'

import TagNav from '../components/TagNav'
import TagList from '../components/TagList'
import TagComtent from '../components/TagListContent'
import 'spinkit/spinkit.min.css'
export default {
  components: { TagNav, TagList, TagComtent },
  data() {
    return {
      tikTokHotTagData: [],
      tagActive: 1,
      tag2ndActive: 0,
      tikTokListContent: []
    };
  },
  computed: {
    selectTagList () {
      if (this.tikTokHotTagData.length > 0) {
        return this.tikTokHotTagData[this.tagActive].tikTokTopicNd
      } else {
        return []
      }
    }
  },
  mounted() {
    if (
      window.apiJonsContent &&
      window.apiJonsContent.pageType === "home" &&
      window.apiJonsContent.apiData.tikTokHotTag
    ) {
      let  apiTikTokHotTagData = window.apiJonsContent.apiData.tikTokHotTag;
      this.tikTokHotTagData = apiTikTokHotTagData
      let topicST = this.tikTokHotTagData[this.tagActive].tikTokTopicSt
      let topicND = this.selectTagList[this.tag2ndActive]
      this.getTikTokHotTagContentData(topicST, topicND)
      console.log("获取服务端注入的数据", this.tikTokHotTagData);
    } else {
      this.getTikTokHotTagListData()
    }
  },
  methods: {
    clickTopTag (index) {
      this.tagActive = index
      let topicST = this.tikTokHotTagData[this.tagActive].tikTokTopicSt
      let topicND = this.selectTagList[this.tag2ndActive]
      this.getTikTokHotTagContentData(topicST, topicND)
    },
    clickTopTagND (index) {
      this.tag2ndActive = index
      let topicST = this.tikTokHotTagData[this.tagActive].tikTokTopicSt
      let topicND = this.selectTagList[index]
      console.log(topicST, topicND)
      this.getTikTokHotTagContentData(topicST, topicND)
    },
    getTikTokHotTagListData () {
      let ssdt = window.sessionStorage.getItem(`TIKTOK_HOT_TAG_LIST`)
      if (ssdt) { 
        this.tikTokHotTagData = JSON.parse(ssdt);
        let topicST = this.tikTokHotTagData[this.tagActive].tikTokTopicSt
        let topicND = this.selectTagList[this.tag2ndActive]
        this.getTikTokHotTagContentData(topicST, topicND)
      } else {
        vueApi.tikTokApi.get('/tikTok/HotTag', { params: {} }).then(res => {
          if (res.status === 200) {
            let conciseData = res.data
            window.sessionStorage.setItem(`TIKTOK_HOT_TAG_LIST`, JSON.stringify(conciseData))
            this.tikTokHotTagData = conciseData
            let topicST = this.tikTokHotTagData[this.tagActive].tikTokTopicSt
            let topicND = this.selectTagList[this.tag2ndActive]
            this.getTikTokHotTagContentData(topicST, topicND)
          } else {
            throw new Error('请求/tikTok/HotTag API失败')
          }
        }).catch(error => {
          throw error
        })
      }
    },
    /**
     * 请求对应榜单数据
     */
    getTikTokHotTagContentData(topicST, topicND) {
      this.tikTokListContent = []
      let ssdt = window.sessionStorage.getItem(`TIKTOK_HOT_TAG_CONTENT_${topicST}_${topicND}`)
      if (ssdt) {
        this.tikTokListContent = JSON.parse(ssdt);
      } else {
        vueApi.tikTokApi.get('/tikTok/HotTag/Content', { params: {DOUYIN_TOPIC_1ST: topicST, DOUYIN_TOPIC_2ND: topicND} }).then(res => {
          if (res.status === 200) {
            console.log(res.data)
            if (res.data) {
              window.sessionStorage.setItem(`TIKTOK_HOT_TAG_CONTENT_${topicST}_${topicND}`, JSON.stringify(res.data))
              this.tikTokListContent = res.data;
            }
          } else {
            throw new Error('请求/tikTok/HotTag/Content API失败')
          }
        }).catch(error => {
          throw error
        })
      }
    }
  }
};
</script>

<style lang="less" scoped>
.xx-home {
  text-align: center;
  height: 755px;
}

</style>
