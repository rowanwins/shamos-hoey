import test from 'ava'
import path from 'path'
import glob from 'glob'

import load from 'load-json-file'

import isSimple from '../src/main.js'

const trueFixtures = glob.sync(path.join(__dirname, 'fixtures', 'simple', '*.geojson'))
const falseFixtures = glob.sync(path.join(__dirname, 'fixtures', 'notSimple', '*.geojson'))

test('simple fixtures', (t) => {
    trueFixtures.forEach((filepath) => {
        const name = path.parse(filepath).name;
        const geojson = load.sync(filepath);
        t.true(isSimple(geojson), `[true] ${name}`);
    });
})

test('complex fixtures', (t) => {
    falseFixtures.forEach((filepath) => {
        const name = path.parse(filepath).name;
        const geojson = load.sync(filepath);
        t.false(isSimple(geojson), `[false] ${name}`);
    });
})

test('input data is not modified', (t) => {
    const geojson = load.sync(path.join(__dirname, 'fixtures', 'notSimple', 'switzerlandKinked.geojson'));
    const clonedData = JSON.parse(JSON.stringify(geojson))
    isSimple(geojson)
    t.deepEqual(geojson, clonedData)
})
