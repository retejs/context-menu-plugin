export async function createNode(component, { data = {}, meta = {}, x, y }) {
    const node = await component.createNode(data);

    node.meta = meta;
    node.position[0] = x;
    node.position[1] = y;

    return node;
}

export function traverse(items, callback, path = []) {
    if (typeof items !== 'object') return;

    Object.keys(items).map(key => {
        if (typeof items[key] === 'function')
            callback(key, items[key], path)
        else 
            traverse(items[key], callback, [...path, key])
    })
}