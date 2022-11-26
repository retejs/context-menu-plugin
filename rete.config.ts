import { ReteOptions } from 'rete-cli'

export default <ReteOptions>{
    input: 'src/next/index.ts',
    name: 'ContextMenuPlugin',
    globals: {
        'rete': 'Rete',
        'rete-area-plugin': 'ReteAreaPlugin'
    }
}
