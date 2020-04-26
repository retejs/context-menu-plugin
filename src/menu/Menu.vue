<template lang="pug">
.context-menu(
  ref="menu"
  v-if="visible"
  v-bind:style="style",
  @mouseleave='timeoutHide()',
  @mouseover="cancelHide()"
  @contextmenu.prevent=""
  @wheel.stop=""
)
  Search(v-if="searchBar", v-model="filter", @search="onSearch")
  Item(v-for='item in filtered'
    :key="item.title"
    :item="item"
    :args="args"
    :delay="delay / 2"
  )
</template>

<script>
import hideMixin from './debounceHide'
import Item from './Item.vue';
import Search from './Search.vue';
import { fitViewport } from '../utils';

export default {
  props: { searchBar: Boolean, searchKeep: Function },
  mixins: [hideMixin('hide')],
  data() {
    return {
      x: 0,
      y: 0,
      visible: false,
      args: {},
      filter: '',
      items: [],
    }
  },
  computed: {
    style() {
      return {
        top: this.y+'px', 
        left: this.x+'px'
      }
    },
    filtered() {
      if(!this.filter) return this.items;
      const regex = new RegExp(this.filter, 'i');
      
      return this.extractLeafs(this.items)
        .filter(({ title }) => {
          return this.searchKeep(title) || title.match(regex)
        });
    }
  },
  methods: {
    extractLeafs(items) {
      if(!items) return [];
      let leafs = [];
      items.map(item => {
        if(!item.subitems) leafs.push(item)

        leafs.push(...this.extractLeafs(item.subitems))
      })

      return leafs;
    },
    onSearch(e) {
      this.filter = e;
    },
    show(x, y, args = {}) {
      this.visible = true;
      this.x = x;
      this.y = y;
      this.args = args;
  
      this.cancelHide();
    },
    hide() {
      this.visible = false;
    },
    additem(title, onClick, path = []) {
      let items = this.items;
      for(let level of path) {
        let exist = items.find(i => i.title === level);

        if(!exist) {
          exist = { title: level, subitems: [] };
          items.push(exist)
        }

        items = exist.subitems || (exist.subitems = []);
      }

      items.push({ title, onClick });
    },
  },
  updated() {
    if(this.$refs.menu) {
      [this.x, this.y] = fitViewport([this.x, this.y], this.$refs.menu)
    } 
  },
  mounted() {
    this.$root.$on('show', this.show);
    this.$root.$on('hide', this.hide);
    this.$root.$on('additem', this.additem);
  },
  components: {
    Item,
    Search
  }
}
</script>


<style lang="sass" scoped>
@import '../vars.sass'
@import '../common.sass'

.context-menu
  left: 0
  top: 0
  position: fixed
  padding: 10px
  width: $width
  margin-top: -20px
  margin-left: -$width/2
  .search
    @extend .item
</style>
