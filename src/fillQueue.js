import Event from './Event'
import {checkWhichEventIsLeft} from './compareEvents'

export function fillEventQueue (geojson, eventQueue) {
    const geom = geojson.type === 'Feature' ? geojson.geometry : geojson

    let coords = geom.coordinates
    // standardise the input
    if (geom.type === 'Polygon' || geom.type === 'MultiLineString') coords = [coords]
    if (geom.type === 'LineString') coords = [[coords]]

    for (let i = 0; i < coords.length; i++) {
        for (let ii = 0; ii < coords[i].length; ii++) {
            for (let iii = 0; iii < coords[i][ii].length - 1; iii++) {
                const e1 = new Event(coords[i][ii][iii])
                const e2 = new Event(coords[i][ii][iii + 1])

                e1.otherEvent = e2;
                e2.otherEvent = e1;

                if (checkWhichEventIsLeft(e1, e2) > 0) {
                    e2.isLeftEndpoint = true;
                    e1.isLeftEndpoint = false
                } else {
                    e1.isLeftEndpoint = true;
                    e2.isLeftEndpoint = false
                }
                eventQueue.push(e1)
                eventQueue.push(e2)
            }
        }
    }
}
