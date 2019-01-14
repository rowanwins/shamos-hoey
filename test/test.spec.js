import test from 'ava'
import path from 'path'
import loadJsonFile from 'load-json-file'

import isSimple from '../src/main.js'

const switzerland = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'switzerland.geojson'))
const switzerlandKinked = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'switzerlandKinked.geojson'))

const line = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'line.geojson'))
const lineKinked = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'lineKinked.geojson'))

test('Polygon does not self-intersect', function (t) {
    t.is(isSimple(switzerland), true)
})

test('Polygon does self-intersect', function (t) {
    t.is(isSimple(switzerlandKinked), false)
})

// test('Line does not self-intersect', function (t) {
//     t.is(isSimple(line), true)
// })

// test('Line does self-intersect', function (t) {
//     t.is(isSimple(lineKinked), false)
// })
