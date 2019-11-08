<template>
  <div class="list-2nd">
    <ul class="hot-tag-list-2nd">
      <li v-for="(selectTag, index) in selectTagList" :key="index">
        <a
          href="javascript:void(0)"
          :class="{active: index === tagActive}"
          @click="clickTopTagND(index)"
        >
          <span>{{selectTag}}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    selectTagList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tagActive: 0,
    }
  },
  methods: {
    clickTopTagND (index) {
      this.tagActive = index
      this.$emit('clickTopTagND', index);
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
