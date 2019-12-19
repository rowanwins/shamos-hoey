import resolve from 'rollup-plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'
import strip from 'rollup-plugin-strip'

const output = (file, format, plugins) => ({
    input: './src/main.js',
    output: {
        name: 'shamosHoey',
        file,
        format,
        exports: 'default'
    },
    plugins
})

export default [
    output('./dist/shamosHoey.js', 'umd', [
        strip({
            functions: ['debugEventAndSegment', 'debugEventAndSegments']
        }),
        resolve()
    ]),
    output('./dist/shamosHoey.min.js', 'umd', [
        strip({
            functions: ['debugEventAndSegment', 'debugEventAndSegments']
        }),
        resolve(),
        terser()
    ]),
    output('./dist/shamosHoey.esm.js', 'esm', [
        strip({
            functions: ['debugEventAndSegment', 'debugEventAndSegments']
        }),
        resolve()
    ])
]
