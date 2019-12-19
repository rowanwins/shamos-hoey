const path = require('path')
const Benchmark = require('benchmark')
const shamosHoey = require('../dist/shamosHoey.js')
const loadJsonFile = require('load-json-file')
const gpsi = require('geojson-polygon-self-intersections')
const findIntersections = require('sweepline-intersections')
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

// No intersections
// ShamosHoey x 3,099 ops/sec ±2.68% (92 runs sampled)
// SweeplineIntersections x 2,187 ops/sec ±1.21% (91 runs sampled)
// GPSI x 38.61 ops/sec ±1.09% (52 runs sampled)
// Polygon x 56.93 ops/sec ±1.67% (59 runs sampled)
// - Fastest is ShamosHoey
const suite = new Benchmark.Suite('No intersections', options)
suite
    .add('ShamosHoey', function () {
        shamosHoey(switzerland)
    })
    .add('SweeplineIntersections', function () {
        findIntersections(switzerland)
    })
    .add('GPSI', function () {
        gpsi(switzerland)
    })
    .add('Polygon', function () {
        p.selfIntersections()
    })
    .run()

// Has intersections
// ShamosHoey x 4,132 ops/sec ±0.60% (95 runs sampled)
// SweeplineIntersections x 2,124 ops/sec ±0.70% (92 runs sampled)
// GPSI x 36.85 ops/sec ±1.06% (64 runs sampled)
// - Fastest is ShamosHoey
const suite2 = new Benchmark.Suite('Has intersections', options)
suite2
    .add('ShamosHoey', function () {
        shamosHoey(switzerlandKinked)
    })
    .add('SweeplineIntersections', function () {
        findIntersections(switzerlandKinked)
    })
    .add('GPSI', function () {
        gpsi(switzerlandKinked)
    })
    .run()
