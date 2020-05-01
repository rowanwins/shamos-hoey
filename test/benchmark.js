const path = require('path')
const Benchmark = require('benchmark')
const shamosHoey = require('../dist/shamosHoey.js')
const ShamosHoeyClass = require('../dist/ShamosHoeyClass.js')
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

// // No intersections
// // ShamosHoey x 3,099 ops/sec ±2.68% (92 runs sampled)
// // SweeplineIntersections x 2,187 ops/sec ±1.21% (91 runs sampled)
// // GPSI x 38.61 ops/sec ±1.09% (52 runs sampled)
// // Polygon x 56.93 ops/sec ±1.67% (59 runs sampled)
// // - Fastest is ShamosHoey
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

// // Has intersections
// // ShamosHoey x 4,132 ops/sec ±0.60% (95 runs sampled)
// // SweeplineIntersections x 2,124 ops/sec ±0.70% (92 runs sampled)
// // GPSI x 36.85 ops/sec ±1.06% (64 runs sampled)
// // - Fastest is ShamosHoey
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


const australia = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'simple', 'australia.geojson'))
const australiaCloned = JSON.parse(JSON.stringify(australia))

const sh = new ShamosHoeyClass()
sh.addData(australia)
const origQueue = sh.cloneEventQueue()

const dodgy = {"type":"Polygon","coordinates":[[[118.84943913151847,-16.811150329458684],[118.52591052174026,-25.59473015350593],[122.8387103407811,-19.032645861278503],[123.34733974263227,-18.80875748072417],[121.14147741540722,-22.68578078458678],[126.37907830576232,-20.116523799569723],[121.65114228714121,-23.93346177367237],[125.02959159727202,-23.195468067853863],[126.12641149130553,-22.81860040326713],[119.03219525103522,-25.485584412380504],[119.39800318455788,-25.55463205025944],[127.54387656677083,-29.487193083300923],[122.35031720351296,-27.649625725364988],[123.47301285370993,-28.795077412469848],[123.37987102485879,-30.003560003010495],[118.66405574641,-25.846652793131366],[118.76097413981067,-30.372226109940577],[118.02694166968074,-31.43736242005873],[116.8472348879804,-29.558467024203367],[111.62082428435907,-31.17697379791034],[112.2433255278665,-27.368512907131826],[112.8363095793594,-24.516827799461048],[115.41597087080129,-24.27528502296396],[117.59225089042211,-24.876965010101276],[116.50061468322228,-23.77268242323488],[117.61188910861284,-24.714720279502867],[117.87368057919106,-24.7592686401243],[113.61402112769021,-18.831257150514855],[115.83686195376836,-20.051656454371997],[118.17623805930867,-24.30567608574926],[118.84943913151847,-16.811150329458684]]]}
australiaCloned.geometry.coordinates.push(dodgy.coordinates)

// Class-based reuse vs recomputing
// ShamosHoey x 1,011 ops/sec ±8.12% (89 runs sampled)
// ShamosHoeyClass x 2,066 ops/sec ±0.60% (93 runs sampled)
// - Fastest is ShamosHoeyClass
const suite3 = new Benchmark.Suite('Larger poly - reuse', options)
suite3
    .add('ShamosHoey', function () {
        shamosHoey(australiaCloned)
    })
    .add('ShamosHoeyClass', function () {
        sh.addData(dodgy, origQueue)
        sh.isSimple()
    })
    .run()

