class TinyQueue {
    constructor(data = [], compare = defaultCompare) {
        this.data = data;
        this.length = this.data.length;
        this.compare = compare;

        if (this.length > 0) {
            for (let i = (this.length >> 1) - 1; i >= 0; i--) this._down(i);
        }
    }

    push(item) {
        this.data.push(item);
        this.length++;
        this._up(this.length - 1);
    }

    pop() {
        if (this.length === 0) return undefined;

        const top = this.data[0];
        this.length--;

        if (this.length > 0) {
            this.data[0] = this.data[this.length];
            this._down(0);
        }
        this.data.pop();

        return top;
    }

    peek() {
        return this.data[0];
    }

    _up(pos) {
        const {data, compare} = this;
        const item = data[pos];

        while (pos > 0) {
            const parent = (pos - 1) >> 1;
            const current = data[parent];
            if (compare(item, current) >= 0) break;
            data[pos] = current;
            pos = parent;
        }

        data[pos] = item;
    }

    _down(pos) {
        const {data, compare} = this;
        const halfLength = this.length >> 1;
        const item = data[pos];

        while (pos < halfLength) {
            let left = (pos << 1) + 1;
            let best = data[left];
            const right = left + 1;

            if (right < this.length && compare(data[right], best) < 0) {
                left = right;
                best = data[right];
            }
            if (compare(best, item) >= 0) break;

            data[pos] = best;
            pos = left;
        }

        data[pos] = item;
    }
}

function defaultCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

function checkWhichEventIsLeft (e1, e2) {
    if (e1.x > e2.x) return 1;
    if (e1.x < e2.x) return -1;

    if (e1.y !== e2.y) return e1.y > e2.y ? 1 : -1;
    return 1
}

class EventQueue {

    constructor () {
        return new TinyQueue([], checkWhichEventIsLeft);
    }

}

/* follows "An implementation of top-down splaying"
 * by D. Sleator <sleator@cs.cmu.edu> March 1992
 */

/**
 * @typedef {*} Key
 */


/**
 * @typedef {*} Value
 */


/**
 * @typedef {function(node:Node):void} Visitor
 */


/**
 * @typedef {function(a:Key, b:Key):number} Comparator
 */


/**
 * @param {function(node:Node):string} NodePrinter
 */


/**
 * @typedef {Object}  Node
 * @property {Key}    Key
 * @property {Value=} data
 * @property {Node}   left
 * @property {Node}   right
 */

class Node {

  constructor (key, data) {
    this.key    = key;
    this.data   = data;
    this.left   = null;
    this.right  = null;
  }
}

function DEFAULT_COMPARE (a, b) { return a > b ? 1 : a < b ? -1 : 0; }


/**
 * Simple top down splay, not requiring i to be in the tree t.
 * @param {Key} i
 * @param {Node?} t
 * @param {Comparator} comparator
 */
function splay (i, t, comparator) {
  if (t === null) return t;
  let l, r, y;
  const N = new Node();
  l = r = N;

  while (true) {
    const cmp = comparator(i, t.key);
    //if (i < t.key) {
    if (cmp < 0) {
      if (t.left === null) break;
      //if (i < t.left.key) {
      if (comparator(i, t.left.key) < 0) {
        y = t.left;                           /* rotate right */
        t.left = y.right;
        y.right = t;
        t = y;
        if (t.left === null) break;
      }
      r.left = t;                               /* link right */
      r = t;
      t = t.left;
    //} else if (i > t.key) {
    } else if (cmp > 0) {
      if (t.right === null) break;
      //if (i > t.right.key) {
      if (comparator(i, t.right.key) > 0) {
        y = t.right;                          /* rotate left */
        t.right = y.left;
        y.left = t;
        t = y;
        if (t.right === null) break;
      }
      l.right = t;                              /* link left */
      l = t;
      t = t.right;
    } else {
      break;
    }
  }
  /* assemble */
  l.right = t.left;
  r.left = t.right;
  t.left = N.right;
  t.right = N.left;
  return t;
}


/**
 * @param  {Key}        i
 * @param  {Value}      data
 * @param  {Comparator} comparator
 * @param  {Tree}       tree
 * @return {Node}      root
 */
