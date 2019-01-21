import test from 'ava'
import path from 'path'
import loadJsonFile from 'load-json-file'

import isSimple from '../src/main.js'

const switzerland = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'switzerland.geojson'))
const switzerlandKinked = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'switzerlandKinked.geojson'))

const line = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'line.geojson'))
const lineKinked = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'lineKinked.geojson'))

const multiline = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'multiLine.geojson'))
const multilineKinked = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'multilineKinked.geojson'))

const multiPoly = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'diamondMulti.geojson'))


test('Polygon does not self-intersect', function (t) {
    t.is(isSimple(switzerland), true)
})

test('Polygon does self-intersect', function (t) {
    t.is(isSimple(switzerlandKinked), false)
})

test('Line does not self-intersect', function (t) {
    t.is(isSimple(line), true)
})

test('Line does self-intersect', function (t) {
    t.is(isSimple(lineKinked), false)
})


test('MultiLine does not self-intersect', function (t) {
    t.is(isSimple(multiline), true)
})

test('MultiLine does self-intersect', function (t) {
    t.is(isSimple(multilineKinked), false)
})

test('MultiPoly does not self-intersect', function (t) {
    t.is(isSimple(multiPoly), true)
})
