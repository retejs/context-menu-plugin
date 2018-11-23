import { createNode } from './utils';
import Menu from './Menu';

function install(editor, { searchBar = true, delay = 1000, allocate = () => [] }) {
    editor.bind('hidecontextmenu');

    const mouse = { x: 0, y: 0 };

    const menu = new Menu(editor, { searchBar, delay });
    const nodeMenu = new Menu(editor, { searchBar: false, delay });

    editor.on('hidecontextmenu', () => {
        menu.hide();
        nodeMenu.hide();
    });

    nodeMenu.addItem('Delete', (args) => {
        editor.removeNode(args.node);
    });

    editor.on('componentregister', component => {
        const path = allocate(component);

        if (Array.isArray(path)) // add to the menu if path is array
            menu.addItem(component.name, async () => {
                editor.addNode(await createNode(component, mouse));
            },
            path);
    });

    editor.on('mousemove', ({ x, y }) => {
        mouse.x = x;
        mouse.y = y;
    });

    editor.on('click contextmenu', () => {
        editor.trigger('hidecontextmenu');
    });

    editor.on('contextmenu', ({ e, node }) => {
        e.preventDefault();
        e.stopPropagation();

        const [x, y] = [e.clientX, e.clientY];

        if (node) {
            nodeMenu.show(x, y, { node });
        } else {
            menu.show(x, y);
        }
    });
}

export default {
    name: 'context-menu',
    install
}