function insert (i, data, t, comparator, tree) {
  const node = new Node(i, data);

  tree._size++;

  if (t === null) {
    node.left = node.right = null;
    return node;
  }

  t = splay(i, t, comparator);
  const cmp = comparator(i, t.key);
  if (cmp < 0) {
    node.left = t.left;
    node.right = t;
    t.left = null;
  } else if (cmp >= 0) {
    node.right = t.right;
    node.left = t;
    t.right = null;
  }
  return node;
}


/**
 * Insert i into the tree t, unless it's already there.
 * @param  {Key}        i
 * @param  {Value}      data
 * @param  {Comparator} comparator
 * @param  {Tree}       tree
 * @return {Node}       root
 */
function add (i, data, t, comparator, tree) {
  const node = new Node(i, data);

  if (t === null) {
    node.left = node.right = null;
    tree._size++;
    return node;
  }

  t = splay(i, t, comparator);
  const cmp = comparator(i, t.key);
  if (cmp === 0) return t;
  else {
    if (cmp < 0) {
      node.left = t.left;
      node.right = t;
      t.left = null;
    } else if (cmp > 0) {
      node.right = t.right;
      node.left = t;
      t.right = null;
    }
    tree._size++;
    return node;
  }
}


/**
 * Deletes i from the tree if it's there
 * @param {Key}        i
 * @param {Tree}       tree
 * @param {Comparator} comparator
 * @param {Tree}       tree
 * @return {Node}      new root
 */
function remove (i, t, comparator, tree) {
  let x;
  if (t === null) return null;
  t = splay(i, t, comparator);
  var cmp = comparator(i, t.key);
  if (cmp === 0) {               /* found it */
    if (t.left === null) {
      x = t.right;
    } else {
      x = splay(i, t.left, comparator);
      x.right = t.right;
    }
    tree._size--;
    return x;
  }
  return t;                         /* It wasn't there */
}


function split (key, v, comparator) {
  let left, right;
  if (v === null) {
    left = right = null;
  } else {
    v = splay(key, v, comparator);

    const cmp = comparator(v.key, key);
    if (cmp === 0) {
      left  = v.left;
      right = v.right;
    } else if (cmp < 0) {
      right   = v.right;
      v.right = null;
      left    = v;
    } else {
      left   = v.left;
      v.left = null;
      right  = v;
    }
  }
  return { left, right };
}


function merge (left, right, comparator) {
  if (right === null) return left;
  if (left  === null) return right;

  right = splay(left.key, right, comparator);
  right.left = left;
  return right;
}


/**
 * Prints level of the tree
 * @param  {Node}                        root
 * @param  {String}                      prefix
 * @param  {Boolean}                     isTail
 * @param  {Array<string>}               out
 * @param  {Function(node:Node):String}  printNode
 */
function printRow (root, prefix, isTail, out, printNode) {
  if (root) {
    out(`${ prefix }${ isTail ? '└── ' : '├── ' }${ printNode(root) }\n`);
    const indent = prefix + (isTail ? '    ' : '│   ');
    if (root.left)  printRow(root.left,  indent, false, out, printNode);
    if (root.right) printRow(root.right, indent, true,  out, printNode);
  }
}


class Tree {

  constructor (comparator = DEFAULT_COMPARE) {
    this._comparator = comparator;
    this._root = null;
    this._size = 0;
  }


  /**
   * Inserts a key, allows duplicates
   * @param  {Key}    key
   * @param  {Value=} data
   * @return {Node|null}
   */
  insert (key, data) {
    return this._root = insert(key, data, this._root, this._comparator, this);
  }


  /**
   * Adds a key, if it is not present in the tree
   * @param  {Key}    key
   * @param  {Value=} data
   * @return {Node|null}
   */
  add (key, data) {
    return this._root = add(key, data, this._root, this._comparator, this);
  }


  /**
   * @param  {Key} key
   * @return {Node|null}
   */
  remove (key) {
    this._root = remove(key, this._root, this._comparator, this);
  }


