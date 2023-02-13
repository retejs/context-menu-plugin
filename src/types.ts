import { BaseSchemes } from 'rete'

import { ContextMenuPlugin } from '.'

export type Item = {
  label: string
  key: string
  handler(): void
  subitems?: Item[]
}

export type ItemsCollection = {
  searchBar?: boolean,
  list: Item[]
}

export type Items<Schemes extends BaseSchemes, K> = (
  context: 'root' | Schemes['Node'],
  plugin: ContextMenuPlugin<Schemes, K>
) => ItemsCollection
