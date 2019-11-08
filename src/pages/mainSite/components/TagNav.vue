<template>
  <div class="list-1st">
    <ul class="hot-tag-list-1ts">
      <li v-for="(item, index) in tikTokHotTagData" :key="index" >
        <a href="javascript:void(0)" :class="{active: index === tagActive}" @click="clickTopTag(index)">{{item.tikTokTopicSt}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tikTokHotTagData: {
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
    clickTopTag (index) {
      this.tagActive = index
      this.$emit('clickTopTag', index);
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
