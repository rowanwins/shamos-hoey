# shamos-hoey
A small module for checking for self intersections of geomtries using the Shamos-Hoey algorithm.

## Install
````
npm install shamosHoey
````

## Documentation
Valid inputs: Geojson polygon features or geometries

````js
    const shamosHoey = require('shamosHoey')

    const box = {type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]}
    shamosHoey(box)
    // false
````

## To do
Fix up handling of linestrings

## Further Reading
[Geom algorithms](http://geomalgorithms.com/a09-_intersect-3.html#Shamos-Hoey-Algorithm)