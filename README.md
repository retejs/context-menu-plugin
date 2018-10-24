Rete context menu plugin
====
#### Rete.js plugin

```js
import ContextMenuPlugin from 'rete-context-menu-plugin';

editor.use(ContextMenuPlugin, {
    searchBar: false,
    allocate(component) {
        return ['Submenu']
    }
});
```
| Options | Description | Default |
|-|-|-|
| `searchBar` | Showing search bar | `true`
| `allocate` | function for placing of components into submenu | `() => []`


You can arbitrarily put a component in a submenu. Examples: 

```js
allocate() { return ["Single submenu"] }
```

```js
allocate(component) { return component.path } // where path is a stack of menu for every component
```