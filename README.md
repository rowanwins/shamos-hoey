# shamos-hoey
A fast module for checking for segment intersections using the Shamos-Hoey algorithm. 
Can be used for 
- detecting if a geometry has self-intersections, or
- if multiple geometries have segments which intersect

## Install
````
npm install shamos-hoey
````

## Documentation

### Basic Use
Valid inputs: Geojson `Feature` or `Geometry` including `Polygon`, `LineString`, `MultiPolygon`, `MultiLineString`, as well as `FeatureCollection`'s.

Returns `true` if there are no intersections
Returns `false` if there are intersections

````js
    const noIntersections = require('shamos-hoey')

    const box = {type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]}
    noIntersections(box)
    // => true
````

### Complex Use
This library also provide a class-based approach which is helpful if you need to check multiple geometries against a single geometry. This allows you to save the state of the initial event queue with the primary geometry.

````js
    import ShamosHoeyClass from 'shamos-hoey/dist/ShamosHoeyClass'

    // create the base instance
    const sh = new ShamosHoeyClass()
    // populate the event queue with your primary geometry
    sh.addData(largeGeoJson)
    // clone the event queue in the original state so you can reuse it
    const origQueue = sh.cloneEventQueue()

    // now you can iterate through some other set of features saving
    // the overhead of having to populate the complete queue multiple times
    someOtherFeatureCollection.features.forEach(feature => {
        // add another feature to test against your original data
        sh.addData(feature, origQueue)
        // check if those two features intersect
        sh.noIntersections()
    })

````

#### API
`new ShamosHoeyClass()` - creates a new instance

`.addData(geojson, existingQueue)` - add geojson to the event queue. The second argument for an `existingQueue` is optional, and takes a queue generated from `.cloneEventQueue()`

`.cloneEventQueue()` - clones the state of the existing event queue that's been populated with geojson. Returns a queue that you can pass to the `addData` method

`.noIntersections()` - Checks for segment intersections. Returns `true` if there are no segment intersections or `false` if there are intersections.



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