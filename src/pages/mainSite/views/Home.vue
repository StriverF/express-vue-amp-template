<template>
  <div class="xx-home">
    <!-- <h2>抖音热搜标签</h2> -->
    <!-- <a href="/subsite/home">去子站点首页</a> -->
    
    <div class="list-1st">
      <ul class="hot-tag-list-1ts">
        <li v-for="(item, index) in tikTokHotTagData" :key="index" >
          <a href="javascript:void(0)" :class="{active: index === tagActive}" @click="clickTopTag(item, index)">{{item.tikTokTopicSt}}</a>
        </li>
      </ul>
    </div>

    <div class="list-2nd"> 
      <ul class="hot-tag-list-2nd">
        <li v-for="(selectTag, index) in selectTagList" :key="index" >
          <a href="javascript:void(0)" :class="{active: index === tag2ndActive}" @click="clickTopTagND(index)"><span>{{selectTag}}</span></a>
        </li>
      </ul>
    </div>

    <div class="list-content">
      <ul v-if="tikTokListContent.length > 0" class="hot-tag-list-content">
        <li v-for="(contentItem, index) in tikTokListContent" :key="index" >
          <img :src="contentItem.DOUYIN_OWNER_IMAGE_SRC || contentItem.DOUYIN_BRAND_IMAGE_SRC" :alt="contentItem.DOUYIN_OWNER_TITLE" class="list-content-image">
          <span v-text="contentItem.DOUYIN_OWNER_TITLE || contentItem.DOUYIN_BRAND_TITLE"></span>
          <p v-text="contentItem.DOUYIN_TOPIC_SUB_TITLE"></p>
        </li>
      </ul>
      <div v-else class="hot-tag-list-content">
        <div class="sk-grid">
          <div class="sk-grid-cube"></div>
          <div class="sk-grid-cube"></div>
          <div class="sk-grid-cube"></div>
          <div class="sk-grid-cube"></div>
          <div class="sk-grid-cube"></div>
          <div class="sk-grid-cube"></div>
          <div class="sk-grid-cube"></div>
          <div class="sk-grid-cube"></div>
          <div class="sk-grid-cube"></div>
        </div>
      </div>
      
    </div>
    
    <!-- <div v-if="tikTokHotTagData">{{tikTokHotTagData}}</div>
    <div v-else>服务端没注入数据到htm文档</div> -->
  </div>
</template>

<script>
import vueApi from '../../../api/index'
import 'spinkit/spinkit.min.css'
export default {
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
      
      // if (faceIndexRes.status === 200 && faceIndexRes.content.length > 0) {
      //   this.moduleFloorInfo = faceIndexRes.content
      //   this.hasLoad = true
      // }
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
    clickTopTag (item, index) {
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
  h2 {
    margin-top: 30px;
  }
}
.list-1st {
  margin-bottom: 2px;
  .hot-tag-list-1ts {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    overflow-x: scroll;
    text-align: center; 
    align-items: center;
    background-color: #ffffff;
    li {
      border-left: 1px solid #cccccc;
      a {
        width: 0.86rem;
        height: 0.66rem;
        display: inline-block;
        padding-top: 0.18rem;
        background-color: #ffffff;
        &.active{
          background-color: #f1435a;
          color: white;
        }
      };
    }
  }
}

.list-2nd {
  width: 25%;
  float: left;
  background-color:#ffffff;
  .hot-tag-list-2nd {
    height: 700px;
    overflow-y: scroll;
    text-align: center;
    align-items: center;
    li {
      border-bottom: 2px solid #ffffff;
      a {
        width: 100%;
        height: 0.86rem;
        display: inline-block;
        position: relative;
        padding-top: 0.28rem;
        background-color: #F1F3F2;
        span {
          position: relative;
          color: #f1435a;
          z-index: 1;
        }
        &:before {
          content: ' ';
          position: absolute;
          right: 0;
          top: 0;
          background-color: #ffffff;
          -webkit-transform-origin: top right;
          transform-origin: top;
          bottom: 0;
          width: 0;
          transition: .4s;
        }
        &.active{
          &:before {
            width: 100%;
          }
        }
      };
    }
  }
}

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
    }
  }
  .sk-grid {
    margin-left: 130px;
    margin-top: 300px;
  }
  
}


</style>
