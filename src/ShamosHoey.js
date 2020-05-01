import EventQueue from './EventQueue'
import fillEventQueue from './fillQueue'
import runCheck from './runCheck'

export default class ShamosHoey {

    constructor () {
        this._eventQueue = new EventQueue()
    }

    addData (geojson, alternateEventQueue) {
        if (alternateEventQueue !== undefined) {
            const newQueue = new EventQueue()
            for (let i = 0; i < alternateEventQueue.length; i++) {
                newQueue.push(alternateEventQueue.data[i])
            }
            this._eventQueue = newQueue
        }
        fillEventQueue(geojson, this._eventQueue)
    }

    cloneEventQueue () {
        const newQueue = new EventQueue()
        for (let i = 0; i < this._eventQueue.length; i++) {
            newQueue.push(this._eventQueue.data[i])
        }
        return newQueue
    }

    noIntersections () {
        return runCheck(this._eventQueue)
    }
}
