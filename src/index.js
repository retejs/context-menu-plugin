import Menu from './Menu.vue';
import Vue from 'vue';

async function createNode(component, { x, y }) {
    const node = await component.createNode();

    node.position[0] = x;
    node.position[1] = y;

    return node;
}

function createMenu(editor, props) {
    const el = document.createElement('div');

    editor.view.container.appendChild(el);

    const menu = new Vue({
        render: h => h(Menu, { props })
    }).$mount(el);

    return menu;
}

function install(editor, { searchBar = true, delay = 1000, allocate = () => [] }) {
    editor.bind('hidecontextmenu');

    const mouse = { x: 0, y: 0 };

    const menu = createMenu(editor, { searchBar, delay });
    const nodeMenu = createMenu(editor, { searchBar: false, delay });

    editor.on('hidecontextmenu', () => {
        menu.$emit('hide');
        nodeMenu.$emit('hide');
    });

    nodeMenu.$emit('additem', {
        title: 'Delete',
        onClick(args) {
            editor.removeNode(args.node);
        }
    });

    editor.on('componentregister', component => {
        const path = allocate(component);

        if (Array.isArray(path)) // add to the menu if path is array
            menu.$emit('additem', {
                title: component.name,
                async onClick() {
                    editor.addNode(await createNode(component, mouse));
                },
                path
            });
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
            nodeMenu.$emit('show', x, y, { node });
        } else {
            menu.$emit('show', x, y);
        }
    });
}

export default {
    name: 'context-menu',
    install
}