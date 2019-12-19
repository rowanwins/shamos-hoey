# shamos-hoey
A small and fast module for checking for if polygons or linestrings have self-intersections using the Shamos-Hoey algorithm.

## Install
````
npm install shamos-hoey
````

## Documentation
Valid inputs: Geojson features or geometries inc `Polygon`, `LineString`, `MultiPolygon` & `MultiLineString`.

Returns `true` if the polygon is simple (doesn't have self-intersections).

Returns `false` if the polygon is complex (has self-intersections).

````js
    const isSimple = require('shamos-hoey')

    const box = {type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]}
    isSimple(box)
    // => true
````

Note: This modules also detects overlapping segments.


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
````

## Further Reading
[Original Paper](https://github.com/rowanwins/shamos-hoey/blob/master/ShamosHoey.pdf)

[Article on Geom algorithms website](http://geomalgorithms.com/a09-_intersect-3.html#Shamos-Hoey-Algorithm)