import * as alight from 'alight';
import template from './menu.pug';

export function Item(scope, el, expression, env) {
    var l = env.changeDetector.locals;
    var item = l.subitem || l.item;

    el.addEventListener('click', e => {
        this.onClick(item);
        e.stopPropagation();
    });
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
        
        return this.items.filter(key => regex.test(key));
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