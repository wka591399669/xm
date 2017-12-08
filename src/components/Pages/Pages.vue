<template>
  <div id="Pages" v-if="totalPage > 1">
    <flexbox>
        <flexbox-item>
          <x-button :disabled="nowPage <= 1" @click.native="turnPage('prev')">上一页</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button disabled>{{nowPage}}/{{totalPage}}</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button :disabled="nowPage >= totalPage" @click.native="turnPage('next')">下一页</x-button>
        </flexbox-item>
      </flexbox>
  </div>
</template>
<script>
import { XButton, Flexbox, FlexboxItem } from 'vux';

export default {
  name: 'Pages',
  components: {
    XButton,
    Flexbox,
    FlexboxItem
  },
  props: ['startRow', 'pageSize', 'totalCount'],
  data() {
    return {
      disabledPrev: false,
      disabledNext: false
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.totalCount / this.pageSize);
    },
    nowPage() {
      return Math.ceil((this.startRow + 1) / this.pageSize) || 1;
    }
  },
  created() {
    this.turnPage();
  },
  methods: {
    turnPage(v) {
      let startRow;
      if (v == 'prev') {
        startRow = this.startRow - this.pageSize;
      }
      if (v == 'next') {
        startRow = this.startRow + this.pageSize;
      }
      if (startRow <= 0) {
        startRow = 0;
      }
      this.$emit('change', startRow);
    }
  }
};
</script>
<style lang="less">
@import url('./Pages.less');
</style>
