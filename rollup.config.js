import resolve from 'rollup-plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'
import strip from 'rollup-plugin-strip'

const output = (file, plugins) => ({
    input: './src/main.js',
    output: {
        name: 'shamosHoey',
        file,
        format: 'umd',
        exports: 'default'
    },
    plugins
})

export default [
    output('./dist/shamosHoey.js', [
        strip({
            functions: ['debugEventAndSegment', 'debugEventAndSegments']
        }),
        resolve()
    ]),
    output('./dist/shamosHoey.min.js', [
        strip({
            functions: ['debugEventAndSegment', 'debugEventAndSegments']
        }),
        resolve(),
        terser()
    ])
]
