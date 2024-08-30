## [2.0.4](https://github.com/retejs/context-menu-plugin/compare/v2.0.3...v2.0.4) (2024-08-30)


### Bug Fixes

* update cli and fix linting errors ([e5447be](https://github.com/retejs/context-menu-plugin/commit/e5447beb1d97b43f0ad52d6846460cbc96b27d7d))

## [2.0.3](https://github.com/retejs/context-menu-plugin/compare/v2.0.2...v2.0.3) (2024-04-17)


### Bug Fixes

* delete connection error ([8cf887d](https://github.com/retejs/context-menu-plugin/commit/8cf887d91f85b0a1ccd643fc5931b544b68952ca))

## [2.0.2](https://github.com/retejs/context-menu-plugin/compare/v2.0.1...v2.0.2) (2024-03-07)


### Bug Fixes

* item click handler [#81](https://github.com/retejs/context-menu-plugin/issues/81) ([a9c3f22](https://github.com/retejs/context-menu-plugin/commit/a9c3f2285af6161aecb26390129348594a1d6186))

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
