import { NodeEditor } from 'rete'
import { BaseAreaPlugin } from 'rete-area-plugin'

import { Item, Items } from '../../types'
import { createItem } from './factory'
import { BSchemes, ItemDefinition } from './types'

/**
 * Classic context menu preset.
 * Configures nodes/actions items for root and Delete/Clone items for nodes
 * @param nodes List of items
 * @example Presets.classic.setup([
 *  ["Math", [
 *    ["Number", () => new NumberNode()],
 *  ]]
 *])
 */
export function setup<Schemes extends BSchemes>(nodes: ItemDefinition<Schemes>[]) {
  return function (context, plugin) {
    const area = plugin.parentScope<BaseAreaPlugin<Schemes, any>>(BaseAreaPlugin)
    const editor = area.parentScope<NodeEditor<Schemes>>(NodeEditor)

    if (context === 'root') {
      return {
        searchBar: true,
        list: nodes.map((item, i) => createItem(item, i, { editor, area }))
      }
    }

    const deleteItem: Item = {
      label: 'Delete',
      key: 'delete',
      async handler() {
        if ('source' in context && 'target' in context) {
          // connection
          const connectionId = context.id

          await editor.removeConnection(connectionId)
        } else {
          // node
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
    }

    const clone = context.clone?.bind(context)
    const cloneItem: undefined | Item = clone && {
      label: 'Clone',
      key: 'clone',
      async handler() {
        const node = clone()

        await editor.addNode(node)

        void area.translate(node.id, area.area.pointer)
      }
    }

    return {
      searchBar: false,
      list: [
        deleteItem,
        ...cloneItem
          ? [cloneItem]
          : []
      ]
    }
  } satisfies Items<Schemes>
}
