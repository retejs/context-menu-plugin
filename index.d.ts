import { Plugin as RetePlugin } from 'rete/types/core/plugin';
import { Node, Component } from 'rete';
import Vue from 'vue';

export interface ContextMenuPlugin extends RetePlugin {
  install: (editor: unknown, options: {
    searchBar?: boolean,
    searchKeep?: (title: string) => boolean,
    delay?: number,
    items?: {[index: string]: () => any},
    nodeItems?: {[index: string]: boolean | (() => void)} | ((node: Node) => {[index: string]: (() => void)}),
    allocate?: (component: Component) => string[],
    rename?: (component: Component) => string,
    vueComponent?: typeof Vue.component,
  }) => void,
}

declare const _default: ContextMenuPlugin;
export default _default;