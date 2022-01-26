<template>
    <div class="context-menu" ref="myRefMenu"
         v-if="visible"
         v-bind:style="style"
         @mouseleave='timeoutHide'
         @mouseover="cancelHide"
         @contextmenu.prevent=""
         @wheel.stop="">
        <Search v-if="searchBar" v-model="filter" @search="onSearch"></Search>
        <Item v-for='item in filtered'
              :key="item.title"
              :item="item"
              :delay="delay / 2"
              @hide="hide"
              @click="itemClicked"
        ></Item>
    </div>
</template>

<script>
import { computed, defineComponent, nextTick, onMounted, onUpdated, ref } from "vue";
import debounce from "../lib/debounce";
import Item from './Item.vue';
import Search from './Search.vue';
import { fitViewport } from '../utils';

export default defineComponent({
  components: {
        Item, Search
  },
  props: {
      searchBar: {type: Boolean, default: false },
      searchKeep: {type: Function, default: () => {} },
      delay: { type: Number, required: true }
  },
  setup(props) {
      onMounted(() => {
          timeoutHide = debounce(hide, props.delay);
      })
      onUpdated(() => {
          nextTick(() => {
              if (myRefMenu.value) {
                  [posLeft.value, posTop.value] = fitViewport([posLeft.value, posTop.value], myRefMenu.value);
              }
          });
      })
      let timeoutHide = () => {};
      let posLeft = ref(0);
      let posTop = ref(0);
      let items = [];
      const filter = ref('');
      const myRefMenu = ref();
      const visible = ref(false);
      let args = {};
      const style = computed(() => {
          return {
              '--pos-left': posLeft.value+'px',
              '--pos-top': posTop.value+'px'
          }
      });
      const filtered = computed(() => {
          if(!filter.value) return items;
          const regex = new RegExp(filter.value, 'i');

          return extractLeafs(items)
              .filter(({ title }) => {
                  return props.searchKeep(title) || title.match(regex)
              });
      });
      const extractLeafs = (items) => {
          if(!items) return [];
          let leafs = [];
          items.map(item => {
              if(!item.subitems) leafs.push(item)

              leafs.push(...extractLeafs(item.subitems))
          })

          return leafs;
      };
      const onSearch = (e) => {
          filter.value = e;
      };
      const show = (x, y, localArgs = {}) => {
          visible.value = true;
          posLeft.value = x;
          posTop.value = y;
          args = localArgs;

          cancelHide();
      };
      const hide = () => {
          visible.value = false;
      };
      const cancelHide = () => {
          const hide = timeoutHide;
          if (hide && hide.cancel)
              timeoutHide.cancel();
      }
      const additem = (title, onClick, path = []) => {
          for(let level of path) {
              let exist = items.find(i => i.title === level);

              if(!exist) {
                  exist = { title: level, subitems: [] };
                  items.push(exist)
              }

              items = exist.subitems || (exist.subitems = []);
          }

          items.push({ title, onClick });
      };
      const itemClicked = (item) => {
          if(item.onClick)
              item.onClick(args);
      }
      return {
          posLeft,
          posTop,
          visible,
          filter,
          items,
          style,
          filtered,
          myRefMenu,
          extractLeafs,
          onSearch,
          show,
          hide,
          additem,
          timeoutHide,
          cancelHide,
          itemClicked
      }
  }
})
</script>


<style lang="scss" scoped>

@use "sass:math";
@import 'src/vars';
@import 'src/common';

.context-menu {
    left: var(--pos-left, 0);
    top: var(--pos-top, 0);
    position: fixed;
    padding: 10px;
    width: $width;
    margin-top: -20px;
    margin-left: -(math.div($width, 2));
    .search {
        @extend .item;
    }
}
</style>
