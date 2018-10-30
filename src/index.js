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
    const mouse = { x: 0, y: 0 };

    const menu = createMenu(editor, { searchBar, delay });
    const nodeMenu = createMenu(editor, { searchBar: false, delay });

    nodeMenu.$emit('additem', {
        title: 'Delete',
        onClick(args) {
            editor.removeNode(args.node);
        }
    });

    editor.on('componentregister', component => {
        menu.$emit('additem', {
            title: component.name,
            async onClick() {
                editor.addNode(await createNode(component, mouse));
            },
            path: allocate(component)
        });
    });

    editor.on('mousemove', ({ x, y }) => {
        mouse.x = x;
        mouse.y = y;
    });

    editor.on('contextmenu', ({ e, node }) => {
        e.preventDefault();
        e.stopPropagation();
        const [x, y] = [e.clientX, e.clientY];

        menu.$emit('hide');
        nodeMenu.$emit('hide');

        if (node) {
            nodeMenu.$emit('show', x, y, { node });
        } else {
            menu.$emit('show', x, y);
        }
    });
}

export default {
    install
}