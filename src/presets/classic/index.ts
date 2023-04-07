import { BaseSchemes, GetSchemes, NodeEditor } from 'rete'
import { AreaPlugin } from 'rete-area-plugin'

import { Item, Items } from '../../types'

type BSchemes = GetSchemes<
  BaseSchemes['Node'] & { clone?: () => BaseSchemes['Node']},
  BaseSchemes['Connection']
>
type NodeFactory<Schemes extends BSchemes> = () => Schemes['Node'] | Promise<Schemes['Node']>

export function setup<Schemes extends BSchemes, K>(nodes: [string, NodeFactory<Schemes>][]) {
  return <Items<Schemes, K>>(function (context, plugin) {
    const area = plugin.parentScope<AreaPlugin<Schemes, K>>(AreaPlugin)
    const editor = area.parentScope<NodeEditor<Schemes>>(NodeEditor)

    if (context === 'root') {
      return {
        searchBar: true,
        list: nodes.map(([label, create], i) => {
          return {
            label,
            key: String(i),
            async handler() {
              const node = await create()

              await editor.addNode(node)
              const pointer = area.area.pointer

              area.nodeViews.get(node.id)?.translate(pointer.x, pointer.y)
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
        const connections = editor.getConnections().filter(c => {
          return c.source === nodeId || c.target === nodeId
        })

        for (const connection of connections) {
          await editor.removeConnection(connection.id)
        }
        await editor.removeNode(nodeId)
      }
    }

    const clone = context.clone
    const cloneItem: undefined | Item = clone && {
      label: 'Clone',
      key: 'clone',
      async handler() {
        const node = clone()

        await editor.addNode(node)

        const pointer = area.area.pointer

        area.nodeViews.get(node.id)?.translate(pointer.x, pointer.y)
      }
    }

    return {
      searchBar: false,
      list: [
        deleteItem,
        ...(cloneItem ? [cloneItem] : [])
      ]
    }
  })
}
