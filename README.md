# shamos-hoey
A small and fast module for checking for self intersections of polygons using the Shamos-Hoey algorithm.

## Install
````
npm install shamos-hoey
````

## Documentation
Valid inputs: Geojson polygon features or geometries

````js
    const isSimple = require('shamos-hoey')

    const box = {type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]}
    isSimple(box)
    // true
````

## To do
Fix up handling of linestrings

## Further Reading
[Geom algorithms](http://geomalgorithms.com/a09-_intersect-3.html#Shamos-Hoey-Algorithm)