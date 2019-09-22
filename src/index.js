import MainMenu from './main-menu';
import NodeMenu from './node-menu';
import VueItem from './menu/Item.vue';
import VueMenu from './menu/Menu.vue';
import VueSearch from './menu/Search.vue';
import { isFunction } from 'lodash-es';

function install(editor, {
    searchBar = true,
    searchKeep = () => false,
    delay = 1000,
    items = {},
    nodeItems = {},
    allocate = () => [],
    rename = component => component.name,
    vueComponent = null
}) {
    editor.bind('hidecontextmenu');
    editor.bind('showcontextmenu');

    let menu = null;

    editor.on('hidecontextmenu', () => {
        if (menu) menu.hide();
    });

    editor.on('click contextmenu', () => {
        editor.trigger('hidecontextmenu');
    });

    editor.on('contextmenu', ({ e, node }) => {
        e.preventDefault();
        e.stopPropagation();

        if (!editor.trigger('showcontextmenu', { e, node })) return;

        const [x, y] = [e.clientX, e.clientY];

        if(node) {
            menu = new NodeMenu(editor, { searchBar: false, delay }, vueComponent,  isFunction(nodeItems) ? nodeItems(node) : nodeItems);
            menu.show(x, y, { node });
        } else {
            menu = new MainMenu(editor, { searchBar, searchKeep, delay }, vueComponent, { items, allocate, rename });
            menu.show(x, y);
        }
    });
}

export const Menu = VueMenu;
export const Item = VueItem;
export const Search = VueSearch;

export default {
    name: 'context-menu',
    install
}
