import Menu from './menu/index';
import { createNode } from './utils';

export default class NodeMenu extends Menu {
    constructor(editor, props) {
        super(editor, props);
        
        this.addItem('Delete', ({ node }) => editor.removeNode(node));
        this.addItem('Clone', async (args) => {
            const { name, position: [x, y], ...params } = args.node;
            const component = editor.components.get(name);
            const node = await createNode(component, { ...params, x: x + 10, y: y + 10 });
    
            editor.addNode(node);
        });
    }
}