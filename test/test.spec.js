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

test('simple fixtures no kinks', (t) => {
    trueFixtures.forEach((filepath) => {
        const name = path.parse(filepath).name;
        const geojson = load.sync(filepath);
        const kinks = isSimple(geojson, {booleanOnly: false})
        t.true(kinks.length === 0, `[found no kinks] ${name}`)
    });
})

test('complex fixtures', (t) => {
    falseFixtures.forEach((filepath) => {
        const name = path.parse(filepath).name;
        const geojson = load.sync(filepath);
        t.false(isSimple(geojson), `[false] ${name}`);
    });
})

test('complex fixtures return length', (t) => {
    const falseFixtures = glob.sync(path.join(__dirname, 'fixtures', 'notSimple', '*.geojson'))
    falseFixtures.forEach((filepath) => {
        const name = path.parse(filepath).name;
        const geojson = load.sync(filepath);
        const kinks = isSimple(geojson, {booleanOnly: false})
        t.true(kinks.length > 0, `[found kinks] ${name}`)
    });
})
