export function compareSegments(seg1, seg2) {
    if (seg1 === seg2) return 0

    if (seg1.leftSweepEvent.y > seg2.leftSweepEvent.y) return 1;
    if (seg1.leftSweepEvent.y < seg2.leftSweepEvent.y) return -1;

    if (seg1.leftSweepEvent.x !== seg2.leftSweepEvent.x) return seg1.leftSweepEvent.x >  seg2.leftSweepEvent.x ? 1 : -1;
    return 1

}
