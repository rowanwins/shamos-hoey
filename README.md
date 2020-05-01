# shamos-hoey
A small and fast module for checking for if polygons or linestrings have self-intersections using the Shamos-Hoey algorithm.

## Install
````
npm install shamos-hoey
````

## Documentation

### Basic Use
Valid inputs: Geojson features or geometries inc `Polygon`, `LineString`, `MultiPolygon` & `MultiLineString`.

Returns `true` if the polygon is simple (doesn't have self-intersections).
Returns `false` if the polygon is complex (has self-intersections).

````js
    const isSimple = require('shamos-hoey')

    const box = {type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]}
    isSimple(box)
    // => true
````

### Complex Use
This library also provide a class-based approach which is helpful if you need to run multiple checks against a single geometry. For example if you had a single geometry which you wanted to check against a number of other geometries you could use this approach to save the state of the initial event queue.

````js
    import ShamosHoeyClass from 'shamos-hoey/dist/ShamosHoeyClass'

    // create the base instance
    const sh = new ShamosHoeyClass()
    // populate the event queue with your static data
    sh.addData(largeGeoJson)
    // clone the event queue in the original state so you can reuse it
    const origQueue = sh.cloneEventQueue()

    // now you can iterate through some other set of features and 
    // not have to populate the complete queue multiple times
    someOtherFeatureCollection.features.forEach(feature => {
        // add another feature to test against your original data
        sh.addData(feature, origQueue)
        // check if those two features intersect
        sh.isSimple()
        // => true
    })

````

#### API
`new ShamosHoeyClass()` - creates a new instance

`.addData(geojson, existingQueue)` - add geojson to the event queue. The second argument for an `existingQueue` is optional, and takes a queue generated from `.cloneEventQueue()`

`.cloneEventQueue()` - clones the state of the existing event queue that's been populated with geojson. Returns a queue that you can pass to the `addData` method

`.isSimple()` - Checks if there are any segment intersections against the event queue. Returns `true` or `false`



## Similar modules
If you need to find the points of self-intersection I suggest using the [sweepline-intersections module](https://github.com/rowanwins/sweepline-intersections). The sweeline-intersections module is also smaller (4kb vs 12kb) and very fast for most use cases. It uses alot of the same logic although doesn't inlude a tree structure which makes us the major dependency for this library.


## Benchmarks
Detecting an intersection in a polygon with roughly 700 vertices. Note that the other libraries report the intersection point/s.
````
// Has intersections
// ShamosHoey x 4,132 ops/sec ±0.60% (95 runs sampled)
// SweeplineIntersections x 2,124 ops/sec ±0.70% (92 runs sampled)
// GPSI x 36.85 ops/sec ±1.06% (64 runs sampled)
// - Fastest is ShamosHoey


// Class-based reuse vs Basic
// ShamosHoey x 1,011 ops/sec ±8.12% (89 runs sampled)
// ShamosHoeyClass x 2,066 ops/sec ±0.60% (93 runs sampled)
// - Fastest is ShamosHoeyClass
````

## Further Reading
[Original Paper](https://github.com/rowanwins/shamos-hoey/blob/master/ShamosHoey.pdf)

[Article on Geom algorithms website](http://geomalgorithms.com/a09-_intersect-3.html#Shamos-Hoey-Algorithm)