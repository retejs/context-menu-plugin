import './index.sass';
import { ContextMenu } from './context-menu';

class NodeItems {
    constructor(editor) {
        this.editor = editor;
        this.items = {
            'Remove': 'remove'
        };
    }

    onClick(node, item) {
        switch (item) {
        case 'remove': this.editor.removeNode(node); break;    
        default: break;    
        }
    }
}

class ComponentItems {
    constructor(editor) {
        this.editor = editor;
        this.items = {};
    }

    async onClick({x, y}, item) {
        const node = await item.createNode();

        node.position[0] = x;
        node.position[1] = y;
        this.editor.addNode(node);
    }
}

function install(editor, { searchBar = true }) {
    const nodeItems = new NodeItems(editor);
    const compItems = new ComponentItems(editor);
    const menu = new ContextMenu;
    const mouse = { x: 0, y: 0 };

    document.body.appendChild(menu.el);

    editor.on('componentregister', component => {
        compItems.items[component.name] = component;
    });

    editor.on('mousemove', ({ x, y }) => {
        mouse.x = x;
        mouse.y = y;
    });

    editor.on('contextmenu', ({ e, node, view }) => {
        e.preventDefault();
        e.stopPropagation();
        const [x, y] = [e.clientX, e.clientY];
        
        if (node)
            menu.show(x, y, nodeItems.items, false, item => (menu.hide(), nodeItems.onClick(node, item)))
        else
            menu.show(x, y, compItems.items, searchBar, item => (menu.hide(), compItems.onClick(mouse, item)))
    });

    editor.on('click', ({ e, container }) => {
        const [x, y] = [e.clientX, e.clientY];

        menu.hide();
    });
}

export default {
    install
}