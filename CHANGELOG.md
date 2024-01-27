## [2.0.1](https://github.com/retejs/context-menu-plugin/compare/v2.0.0...v2.0.1) (2024-01-27)


### Bug Fixes

* **build:** source maps ([9da0654](https://github.com/retejs/context-menu-plugin/commit/9da065467ffb9d32aa7a974027e2e688c723aebb))

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
