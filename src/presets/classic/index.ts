import { BaseSchemes, GetSchemes, NodeEditor, Scope } from 'rete'

import { Item, Items } from '../../types'

type BSchemes = GetSchemes<
  BaseSchemes['Node'] & { clone?: () => BaseSchemes['Node'] },
  BaseSchemes['Connection']
>
type NodeFactory<Schemes extends BSchemes> = () => Schemes['Node'] | Promise<Schemes['Node']>

export function setup<Schemes extends BSchemes>(nodes: [string, NodeFactory<Schemes>][]) {
  return <Items<Schemes>>(function (context, plugin) {
    const area = plugin.parentScope() as Scope<any> & {
      translate(nodeId: string, position: any): void
      area: { pointer: any }
    }
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

              area.translate(node.id, area.area.pointer)
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

        area.translate(node.id, area.area.pointer)
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
