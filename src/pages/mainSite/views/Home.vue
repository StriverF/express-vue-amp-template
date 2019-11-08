<template>
  <div class="xx-home">
    <TagNav :tikTokHotTagData="tikTokHotTagData" @clickTopTag="clickTopTag" />

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
      this.tikTokHotTagData = this.conciseTikTokHotTagData(apiTikTokHotTagData)
      console.log("获取服务端数据", this.tikTokHotTagData);
    } else {
      let originalData = [
        {
          DOUYIN_TOPIC_1ST: "热搜",
          DOUYIN_TOPIC_2ND: "热搜榜"
        },
        {
          DOUYIN_TOPIC_1ST: "热搜",
          DOUYIN_TOPIC_2ND: "视频榜"
        },
        {
          DOUYIN_TOPIC_1ST: "热搜",
          DOUYIN_TOPIC_2ND: "正能量"
        },
        {
          DOUYIN_TOPIC_1ST: "热搜",
          DOUYIN_TOPIC_2ND: "明星榜"
        },
        {
          DOUYIN_TOPIC_1ST: "热搜",
          DOUYIN_TOPIC_2ND: "音乐榜"
        },
        {
          DOUYIN_TOPIC_1ST: "品牌榜",
          DOUYIN_TOPIC_2ND: "汽车"
        },
        {
          DOUYIN_TOPIC_1ST: "品牌榜",
          DOUYIN_TOPIC_2ND: "手机"
        },
        {
          DOUYIN_TOPIC_1ST: "品牌榜",
          DOUYIN_TOPIC_2ND: "美妆"
        },
        {
          DOUYIN_TOPIC_1ST: "品牌榜",
          DOUYIN_TOPIC_2ND: "奢侈品"
        },
        {
          DOUYIN_TOPIC_1ST: "品牌榜",
          DOUYIN_TOPIC_2ND: "食品饮料"
        },
        {
          DOUYIN_TOPIC_1ST: "品牌榜",
          DOUYIN_TOPIC_2ND: "家用电器"
        },
        {
          DOUYIN_TOPIC_1ST: "品牌榜",
          DOUYIN_TOPIC_2ND: "服装鞋帽"
        }
      ];
      this.tikTokHotTagData = this.conciseTikTokHotTagData(originalData)
    }
    let topicST = this.tikTokHotTagData[this.tagActive].tikTokTopicSt
    let topicND = this.selectTagList[this.tag2ndActive]
    this.getTikTokHotTagContentData(topicST, topicND)
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
    /**
     * 简化版单分类数据结构
     */
    conciseTikTokHotTagData (originalData) {
      let conciseData = []
      let subData = {
        tikTokTopicSt: '',
        tikTokTopicNd: []
      }
      originalData.forEach(element => {
        if (subData.tikTokTopicSt !== element.DOUYIN_TOPIC_1ST) {
          if (subData.tikTokTopicSt.length > 0) {
            conciseData.push(JSON.parse(JSON.stringify(subData)))
            subData.tikTokTopicNd = []
          }
          subData.tikTokTopicSt = element.DOUYIN_TOPIC_1ST
          subData.tikTokTopicNd.push(element.DOUYIN_TOPIC_2ND)
        } else {
          // subData.tikTokTopicSt = element.DOUYIN_TOPIC_1ST
          subData.tikTokTopicNd.push(element.DOUYIN_TOPIC_2ND)
        }
      });
      conciseData.push(JSON.parse(JSON.stringify(subData)))
      return conciseData
    },
    /**
     * 请求对应榜单数据
     */
    getTikTokHotTagContentData(topicST, topicND) {
      this.tikTokListContent = []
      let ssdt = window.sessionStorage.getItem(`DOUYIN_TOPICS_${topicST}_${topicND}`)
      if (ssdt) {
        this.tikTokListContent = JSON.parse(ssdt);
      } else {
        vueApi.tikTokApi.get('/ai_market/ai_douyin/get_hot_search_data/v1', { params: {DOUYIN_TOPIC_1ST: topicST, DOUYIN_TOPIC_2ND: topicND} }).then(res => {
          if (res.status === 200) {
            console.log(res.data)
            window.sessionStorage.setItem(`DOUYIN_TOPICS_${topicST}_${topicND}`, JSON.stringify(res.data.DOUYIN_TOPICS))
            this.tikTokListContent = res.data.DOUYIN_TOPICS;
          } else {
            throw new Error('请求/ai_market/ai_douyin/get_hot_search_data/v1 API失败')
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
