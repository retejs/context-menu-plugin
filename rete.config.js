import pug from 'rollup-plugin-pug';
import sass from 'rollup-plugin-sass';
import vue from 'rollup-plugin-vue';

export default {
    input: 'src/index.js',
    name: 'ContextMenuPlugin',
    globals: {
        'vue': 'Vue',
        'lodash-es': '_'
    },
    plugins: [
        pug({
            pugRuntime: false
        }),
        sass({
            insert: true
        }),
        vue()
    ]
}