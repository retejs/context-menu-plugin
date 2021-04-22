import Menu from './menu/index';
import { createNode, traverse } from './utils';

export default class NodeMenu extends Menu {
    constructor(editor, props, vueComponent, nodeItems) {
        super(editor, props, vueComponent);

        if (nodeItems['Delete'] !== false) {
            this.addItem('Delete', ({ node }) => {
                if (editor.selected.list.indexOf(node) !== -1) {
                    editor.selected.remove(node);
                }

                editor.removeNode(node);
            });
        }
        if (nodeItems['Clone'] !== false) {
            this.addItem('Clone', async (args) => {
                const { name, position: [x, y], ...params } = args.node;
                const component = editor.components.get(name);
                const node = await createNode(component, { ...params, x: x + 10, y: y + 10 });

                editor.addNode(node);
            });
        }

        traverse(nodeItems, (name, func, path) => this.addItem(name, func, path))
    }
}
