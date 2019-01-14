import test from 'ava';
import {fillEventQueue} from '../src/main'
import EventQueue from '../src/EventQueue'
const loadJsonFile = require('load-json-file')
const path = require('path')

const diamond = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'diamond.geojson'))


test('Event queue is filled correctly', function (t) {
    const eq = new EventQueue()

    fillEventQueue(diamond, eq)

    const firstEvent = eq.pop();

    t.deepEqual([firstEvent.x, firstEvent.y], [-1, 0])

    t.is(firstEvent.isLeftEndpoint, true)
    t.is(firstEvent.otherEvent.isLeftEndpoint, false)
})
