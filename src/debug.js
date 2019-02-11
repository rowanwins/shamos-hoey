export function debugEventAndSegments (event, sweepline) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map
    const eLayer = L.circleMarker([event.y, event.x]).addTo(map)

    const segs = sweepline.tree.keys()
    const lines = L.layerGroup([]).addTo(map)

    segs.forEach(function (seg) {
        L.polyline([
            [seg.leftSweepEvent.y, seg.leftSweepEvent.x],
            [seg.rightSweepEvent.y, seg.rightSweepEvent.x]
        ], {color: 'grey'}).addTo(lines)

    })

    const polyline = L.polyline([[event.y, event.x], [event.otherEvent.y, event.otherEvent.x]], {color: 'red'}).addTo(map)

    // debugger

    eLayer.remove()
    polyline.remove()
    lines.remove()
}

export function debugEventAndSegment (event, segment) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map

    const eLayer = L.circleMarker([event.y, event.x]).addTo(map)

    const lines = L.layerGroup([]).addTo(map)

    const b = map.getBounds()
    L.polyline([
        [b.getNorth(), event.x],
        [b.getSouth(), event.x]
    ], {color: 'grey', weight: 1}).addTo(lines);


    L.polyline([
        [segment.leftSweepEvent.y, segment.leftSweepEvent.x],
        [segment.rightSweepEvent.y, segment.rightSweepEvent.x]
    ], {color: 'red'}).addTo(lines)

    if (segment.segmentAbove !== null) {
        L.polyline([
            [segment.segmentAbove.leftSweepEvent.y, segment.segmentAbove.leftSweepEvent.x],
            [segment.segmentAbove.rightSweepEvent.y, segment.segmentAbove.rightSweepEvent.x]
        ], {color: 'green'}).addTo(lines)
    }

    if (segment.segmentBelow !== null) {
        L.polyline([
            [segment.segmentBelow.leftSweepEvent.y, segment.segmentBelow.leftSweepEvent.x],
            [segment.segmentBelow.rightSweepEvent.y, segment.segmentBelow.rightSweepEvent.x]
        ], {color: 'purple'}).addTo(lines)
    }


    // debugger

    eLayer.remove()
    lines.clearLayers()
}
