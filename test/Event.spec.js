import test from 'ava';
import Event from '../src/Event'

test('Event has correct properties', function (t) {
    const e1 = new Event([0, 1])

    t.is(e1.x, 0)
    t.is(e1.y, 1)
    t.is(e1.otherEvent, null)
})


test('Event can check against other segment point', function (t) {
    const e1 = new Event([0, 0])
    const e2 = new Event([1, 0])
    e1.otherEvent = e2
    e2.otherEvent = e1
    t.is(e1.isOtherEndOfSegment(e2), true)

    const e2a = new Event([1, 0])
    const e3 = new Event([2, 0])
    e2a.otherEvent = e3
    e3.otherEvent = e2a

    t.is(e2.isOtherEndOfSegment(e3), false)
    t.is(e3.isOtherEndOfSegment(e2a), true)
})

test('Event can check against other event for duplicate points', function (t) {
    const e1 = new Event([0, 0])
    const e2 = new Event([0, 0])

    t.is(e1.isSamePoint(e2), true)
})
