<template>
    <div @click="onClick"
         @mouseover="showSubitems"
         @mouseleave="timeoutHide"
         class="item"
         :class="{ hasSubitems }">
        {{item.title}}
        <div class="subitems" v-show="hasSubitems && visibleSubitems">
            <Item v-for="subitem in item.subitems" :key="subitem.title"
                 :item="subitem"
                 :args="args"
                 :delay="delay"
                  @hide="$emit('hide')"
            >
            </Item>
        </div>
    </div>
</template>

<script>
import { debounce } from "lodash-es";
import { computed, defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  props: {
      item: Object,
      args: Object,
      delay: { type: Number, required: true }
  },
  emits: ["search"],
  setup(props, { emit }) {
      onMounted(() => {
          timeoutHide = debounce(hideSubitems, props.delay);
      })
    let timeoutHide = () => {};
    const visibleSubitems = ref(false);
    const hasSubitems = computed(() => {
          return props.item.subitems
    });
    const cancelHide = () => {
          const hide = timeoutHide;
          if (hide && hide.cancel)
              timeoutHide.cancel();
    }
    const showSubitems = () => {
          visibleSubitems.value = true;
          cancelHide();
      };
    const hideSubitems = () => {
          visibleSubitems.value = false;
    }
    const onClick = (e) => {
      e.stopPropagation();
      if(props.item.onClick)
        props.item.onClick(props.args);
      emit('hide');
    }

    return {
        onClick,
        showSubitems,
        timeoutHide,
        hasSubitems,
        visibleSubitems
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