  /**
   * Removes and returns the node with smallest key
   * @return {?Node}
   */
  pop () {
    let node = this._root;
    if (node) {
      while (node.left) node = node.left;
      this._root = splay(node.key,  this._root, this._comparator);
      this._root = remove(node.key, this._root, this._comparator, this);
      return { key: node.key, data: node.data };
    }
    return null;
  }


  /**
   * @param  {Key} key
   * @return {Node|null}
   */
  findStatic (key) {
    let current   = this._root;
    const compare = this._comparator;
    while (current) {
      const cmp = compare(key, current.key);
      if (cmp === 0)    return current;
      else if (cmp < 0) current = current.left;
      else              current = current.right;
    }
    return null;
  }


  /**
   * @param  {Key} key
   * @return {Node|null}
   */
  find (key) {
    if (this._root) {
      this._root = splay(key, this._root, this._comparator);
      if (this._comparator(key, this._root.key) !== 0) return null;
    }
    return this._root;
  }


  /**
   * @param  {Key} key
   * @return {Boolean}
   */
  contains (key) {
    let current   = this._root;
    const compare = this._comparator;
    while (current) {
      const cmp = compare(key, current.key);
      if (cmp === 0)    return true;
      else if (cmp < 0) current = current.left;
      else              current = current.right;
    }
    return false;
  }


  /**
   * @param  {Visitor} visitor
   * @param  {*=}      ctx
   * @return {SplayTree}
   */
  forEach (visitor, ctx) {
    let current = this._root;
    const Q = [];  /* Initialize stack s */
    let done = false;

    while (!done) {
      if (current !==  null) {
        Q.push(current);
        current = current.left;
      } else {
        if (Q.length !== 0) {
          current = Q.pop();
          visitor.call(ctx, current);

          current = current.right;
        } else done = true;
      }
    }
    return this;
  }


  /**
   * Walk key range from `low` to `high`. Stops if `fn` returns a value.
   * @param  {Key}      low
   * @param  {Key}      high
   * @param  {Function} fn
   * @param  {*?}       ctx
   * @return {SplayTree}
   */
  range (low, high, fn, ctx) {
    const Q = [];
    const compare = this._comparator;
    let node = this._root, cmp;

    while (Q.length !== 0 || node) {
      if (node) {
        Q.push(node);
        node = node.left;
      } else {
        node = Q.pop();
        cmp = compare(node.key, high);
        if (cmp > 0) {
          break;
        } else if (compare(node.key, low) >= 0) {
          if (fn.call(ctx, node)) return this; // stop if smth is returned
        }
        node = node.right;
      }
    }
    return this;
  }


  /**
   * Returns array of keys
   * @return {Array<Key>}
   */
  keys () {
    const keys = [];
    this.forEach(({ key }) => keys.push(key));
    return keys;
  }


  /**
   * Returns array of all the data in the nodes
   * @return {Array<Value>}
   */
  values () {
    const values = [];
    this.forEach(({ data }) => values.push(data));
    return values;
  }


  /**
   * @return {Key|null}
   */
  min() {
    if (this._root) return this.minNode(this._root).key;
    return null;
  }


  /**
   * @return {Key|null}
   */
  max() {
    if (this._root) return this.maxNode(this._root).key;
    return null;
  }


  /**
   * @return {Node|null}
   */
  minNode(t = this._root) {
    if (t) while (t.left) t = t.left;
    return t;
  }


  /**
   * @return {Node|null}
   */
  maxNode(t = this._root) {
    if (t) while (t.right) t = t.right;
    return t;
  }


  /**
   * Returns node at given index
   * @param  {number} index
   * @return {?Node}
   */
  at (index) {
    let current = this._root, done = false, i = 0;
    const Q = [];

    while (!done) {
      if (current) {
        Q.push(current);
        current = current.left;
      } else {
        if (Q.length > 0) {
          current = Q.pop();
          if (i === index) return current;
          i++;
          current = current.right;
        } else done = true;
      }
    }
    return null;
  }


