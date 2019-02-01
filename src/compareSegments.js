export function compareSegments(seg1, seg2) {
    if (seg1 === seg2) return 0

    if (seg1.leftSweepEvent.y > seg2.leftSweepEvent.y) return 1;
    if (seg1.leftSweepEvent.y < seg2.leftSweepEvent.y) return -1;

    if (seg1.leftSweepEvent.y === seg2.leftSweepEvent.y) {
        return (seg1.leftSweepEvent.x - seg2.rightSweepEvent.x) * (seg1.rightSweepEvent.y - seg2.rightSweepEvent.y) - (seg1.rightSweepEvent.x - seg2.rightSweepEvent.x) * (seg1.leftSweepEvent.y - seg2.rightSweepEvent.y) > 0 ? -1 : 1
    }

    return 1
}
