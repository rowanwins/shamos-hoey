const path = require('path')
const Benchmark = require('benchmark')
const shamosHoey = require('../dist/shamosHoey.js')
const loadJsonFile = require('load-json-file')
const gpsi = require('geojson-polygon-self-intersections')
const Polygon = require('polygon')

const switzerland = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'simple', 'switzerland.geojson'))
const switzerlandKinked = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'notSimple', 'switzerlandKinked.geojson'))

const p = new Polygon(switzerland.geometry.coordinates[0].map(function (c) {
    return {x: c[0], y: c[1]}
}))


const options = {
    onStart () { console.log(this.name) },
    onError (event) { console.log(event.target.error) },
    onCycle (event) { console.log(String(event.target)) },
    onComplete () {
        console.log(`- Fastest is ${this.filter('fastest').map('name')}`)
    }
}

// ShamosHoey - No Intersects x 3,998,000 ops/sec ±42.74% (45 runs sampled)
// GPSI - No Intersects x 949,232 ops/sec ±31.16% (68 runs sampled)
// Polygon - No Intersects x 28.90 ops/sec ±43.69% (50 runs sampled)
const suite = new Benchmark.Suite('No intersections', options)
suite
    .add('ShamosHoey - No Intersects', function () {
        shamosHoey(switzerland)
    })
    .add('GPSI - No Intersects', function () {
        gpsi(switzerland)
    })
    .add('Polygon - No Intersects', function () {
        p.selfIntersections()
    })
    .run()

// ShamosHoey - Has Intersects x 321,547 ops/sec ±132.69% (6 runs sampled)
// GPSI - Has Intersects x 8,380 ops/sec ±90.29% (5 runs sampled)
const suite2 = new Benchmark.Suite('Has intersections', options)
suite2
    .add('ShamosHoey - Has Intersects', function () {
        shamosHoey(switzerlandKinked)
    })
    .add('GPSI - Has Intersects', function () {
        gpsi(switzerlandKinked)
    })
    .run()
