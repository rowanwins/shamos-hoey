import Event from './Event'
import {checkWhichEventIsLeft} from './compareEvents'

export function fillEventQueue (geojson, eventQueue) {
    const geom = geojson.type === 'Feature' ? geojson.geometry : geojson

    let coords = geom.coordinates
    // standardise the input
    if (geom.type === 'Polygon' || geom.type === 'MultiLineString') coords = [coords]
    if (geom.type === 'LineString') coords = [[coords]]

    for (let i = 0; i < coords[0].length; i++) {

        for (let ii = 0; ii < coords[0][i].length - 1; ii++) {

            const e1 = new Event(coords[0][i][ii])
            const e2 = new Event(coords[0][i][ii + 1])

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

        if (geom.type === 'Polygon') {
            const e1 = new Event(coords[0][i][coords[0][i].length - 1])
            const e2 = new Event(coords[0][i][1])

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
