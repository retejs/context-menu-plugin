export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export async function createNode(component, { data = {}, meta = {}, x = 0, y = 0 }) {
    const node = await component.createNode(deepCopy(data));

    node.meta = Object.assign(deepCopy(meta), node.meta);
    node.position[0] = x;
    node.position[1] = y;
    
    return node;
}

export function traverse(items, callback, path = []) {
    for (const key in items){
        const item = items[key];
        if (typeof item.subitems === 'object')
            traverse(item.subitems, callback, [...path, key])
        else
            callback(item.title, item.callback, path)
    }
}

export function fitViewport([x, y], element) {
    return [
        Math.min(x, window.innerWidth - element.clientWidth),
        Math.min(y, window.innerHeight - element.clientHeight)
    ]
}