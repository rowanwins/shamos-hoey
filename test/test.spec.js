import test from 'ava'
import path from 'path'
import glob from 'glob'

import load from 'load-json-file'

import isSimple from '../src/main.js'

test('simple fixtures', (t) => {
    const trueFixtures = glob.sync(path.join(__dirname, 'fixtures', 'simple', '*.geojson'))

    trueFixtures.forEach((filepath) => {
        const name = path.parse(filepath).name;
        const geojson = load.sync(filepath);
        t.true(isSimple(geojson), `[true] ${name}`);
    });

})

test('complex fixtures', (t) => {
    const falseFixtures = glob.sync(path.join(__dirname, 'fixtures', 'notSimple', '*.geojson'))

    falseFixtures.forEach((filepath) => {
        const name = path.parse(filepath).name;
        const geojson = load.sync(filepath);
        t.false(isSimple(geojson), `[false] ${name}`);
    });
})
