import pug from 'rollup-plugin-pug';
import sass from 'rollup-plugin-sass';

export default {
    input: 'src/index.js',
    name: 'ContextMenuPlugin',
    globals: {
        'alight': 'alight'
    },
    plugins: [
        pug({
            pugRuntime: false
        }),
        sass({
            insert: true
        })
    ]
}