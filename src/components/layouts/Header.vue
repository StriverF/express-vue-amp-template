<template>
  <div class="xx-header">
    <div class="left-box" @click="clickLeftBox"><span v-text="leftText"></span></div>
    <div class="title-box" @click="toHome"><h1 v-text="title"></h1></div>
    <div class="right-box" @click="clickRightBox"><span v-text="rightText">AMP页面</span></div>
    <!-- <h1>抖音排行榜</h1> -->
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    leftText: String,
    rightText: String,
  },
  mounted() {

  },
  methods: {
    toHome () {
      this.$router.push({ path: '/' }).catch(err => {
        console.log(err)
      })
    },
    clickLeftBox () {
      // this.$router.push({ path: '/subsite/home' } )
      if (this.leftText === "子站点") {
        window.location = '/subsite/home'
      } else if (this.leftText === "主站点") {
        window.location = '/'
      }
    },
    clickRightBox () {
      window.location = '/amp/pets'
    }
  }
}
</script>

<style lang="less" scoped>
@box-width: 68px;
@nav-height: 60px;
.xx-header {
  position: fixed;
  width: 100%;
  height: @nav-height;
  background-color: #0398e1;
  box-shadow: 0 0 5px #0398e1;
  z-index: 100;
  .left-box {
    height: 100%;
    width: @box-width;
    float: left;
    text-align: center;
    line-height: @nav-height;
    span {
      color: #fff;
    }
  }
  .right-box {
    height: 100%;
    width: @box-width;
    float: left;
    text-align: center;
    line-height: @nav-height;
    span {
      color: #fff;
    }
  }
  .title-box {
    height: 100%;
    width: calc(100% - @box-width - @box-width);
    float: left;
    h1 {
      text-align: center;
      padding: 18px;
      font-size: 18px;
      color: #fff
    }
  }
}
</style>
