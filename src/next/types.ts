
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
