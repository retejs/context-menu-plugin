import { BaseSchemes, GetSchemes, NodeEditor } from 'rete'
import { AreaPlugin } from 'rete-area-plugin'

import { Item, ItemsCollection } from '../../types'

type BSchemes = GetSchemes<
  BaseSchemes['Node'] & { clone?: () => BaseSchemes['Node']},
  BaseSchemes['Connection']
>
type PresetProps<Schemes extends BSchemes, K> = {
  area: AreaPlugin<Schemes, K>
  editor: NodeEditor<Schemes>
}

export function setup<Schemes extends BSchemes, K>(nodes: [string, { new(): any }][], props: PresetProps<Schemes, K>) {
    return function (context: 'root' | Schemes['Node']): ItemsCollection {
        if (context === 'root') {
            return {
                searchBar: true,
                list: nodes.map(([label, Instance], i) => {
                    return {
                        label,
                        key: String(i),
                        async handler() {
                            const node = new Instance()

                            await props.editor.addNode(node)
                            const pointer = props.area.area.pointer

                            props.area.nodeViews.get(node.id)?.translate(pointer.x, pointer.y)
                        }
                    }
                })
            }
        }

        const deleteItem: Item = {
            label: 'Delete',
            key: 'delete',
            async handler() {
                const nodeId = context.id
                const connections = props.editor.getConnections().filter(c => {
                    return c.source === nodeId || c.target === nodeId
                })

                for (const connection of connections) {
                    await props.editor.removeConnection(connection.id)
                }
                await props.editor.removeNode(nodeId)
            }
        }

        const clone = context.clone
        const cloneItem: undefined | Item = clone && {
            label: 'Clone',
            key: 'clone',
            async handler() {
                const node = clone()

                await props.editor.addNode(node)

                const pointer = props.area.area.pointer

                props.area.nodeViews.get(node.id)?.translate(pointer.x, pointer.y)
            }
        }

        return {
            searchBar: false,
            list: [
                deleteItem,
                ...(cloneItem ? [cloneItem] : [])
            ]
        }
    }
}
