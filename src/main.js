import EventQueue from './EventQueue'
import Sweepline from './Sweepline'

import {fillEventQueue} from './fillQueue'

import {debugEventAndSegments, debugEventAndSegment} from './debug'

export default function isSimple (geojson) {
    const eventQueue = new EventQueue()

    fillEventQueue(geojson, eventQueue)

    const sweepLine = new Sweepline();

    let currentSegment = null

    while (eventQueue.length) {
        const event = eventQueue.pop();

        debugEventAndSegments(event, sweepLine)

        if (event.isLeftEndpoint) {
            currentSegment = sweepLine.addSegment(event)

            debugEventAndSegment(event, currentSegment)

            if (sweepLine.testIntersect(currentSegment, currentSegment.segmentAbove)) return false
            if (sweepLine.testIntersect(currentSegment, currentSegment.segmentBelow)) return false
        } else {

            debugEventAndSegment(event, event.segment)

            if (sweepLine.testIntersect(event.segment.segmentAbove, event.segment.segmentBelow)) return false
            sweepLine.removeSegmentFromSweepline(event.segment)
        }
    }
    return true;
}
