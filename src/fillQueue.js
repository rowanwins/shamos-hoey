import Event from './Event'
import {checkWhichEventIsLeft} from './compareEvents'

export function fillEventQueue (geojson, eventQueue) {
    if (geojson.type === 'Feature') geojson = geojson.geometry

    for (let i = 0; i < geojson.coordinates[0].length - 1; i++) {
        const e1 = new Event(geojson.coordinates[0][i])
        const e2 = new Event(geojson.coordinates[0][i + 1])

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
