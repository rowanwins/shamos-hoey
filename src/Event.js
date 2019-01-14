export default class Event {

    constructor (coords) {
        this.x = coords[0]
        this.y = coords[1]

        this.otherEvent = null
        this.isLeftEndpoint = null
        this.segment = null
    }

    isOtherEndOfSegment(eventToCheck) {
        return this === eventToCheck.otherEvent
    }

    isSamePoint(eventToCheck) {
        return this.x === eventToCheck.x && this.y === eventToCheck.y
    }
}

