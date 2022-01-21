<template>
<div @click="onClick($event)"
     @mouseover="showSubitems()"
     @mouseleave="timeoutHide()"
     class="item"
     :class="{ hasSubitems }">
    {{item.title}}
    <div class="subitems" v-show="hasSubitems && this.visibleSubitems">
        <Item v-for="subitem in item.subitems" :key="subitem.title"
             :item="subitem"
             :args="args"
             :delay="delay">
        </Item>
    </div>
</div>
</template>

<script>
import { defineComponent } from "vue";
import hideMixin from './debounceHide'

export default defineComponent({
  name: 'Item',
  mixins: [hideMixin('hideSubitems')],
  props: { item: Object, args: Object },
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
    },
    onClick(e) {
      e.stopPropagation();
      
      if(this.item.onClick)
        this.item.onClick(this.args);
      this.$root.$emit('hide');
    }
  }
})
</script>


<style lang="scss" scoped>

@import 'src/vars';
@import 'src/common';

.item {
    @extend .item;
    &.hasSubitems:after {
        content: '►';
        position: absolute;
        opacity: 0.6;
        right: 5px;
        top: 5px;
    }
    .subitems {
        position: absolute;
        top: 0;
        left: 100%;
        width: $width;
        .subitem {
            @extend .item;
        }
    }
}
</style>
