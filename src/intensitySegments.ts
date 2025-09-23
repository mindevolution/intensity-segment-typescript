import { Segments, Keys } from './types';

export default class IntensitySegments {

  private segments: Segments;

  constructor() {
    this.segments = new Map();
  }

  /**
   * Add intensity segment to segments
   * @param from 
   * @param to 
   * @param amount 
   */
  add(from: number, to: number, amount: number) {
    const sortedKeys = this.sortedKeys();

    if (this.isEmptySegments()) {
      this.set(from, to, amount);
    } else {
      // existing segments not empty
      // get the left key and right key value
      const { 0: leftKey, [sortedKeys.length - 1]: rightKey } = sortedKeys;

      // if the <from, to> not in the range of existing segments
      // just add it
      if ((leftKey && to < leftKey) || (rightKey && from > rightKey)) {
        this.set(from, to, amount);
        return;
      }

      // then the <from, to> has overlap with existing segments, has the folloing cases
      // - from within range, to out the rage
      // - from out of rage, to within the range
      // - both from and to within the range

      // for to larger than the right key
      if (rightKey && to >= rightKey) {
        this.segments.set(to, 0)
      }

      // for from small than the left key
      if (leftKey && from < leftKey) {
        this.segments.set(from, amount);
      } else if (from == leftKey) {
        // @ts-ignore: segments will not be undefined object
        this.segments.set(from, amount + this.segments.get(from));
      } else {
        // from within the range
        if (!this.segments.has(from)) {
          this.segments.set(from, amount);
          let leftKey = this.leftKey(from)
          console.log({
            from,
            leftKey
          })
          if (leftKey != -1) {
            // @ts-ignore
            this.segments.set(from, this.segments.get(from) + this.segments.get(leftKey))
          }
        } else {
          // from within the range and has existing key, calculate the sum
          // @ts-ignore
          this.segments.set(from, this.segments.get(from) + amount)
        }

        // to within the range
        if (!this.segments.has(to)) {
          let leftKey = this.leftKey(to)
          // @ts-ignore
          this.segments.set(to, this.segments.get(leftKey))
        }
      }

      // update the segments value within the from and to
      sortedKeys.forEach(key => {
        if (key > from && key < to) {
          // @ts-ignore
          this.segments.set(key, this.segments.get(key) + amount)
        }
      })

    }
  }
  
  /**
   * Set new intensity segment to segments
   * @param from 
   * @param to 
   * @param amount 
   */
  private set(from: number, to: number, amount: number) {
    this.segments.set(from, amount);
    this.segments.set(to, 0);
  }

  /**
   * get the keys of the segments
   * @returns a array of numbers
   */
  keys = (): Keys => Array.from(this.segments.keys());

  /**
   * get the sorted keys of the segments
   * @returns a sorted array of numbers from small to large
   */
  sortedKeys = (): Keys => this.keys().sort();

  leftKey(key: number): number {
    let leftKey = -1;

    this.sortedKeys().forEach(k => {
      if (k < key) {
        leftKey = k;
      }
    })

    return leftKey;
  }

  /**
   * get the sorted keys of the segments
   * @returns a sorted array of numbers from small to large
   */
  isEmptySegments = (): boolean => !this.keys().length;

  toString(): string {
    const sortedSegments = new Map([...this.segments.entries()].sort());
    const mapAsArray = Array.from(sortedSegments);
    return JSON.stringify(mapAsArray);
  }
}
