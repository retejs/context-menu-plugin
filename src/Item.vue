<template lang="pug">
.item(
  @click="item.onClick && item.onClick()"
  @mouseover="showSubitems()"
  @mouseleave="timeoutHide()"
  :class="{ hasSubitems }"
) {{item.title}}
  .subitems(v-if="hasSubitems && this.visibleSubitems")
    Item(v-for="subitem in item.subitems", :key="subitem.title", :item="subitem")
</template>

<script>
import hideMixin from './debounceHide'

export default {
  name: 'Item',
  mixins: [hideMixin('hideSubitems', 500)],
  props: { item: Object },
  data() {
    return {
      visibleSubitems: false, 
    }
  },
  computed: {
    hasSubitems() {
      return this.item.subitems
    }
  },
  methods: {
    showSubitems() {
      this.visibleSubitems = true;
      this.cancelHide();
    },
    hideSubitems() {
      this.visibleSubitems = false;
    }
  }
}
</script>


<style lang="sass" scoped>
@import './vars.sass'
@import './common.sass'

.item
  @extend .item
  &.hasSubitems:after
    content: '►'
    position: absolute
    opacity: 0.6
    right: 5px
    top: 5px
  .subitems
    position: absolute
    top: 0
    left: 100%
    width: $width
    .subitem
      @extend .item
</style>
