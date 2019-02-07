# shamos-hoey
A small and fast module for checking for self intersections of polygons using the Shamos-Hoey algorithm.

## Install
````
npm install shamos-hoey
````

## Documentation
Valid inputs: Geojson features or geometries inc `Polygon`, `LineString`, `MultiPolygon` & `MultiLineString`.

````js
    const isSimple = require('shamos-hoey')

    const box = {type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]}
    isSimple(box)
    // true
````

## Options
Optionally accepts a second argument as an `Object`, with a setting called `booleanOnly`. If `booleanOnly` is set to `false` then you get back an array of xy coords.
````js
    const isSimple = require('shamos-hoey')

    const kinkedbox = {type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [1.5, 0.5], [0, 0]]]}
    const kinks = isSimple(box, {booleanOnly: false})
    // [ { x: 1, y: 0.3333333333333333 } ]
````

## Further Reading
[Geom algorithms](http://geomalgorithms.com/a09-_intersect-3.html#Shamos-Hoey-Algorithm)