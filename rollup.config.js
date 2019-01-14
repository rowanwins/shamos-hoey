import resolve from 'rollup-plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'

const output = (file, plugins) => ({
    input: './src/main.js',
    output: {
        name: 'shamosHoey',
        format: 'umd',
        file,
        exports: 'default'
    },
    plugins
})

export default [
    output('./dist/shamosHoey.js', [resolve()]),
    output('./dist/shamosHoey.min.js', [resolve(), terser()])
]
