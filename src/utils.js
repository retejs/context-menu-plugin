export async function createNode(component, { data = {}, meta = {}, x, y }) {
    const node = await component.createNode(data);

    node.meta = meta;
    node.position[0] = x;
    node.position[1] = y;

    return node;
}
