import { NodeEditor } from 'rete'
import { BaseAreaPlugin } from 'rete-area-plugin'

import { Item } from '../../types'
import { BSchemes, ItemDefinition } from './types'

export function createItem<S extends BSchemes>(
  [label, factory]: ItemDefinition<S>,
  key: string | number,
  context: { editor: NodeEditor<S>, area: BaseAreaPlugin<S, any> }
): Item {
  const item: Item = {
    label,
    key: String(key),
    handler() {
      /* noop */
    }
  }

  if (typeof factory === 'function') {
    return {
      ...item,
      async handler() {
        const node = await factory()

        await context.editor.addNode(node)

        void context.area.translate(node.id, context.area.area.pointer)
      }
    } satisfies Item
  }
  return {
    ...item,
    handler() { /* do nothing */ },
    subitems: factory.map((data, i) => createItem(data, i, context))
  } satisfies Item
}
