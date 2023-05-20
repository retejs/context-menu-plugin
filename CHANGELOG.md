## v2.0.0-beta.9

Support subitems

```ts
Presets.classic.setup([
  ["Math", [
    ["Number", () => new NumberNode()],
  ]]
])
```

## v2.0.0-beta.7

Breaking changes:

- removed generic from `ContextMenuExtra` (`ContextMenuExtra<Schemes>` -> `ContextMenuExtra`)
- removed generic from `ContextMenuPlugin` (`new ContextMenuPlugin<Schemes, AreaExtra>` ->  `new ContextMenuPlugin<Schemes>`)
