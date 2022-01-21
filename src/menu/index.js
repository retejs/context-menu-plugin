import Menu from './Menu.vue';
import { createApp } from 'vue';

function createVue(el, vueComponent, vueProps) {
    const app = createApp(vueComponent, vueProps);
    return app.mount(el);
}

export default class {
    
    constructor(editor, props, vueComponent) {
        const el = document.createElement('div');

        editor.view.container.appendChild(el);

        this.menu = createVue(el, vueComponent || Menu, props)
    }

    addItem(...args) {
        this.menu.additem(...args);
    }

    show(...args) {
        this.menu.show(...args);
    }

    hide() {
        this.menu.hide();
    }
}