import { NodeEditor } from 'rete'
import { BaseAreaPlugin } from 'rete-area-plugin'

import { Item } from '../../types'
import { BSchemes, ItemDefinition } from './types'

export function createItem<S extends BSchemes>(
  [label, factory]: ItemDefinition<S>,
  key: string | number,
  context: { editor: NodeEditor<S>, area: BaseAreaPlugin<S, any> }
): Item {
  const item = {
    label,
    key: String(key)
  }

  if (typeof factory === 'function') {
    return <Item>{
      ...item,
      async handler() {
        const node = await factory()

        await context.editor.addNode(node)

        context.area.translate(node.id, context.area.area.pointer)
      }
    }
  }
  return <Item>{
    ...item,
    handler() {/* do nothing */},
    subitems: factory.map((data, i) => createItem(data, i, context))
  }
}
