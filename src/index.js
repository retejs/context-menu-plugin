import Menu from './Menu.vue';
import Vue from 'vue';

async function createNode(component, { x, y }) {
    const node = await component.createNode();

    node.position[0] = x;
    node.position[1] = y;

    return node;
}

function install(editor, { searchBar = true, allocate = () => [] }) {
    const el = document.createElement('div');
    const mouse = { x: 0, y: 0 };

    document.body.appendChild(el);

    const menu = new Vue({
        render: h => h(Menu),
        props: {
            searchBar
        }
    }).$mount(el);

    editor.on('componentregister', component => {
        menu.$emit('additem', {
            title: component.name,
            async onClick() {
                editor.addNode(await createNode(component, mouse));
                menu.$emit('hide');
            },
            path: allocate(component)
        });
    });

    editor.on('mousemove', ({ x, y }) => {
        mouse.x = x;
        mouse.y = y;
    });

    editor.on('contextmenu', ({ e }) => {
        e.preventDefault();
        e.stopPropagation();
        const [x, y] = [e.clientX, e.clientY];

        menu.$emit('show', x, y);});
}

export default {
    install
}