  /**
   * @param  {Node}   d
   * @return {Node|null}
   */
  next (d) {
    let root = this._root;
    let successor = null;

    if (d.right) {
      successor = d.right;
      while (successor.left) successor = successor.left;
      return successor;
    }

    const comparator = this._comparator;
    while (root) {
      const cmp = comparator(d.key, root.key);
      if (cmp === 0) break;
      else if (cmp < 0) {
        successor = root;
        root = root.left;
      } else root = root.right;
    }

    return successor;
  }


  /**
   * @param  {Node} d
   * @return {Node|null}
   */
  prev (d) {
    let root = this._root;
    let predecessor = null;

    if (d.left !== null) {
      predecessor = d.left;
      while (predecessor.right) predecessor = predecessor.right;
      return predecessor;
    }

    const comparator = this._comparator;
    while (root) {
      const cmp = comparator(d.key, root.key);
      if (cmp === 0) break;
      else if (cmp < 0) root = root.left;
      else {
        predecessor = root;
        root = root.right;
      }
    }
    return predecessor;
  }


  /**
   * @return {SplayTree}
   */
  clear() {
    this._root = null;
    this._size = 0;
    return this;
  }


  /**
   * @return {NodeList}
   */
  toList() {
    return toList(this._root);
  }


  /**
   * Bulk-load items. Both array have to be same size
   * @param  {Array<Key>}    keys
   * @param  {Array<Value>}  [values]
   * @param  {Boolean}       [presort=false] Pre-sort keys and values, using
   *                                         tree's comparator. Sorting is done
   *                                         in-place
   * @return {AVLTree}
   */
  load (keys = [], values = [], presort = false) {
    let size = keys.length;
    const comparator = this._comparator;

    // sort if needed
    if (presort) sort(keys, values, 0, size - 1, comparator);

    if (this._root === null) { // empty tree
      this._root = loadRecursive(this._root, keys, values, 0, size);
      this._size = size;
    } else { // that re-builds the whole tree from two in-order traversals
      const mergedList = mergeLists(this.toList(), createList(keys, values), comparator);
      size = this._size + size;
      this._root = sortedListToBST({ head: mergedList }, 0, size);
    }
    return this;
  }


  /**
   * @return {Boolean}
   */
  isEmpty() { return this._root === null; }

  get size () { return this._size; }


  /**
   * @param  {NodePrinter=} printNode
   * @return {String}
   */
  toString (printNode = (n) => n.key) {
    const out = [];
    printRow(this._root, '', true, (v) => out.push(v), printNode);
    return out.join('');
  }


  update (key, newKey, newData) {
    const comparator = this._comparator;
    let { left, right } = split(key, this._root, comparator);
    this._size--;
    if (comparator(key, newKey) < 0) {
      right = insert(newKey, newData, right, comparator, this);
    } else {
      left = insert(newKey, newData, left, comparator, this);
    }
    this._root = merge(left, right, comparator);
  }


  split(key) {
    return split(key, this._root, this._comparator);
  }
}


function loadRecursive (parent, keys, values, start, end) {
  const size = end - start;
  if (size > 0) {
    const middle = start + Math.floor(size / 2);
    const key    = keys[middle];
    const data   = values[middle];
    const node   = { key, data, parent };
    node.left    = loadRecursive(node, keys, values, start, middle);
    node.right   = loadRecursive(node, keys, values, middle + 1, end);
    return node;
  }
  return null;
}


function createList(keys, values) {
  const head = { next: null };
  let p = head;
  for (let i = 0; i < keys.length; i++) {
    p = p.next = { key: keys[i], data: values[i] };
  }
  p.next = null;
  return head.next;
}


function toList (root) {
  var current = root;
  var Q = [], done = false;

  const head = { next: null };
  let p = head;

  while (!done) {
    if (current) {
      Q.push(current);
      current = current.left;
    } else {
      if (Q.length > 0) {
        current = p = p.next = Q.pop();
        current = current.right;
      } else done = true;
    }
  }
  p.next = null; // that'll work even if the tree was empty
  return head.next;
}


function sortedListToBST(list, start, end) {
  const size = end - start;
  if (size > 0) {
    const middle = start + Math.floor(size / 2);
    const left = sortedListToBST(list, start, middle);

    const root = list.head;
    root.left = left;

    list.head = list.head.next;

    root.right = sortedListToBST(list, middle + 1, end);
    return root;
  }
  return null;
}


