import test from 'ava';
import EventQueue from '../src/EventQueue'
import Event from '../src/Event'

test('EventQueue is correctly sorted', function (t) {
    const eventQueue = new EventQueue()

    const e1 = new Event([0, 0])
    const e2 = new Event([1, 0])
    const e3 = new Event([-1, 0])

    eventQueue.push(e1)
    eventQueue.push(e3)
    eventQueue.push(e2)

    const firstEvent = eventQueue.pop();
    t.deepEqual([firstEvent.x, firstEvent.y], [-1, 0])

    const secondEvent = eventQueue.pop();
    t.deepEqual([secondEvent.x, secondEvent.y], [0, 0])

    const thirdEvent = eventQueue.pop();
    t.deepEqual([thirdEvent.x, thirdEvent.y], [1, 0])
})
