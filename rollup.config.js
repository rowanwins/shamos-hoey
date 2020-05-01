import resolve from 'rollup-plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'
import strip from 'rollup-plugin-strip'

const output = (input, file, format, plugins) => ({
    input,
    output: {
        name: 'shamosHoey',
        file,
        format,
        exports: 'default'
    },
    plugins
})

export default [
    output('./src/main.js', './dist/shamosHoey.js', 'umd', [
        strip({
            functions: ['debugEventAndSegment', 'debugEventAndSegments']
        }),
        resolve()
    ]),
    output('./src/main.js', './dist/shamosHoey.min.js', 'umd', [
        strip({
            functions: ['debugEventAndSegment', 'debugEventAndSegments']
        }),
        resolve(),
        terser()
    ]),
    output('./src/main.js', './dist/shamosHoey.esm.js', 'esm', [
        strip({
            functions: ['debugEventAndSegment', 'debugEventAndSegments']
        }),
        resolve()
    ]),
    output('./src/ShamosHoey.js', './dist/ShamosHoeyClass.js', 'umd', [
        strip({
            functions: ['debugEventAndSegment', 'debugEventAndSegments']
        }),
        resolve(),
        terser()
    ]),
    output('./src/ShamosHoey.js', './dist/ShamosHoeyClass.esm.js', 'esm', [
        strip({
            functions: ['debugEventAndSegment', 'debugEventAndSegments']
        }),
        resolve(),
        terser()
    ])
]
