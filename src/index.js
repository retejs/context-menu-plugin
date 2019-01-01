import { createNode, traverse } from './utils';
import Menu from './Menu';

function configureNodeItems(menu, editor) {
    menu.addItem('Delete', ({ node }) => editor.removeNode(node));
    menu.addItem('Clone', async (args) => {
        const { name, position: [x, y], ...params } = args.node;
        const component = editor.components.get(name);

        editor.addNode(await createNode(component, { ...params, x: x + 10, y: y + 10 }));
    });
} 

function configureMainItems(menu, editor, { items, allocate, rename }) {
    const mouse = { x: 0, y: 0 };

    editor.on('mousemove', ({ x, y }) => {
        mouse.x = x;
        mouse.y = y;
    });
    
    editor.on('componentregister', component => {
        const path = allocate(component);

        if (Array.isArray(path)) // add to the menu if path is array
            menu.addItem(rename(component), async () => {
                editor.addNode(await createNode(component, mouse));
            },
            path);
    });

    traverse(items, (name, func, path) => menu.addItem(name, func, path))
}

function install(editor, { 
    searchBar = true,
    delay = 1000,
    items = {},
    allocate = () => [],
    rename = component => component.name
}) {
    editor.bind('hidecontextmenu');

    const menu = new Menu(editor, { searchBar, delay });
    const nodeMenu = new Menu(editor, { searchBar: false, delay });

    configureNodeItems(nodeMenu, editor);
    configureMainItems(menu, editor, { items, allocate, rename });

    editor.on('hidecontextmenu', () => {
        menu.hide();
        nodeMenu.hide();
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