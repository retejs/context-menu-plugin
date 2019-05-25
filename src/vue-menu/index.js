import Item from './Item.vue';
import VueMenu from './Menu.vue';
import Search from './Search.vue';
import Vue from 'vue';
import Menu from '../menu';

export default class extends Menu {

    constructor(editor, props) {
        super();
        const el = document.createElement('div');

        editor.view.container.appendChild(el);

        this.$root = new Vue({
            render: h => h(VueMenu, { props })
        }).$mount(el);
    }

    addItem(...args) {
        this.$root.$emit('additem', ...args);
    }

    show(...args) {
        this.$root.$emit('show', ...args);
    }

    hide() {
        this.$root.$emit('hide');
    }
}

export {
    Item,
    Menu,
    Search
}