function mergeLists (l1, l2, compare = (a, b) => a - b) {
  const head = {}; // dummy
  let p = head;

  let p1 = l1;
  let p2 = l2;

  while (p1 !== null && p2 !== null) {
    if (compare(p1.key, p2.key) < 0) {
      p.next = p1;
      p1 = p1.next;
    } else {
      p.next = p2;
      p2 = p2.next;
    }
    p = p.next;
  }

  if (p1 !== null)      p.next = p1;
  else if (p2 !== null) p.next = p2;

  return head.next;
}


function sort(keys, values, left, right, compare) {
  if (left >= right) return;

  const pivot = keys[(left + right) >> 1];
  let i = left - 1;
  let j = right + 1;

  while (true) {
    do i++; while (compare(keys[i], pivot) < 0);
    do j--; while (compare(keys[j], pivot) > 0);
    if (i >= j) break;

    let tmp = keys[i];
    keys[i] = keys[j];
    keys[j] = tmp;

    tmp = values[i];
    values[i] = values[j];
    values[j] = tmp;
  }

  sort(keys, values,  left,     j, compare);
  sort(keys, values, j + 1, right, compare);
}

class Segment {

    constructor (event) {
        this.leftSweepEvent = event;
        this.rightSweepEvent = event.otherEvent;
        this.segmentAbove = null;
        this.segmentBelow = null;

        event.segment = this;
        event.otherEvent.segment = this;
    }
}

function signedArea(p0, p1, p2) {
    return (p0.x - p2.x) * (p1.y - p2.y) - (p1.x - p2.x) * (p0.y - p2.y);
}

function compareSegments(seg1, seg2) {
    if (seg1 === seg2) return 0

    if (signedArea(seg1.leftSweepEvent, seg1.rightSweepEvent, seg2.leftSweepEvent) !== 0 ||
        signedArea(seg1.leftSweepEvent, seg1.rightSweepEvent, seg2.rightSweepEvent) !== 0) {

        // If the segments share their left endpoints
        // use the right endpoint to sort
        if (seg1.leftSweepEvent.isSamePoint(seg2.leftSweepEvent)) return seg1.leftSweepEvent.isBelow(seg2.rightSweepEvent) ? -1 : 1;

        // If the segments have different left endpoints
        // use the left endpoint to sort
        if (seg1.leftSweepEvent.x === seg2.leftSweepEvent.x) return seg1.leftSweepEvent.y < seg2.leftSweepEvent.y  ? -1 : 1;

        // If the line segment associated to e1 been inserted
        // into S after the line segment associated to e2 ?
        if (checkWhichEventIsLeft(seg1.leftSweepEvent, seg2.leftSweepEvent) === 1) return seg2.leftSweepEvent.isAbove(seg1.leftSweepEvent) ? -1 : 1;

        // The line segment associated to e2 has been inserted
        // into S after the line segment associated to e1
        return seg1.leftSweepEvent.isBelow(seg2.leftSweepEvent) ? -1 : 1;
    }

    return checkWhichEventIsLeft(seg1.leftSweepEvent, seg2.leftSweepEvent) === 1 ? 1 : -1;

}

class SweepLine {
    constructor () {
        this.tree = new Tree(compareSegments);
    }

    addSegment (event) {
        const seg = new Segment(event);
        const node = this.tree.insert(seg);
        const nextNode = this.tree.next(node);
        const prevNode = this.tree.prev(node);
        if (nextNode !== null) {
            seg.segmentAbove = nextNode.key;
            seg.segmentAbove.segmentBelow = seg;
        }
        if (prevNode !== null) {
            seg.segmentBelow = prevNode.key;
            seg.segmentBelow.segmentAbove = seg;
        }
        return node.key
    }

    findSegment (seg) {
        const node = this.tree.find(seg);
        if (node === null) return null
        return node.key
    }

