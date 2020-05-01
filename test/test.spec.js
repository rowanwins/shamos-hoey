import test from 'ava'
import path from 'path'
import glob from 'glob'

import load from 'load-json-file'

import noIntersections from '../src/main.js'

const trueFixtures = glob.sync(path.join(__dirname, 'fixtures', 'simple', '*.geojson'))
const falseFixtures = glob.sync(path.join(__dirname, 'fixtures', 'notSimple', '*.geojson'))

test('simple fixtures', (t) => {
    trueFixtures.forEach((filepath) => {
        const name = path.parse(filepath).name;
        const geojson = load.sync(filepath);
        t.true(noIntersections(geojson), `[true] ${name}`);
    });
})

test('complex fixtures', (t) => {
    falseFixtures.forEach((filepath) => {
        const name = path.parse(filepath).name;
        const geojson = load.sync(filepath);
        t.false(noIntersections(geojson), `[false] ${name}`);
    });
})

test('input data is not modified', (t) => {
    const geojson = load.sync(path.join(__dirname, 'fixtures', 'notSimple', 'switzerlandKinked.geojson'));
    const clonedData = JSON.parse(JSON.stringify(geojson))
    noIntersections(geojson)
    t.deepEqual(geojson, clonedData)
})
