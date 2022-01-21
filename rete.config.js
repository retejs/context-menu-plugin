import commonjs from 'rollup-plugin-commonjs';
import pug from 'rollup-plugin-pug';
import scss from 'rollup-plugin-scss';
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
        vue(),
        scss({
            insert: true
        }),
        commonjs()
    ]
}