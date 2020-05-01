import EventQueue from './EventQueue'
import runCheck from './runCheck'

import fillEventQueue from './fillQueue'

export default function noIntersections (geojson) {
    const eventQueue = new EventQueue()
    fillEventQueue(geojson, eventQueue)
    return runCheck(eventQueue)
}
