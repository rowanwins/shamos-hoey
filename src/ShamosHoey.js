import EventQueue from './EventQueue'
import Sweepline from './Sweepline'

import {fillEventQueue} from './fillQueue'

export default class ShamosHoey {

    constructor () {
        this._eventQueue = new EventQueue()
    }

    addData (geojson, alternateEventQueue) {
        if (alternateEventQueue !== undefined) {
            const newQueue = new EventQueue()
            for (let i = 0; i < alternateEventQueue.length; i++) {
                newQueue.push(alternateEventQueue.data[i]);
            }
            this._eventQueue = newQueue
        }
        fillEventQueue(geojson, this._eventQueue)
    }

    cloneEventQueue () {
        const newQueue = new EventQueue()
        for (let i = 0; i < this._eventQueue.length; i++) {
            newQueue.push(this._eventQueue.data[i]);
        }
        return newQueue
    }

    isSimple () {
        const sweepLine = new Sweepline();
        let currentSegment = null
        while (this._eventQueue.length) {
            const event = this._eventQueue.pop();
            if (event.isLeftEndpoint) {
                currentSegment = sweepLine.addSegment(event)
                if (sweepLine.testIntersect(currentSegment, currentSegment.segmentAbove)) return false
                if (sweepLine.testIntersect(currentSegment, currentSegment.segmentBelow)) return false
            } else {
                if (!event.segment) continue
                if (sweepLine.testIntersect(event.segment.segmentAbove, event.segment.segmentBelow)) return false
                sweepLine.removeSegmentFromSweepline(event.segment)
            }
        }
        return true
    }
}
