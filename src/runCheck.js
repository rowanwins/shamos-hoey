import Sweepline from './Sweepline'
// import {debugEventAndSegments, debugEventAndSegment} from './debug'

export default function runCheck (eventQueue) {
    const sweepLine = new Sweepline();
    let currentSegment = null
    while (eventQueue.length) {
        const event = eventQueue.pop();
        // debugEventAndSegments(event, sweepLine)

        if (event.isLeftEndpoint) {
            currentSegment = sweepLine.addSegment(event)
            // debugEventAndSegment(event, currentSegment)
            if (sweepLine.testIntersect(currentSegment, currentSegment.segmentAbove)) return false
            if (sweepLine.testIntersect(currentSegment, currentSegment.segmentBelow)) return false
        } else {
            if (!event.segment) continue
            // debugEventAndSegment(event, currentSegment)
            if (sweepLine.testIntersect(event.segment.segmentAbove, event.segment.segmentBelow)) return false
            sweepLine.removeSegmentFromSweepline(event.segment)
        }
    }
    return true
}
