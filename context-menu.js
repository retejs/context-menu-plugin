import * as alight from 'alight';
import template from './menu.pug';

export function Item(scope, el, expression, env) {
    var l = env.changeDetector.locals;
    var item = l.subitem || l.item;
    var haveSubitems = item.constructor === Object;

    el.addEventListener('click', e => {
        if (!haveSubitems)
            this.onClick(item);
        e.stopPropagation();
    });
    // .classed('have-subitems', haveSubitems);
}

export class ContextMenu {

    constructor() {
        this.visible = false;
        this.x = 0;
        this.y = 0;
        this.default = {
            searchBar: false,
            onClick() { throw new TypeError('onClick should be overrided');}
        };

        this.bindTemplate();
    }

    bindTemplate() {
        this.el = document.createElement('div');
        this.el.setAttribute('tabindex', 1);
        this.el.innerHTML = template();

        const al = alight.makeInstance();

        al.directives.al.item = Item.bind(this);
        this.$cd = al(this.el, { contextMenu: this });
    }

    searchItems(filter) {
        var regex = new RegExp(filter, 'i'); 
        var items = {};

        Object.keys(this.items).forEach(key => {
            var item = this.items[key];

            if (item.constructor === Object) {
                var subitems = Object.keys(item).filter(subitem => regex.test(subitem))

                if (subitems.length > 0) {
                    items[key] = {};
                    subitems.forEach(sumitem => {
                        items[key][sumitem] = item[sumitem];
                    });
                }
            }
            
            if (regex.test(key))
                items[key] = item;
        });

        return items;
    }

    haveSubitems(item) {
        return item.constructor === Object;
    }

    isVisible() {
        return this.visible;
    }

    show(x, y, items = null, searchBar = null, onClick = null) {
        if (this.disabled) return;
        
        this.visible = true;
        this.items = items || this.default.items;
        this.searchBar = searchBar || this.default.searchBar;
        this.onClick = onClick || this.default.onClick;
        this.x = x;
        this.y = y;
        this.$cd.scan();
    }

    hide() {
        this.visible = false;
        this.$cd.scan();
    }
}