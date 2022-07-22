import MainMenu from './main-menu';
import NodeMenu from './node-menu';
import VueItem from './menu/Item.vue';
import VueMenu from './menu/Menu.vue';
import VueSearch from './menu/Search.vue';

function install(editor, {
    searchBar = true,
    searchKeep = () => false,
    delay = 1000,
    items = {},
    nodeItems = {
        delete: {
            title: "Delete",
        },
        clone: {
            title: "Clone"
        }
    },
    allocate = () => [],
    rename = component => component.name,
    vueComponent = null
}) {
    editor.bind('hidecontextmenu');
    editor.bind('showcontextmenu');

    let mainMenu;
    let currentMenu;

    editor.on('hidecontextmenu', () => {
        if (currentMenu) currentMenu.hide();
    });

    editor.on('click contextmenu', () => {
        editor.trigger('hidecontextmenu');
    });

    editor.on('contextmenu', ({ e, node }) => {
        e.preventDefault();
        e.stopPropagation();

        if (!editor.trigger('showcontextmenu', { e, node })) return;

        const [x, y] = [e.clientX, e.clientY];
        let args;

        if(node) {
            currentMenu = new NodeMenu(editor, { searchBar: false, delay }, vueComponent, typeof nodeItems === 'function' ? nodeItems(node) : nodeItems);
            args = { node };
        } else {
            if (!mainMenu)
                mainMenu = new MainMenu(editor, { searchBar, searchKeep, delay }, vueComponent, { items, allocate, rename })
            currentMenu = mainMenu
            args = {}
        }
        currentMenu.show(x, y, args);
    });
}

export const Menu = VueMenu;
export const Item = VueItem;
export const Search = VueSearch;

export default {
    name: 'context-menu',
    install
}