    removeSegmentFromSweepline (seg) {
        const node = this.tree.find(seg);
        if (node === null) return
        const nextNode = this.tree.next(node);
        const prevNode = this.tree.prev(node);

        if (nextNode !== null) {
            const nextSeg = nextNode.key;
            nextSeg.segmentBelow = seg.segmentBelow;
        }
        if (prevNode !== null) {
            const prevSeg = prevNode.key;
            prevSeg.segmentAbove = seg.segmentAbove;
        }
        this.tree.remove(seg);
    }

    testIntersect (seg1, seg2) {
        if (seg1 === null || seg2 === null) return false

        if (seg1.rightSweepEvent.isSamePoint(seg2.leftSweepEvent) ||
            seg1.rightSweepEvent.isSamePoint(seg2.rightSweepEvent) ||
            seg1.leftSweepEvent.isSamePoint(seg2.leftSweepEvent) ||
            seg1.leftSweepEvent.isSamePoint(seg2.rightSweepEvent)) return false

        const x1 = seg1.leftSweepEvent.x;
        const y1 = seg1.leftSweepEvent.y;
        const x2 = seg1.rightSweepEvent.x;
        const y2 = seg1.rightSweepEvent.y;
        const x3 = seg2.leftSweepEvent.x;
        const y3 = seg2.leftSweepEvent.y;
        const x4 = seg2.rightSweepEvent.x;
        const y4 = seg2.rightSweepEvent.y;

        const denom = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1));
        const numeA = ((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3));
        const numeB = ((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3));

        if (denom === 0) {
            if (numeA === 0 && numeB === 0) return false
            return false
        }

        const uA = numeA / denom;
        const uB = numeB / denom;

        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
            return true
        }
        return false
    }
}

class Event {

    constructor (coords) {
        this.x = coords[0];
        this.y = coords[1];

        this.otherEvent = null;
        this.isLeftEndpoint = null;
        this.segment = null;
    }

    isOtherEndOfSegment(eventToCheck) {
        return this === eventToCheck.otherEvent
    }

    isSamePoint(eventToCheck) {
        return this.x === eventToCheck.x && this.y === eventToCheck.y
    }

    isBelow (p) {
        return this.isLeftEndpoint ?
            signedArea(this, this.otherEvent, p) > 0 :
            signedArea(this.otherEvent, p, this) > 0
    }

    isAbove (p) {
        return !this.isBelow(p);
    }
}

function fillEventQueue (geojson, eventQueue) {
    const geom = geojson.type === 'Feature' ? geojson.geometry : geojson;

    let coords = geom.coordinates;
    // standardise the input
    if (geom.type === 'Polygon' || geom.type === 'MultiLineString') coords = [coords];
    if (geom.type === 'LineString') coords = [[coords]];

    for (let i = 0; i < coords[0].length; i++) {

        for (let ii = 0; ii < coords[0][i].length - 1; ii++) {

            const e1 = new Event(coords[0][i][ii]);
            const e2 = new Event(coords[0][i][ii + 1]);

            e1.otherEvent = e2;
            e2.otherEvent = e1;

            if (checkWhichEventIsLeft(e1, e2) > 0) {
                e2.isLeftEndpoint = true;
                e1.isLeftEndpoint = false;
            } else {
                e1.isLeftEndpoint = true;
                e2.isLeftEndpoint = false;
            }
            eventQueue.push(e1);
            eventQueue.push(e2);
        }

    }
}

function isSimple (geojson) {

    const eventQueue = new EventQueue();

    fillEventQueue(geojson, eventQueue);

    const sweepLine = new SweepLine();

    let currentSegment = null;

    while (eventQueue.length) {
        const event = eventQueue.pop();

        if (event.isLeftEndpoint) {
            currentSegment = sweepLine.addSegment(event);

            if (sweepLine.testIntersect(currentSegment, currentSegment.segmentAbove)) return false

            if (sweepLine.testIntersect(currentSegment, currentSegment.segmentBelow)) return false
        } else {

            if (sweepLine.testIntersect(event.segment.segmentAbove, event.segment.segmentBelow)) return false
            sweepLine.removeSegmentFromSweepline(event.segment);
        }
    }
    return true
}

export default isSimple;
