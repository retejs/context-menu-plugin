import MainMenu from './main-menu';
import NodeMenu from './node-menu';
import VueItem from './menu/Item.vue';
import VueMenu from './menu/Menu.vue';
import VueSearch from './menu/Search.vue';

import isFunction from 'lodash/isFunction';

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

    const mainMenu = new MainMenu(editor, { searchBar, searchKeep, delay }, vueComponent, { items, allocate, rename });
    let nodeMenu = null;

    editor.on('hidecontextmenu', () => {
        mainMenu.hide();
        if (nodeMenu) {
            nodeMenu.hide();
        }
    });

    editor.on('click contextmenu', () => {
        editor.trigger('hidecontextmenu');
    });

    editor.on('contextmenu', ({ e, node }) => {
        e.preventDefault();
        e.stopPropagation();
        nodeItems = isFunction(nodeItems) ? nodeItems(node) : nodeItems;
        nodeMenu = node ? new NodeMenu(editor, { searchBar: false, delay }, vueComponent, nodeItems) : nodeMenu;

        if (!editor.trigger('showcontextmenu', { e, node })) return;

        const [x, y] = [e.clientX, e.clientY];
        const menu = node ? nodeMenu : mainMenu;

        menu.show(x, y, { node });
    });
}

export const Menu = VueMenu;
export const Item = VueItem;
export const Search = VueSearch;

export default {
    name: 'context-menu',
    install
}
