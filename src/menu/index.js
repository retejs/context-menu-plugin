import Menu from './Menu.vue';
import Vue from 'vue';

export default class {
    
    constructor(editor, props, vueComponent) {
        const el = document.createElement('div');

        editor.view.container.appendChild(el);

        this.menu = new Vue({
            render: h => h(vueComponent || Menu, { props })
        }).$mount(el);
    }

    addItem(...args) {
        this.menu.$emit('additem', ...args);
    }

    show(...args) {
        this.menu.$emit('show', ...args);
    }

    hide() {
        this.menu.$emit('hide');
    }
}