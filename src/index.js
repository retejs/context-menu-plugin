import MainMenu from './main-menu';
import NodeMenu from './node-menu';

function install(editor, { 
    searchBar = true,
    delay = 1000,
    items = {},
    allocate = () => [],
    rename = component => component.name
}) {
    editor.bind('hidecontextmenu');

    const mainMenu = new MainMenu(editor, { searchBar, delay }, { items, allocate, rename });
    const nodeMenu = new NodeMenu(editor, { searchBar: false, delay });

    editor.on('hidecontextmenu', () => {
        mainMenu.hide();
        nodeMenu.hide();
    });

    editor.on('click contextmenu', () => {
        editor.trigger('hidecontextmenu');
    });

    editor.on('contextmenu', ({ e, node }) => {
        e.preventDefault();
        e.stopPropagation();

        const [x, y] = [e.clientX, e.clientY];
        const menu = node ? nodeMenu : mainMenu;

        menu.show(x, y, { node });
    });
}

export default {
    name: 'context-menu',
    install
}