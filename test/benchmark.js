const path = require('path')
const Benchmark = require('benchmark')
const shamosHoey = require('../dist/shamosHoey.js')
const loadJsonFile = require('load-json-file')
const gpsi = require('geojson-polygon-self-intersections')
const Polygon = require('polygon')

const switzerland = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'switzerland.geojson'))
const switzerlandKinked = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'switzerlandKinked.geojson'))

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

// ShamosHoey - No Intersects x 3,404 ops/sec ±2.91% (87 runs sampled)
// GPSI - No Intersects x 37.60 ops/sec ±0.50% (65 runs sampled)
// Polygon - No Intersects x 54.93 ops/sec ±1.15% (64 runs sampled)
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

// ShamosHoey - Has Intersects x 4,426 ops/sec ±0.63% (94 runs sampled)
// GPSI - Has Intersects x 36.38 ops/sec ±0.71% (63 runs sampled)
const suite2 = new Benchmark.Suite('Has intersections', options)
suite2
    .add('ShamosHoey - Has Intersects', function () {
        shamosHoey(switzerlandKinked)
    })
    .add('GPSI - Has Intersects', function () {
        gpsi(switzerlandKinked)
    })
    .run()
