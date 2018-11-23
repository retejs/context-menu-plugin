export async function createNode(component, { x, y }) {
    const node = await component.createNode();

    node.position[0] = x;
    node.position[1] = y;

    return node;
}
