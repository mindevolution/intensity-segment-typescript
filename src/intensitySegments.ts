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

      // then the <from, to> has overlapped with existing segments, has the follwing cases
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
          if (leftKey != -1) {
            // set the from value by accumulate the left nearby value
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

    this.merge();
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

  /**
   * get the sorted segments
   * @returns sorted segments
   */
  sortedSegments = (): Segments => new Map([...this.segments.entries()].sort((a, b) => a[0] - b[0]));

  /**
   * get the left key next to the provide key
   * @param key the key which which want get the left key next to it
   * @returns the left nearby key for the provided one
   */
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

  merge() {
    if (this.isEmptySegments()) {
      return;
    }

    const k = this.sortedKeys();

    

    // loop form beginning to check the same 0 value and remove the redundant
    // @ts-ignore
    for (let i = 0; i < k.length && this.segments.get(k[i]) == 0; i++) {
      // @ts-ignore
      this.segments.delete(k[i])
    }
    
    // loop from end to remove the redundant
    for (let i = k.length - 1; i >= 0; i--) {
      // @ts-ignore
      if (this.segments.get(k[i]) == 0) {
        // @ts-ignore
        if (i - 1 >= 0 && this.segments.get(k[i - 1]) == 0) {
          // @ts-ignore
          this.segments.delete(k[i])
        }
      }
    }

    // loop the elements between first to last
    let start
    // @ts-ignore
    start = this.segments.get(k[0])
    for (let i = 1; i < k.length; i++) {
      // if the start intensity value the same as next element 
      // then delete it 
      // if not the save then move the start element to next one
      // @ts-ignore
      if (this.segments.get(k[i]) == start && start != 0) {
        // @ts-ignore
        this.segments.delete(k[i])
      } else {
        // @ts-ignore
        start = this.segments.get(k[i])
      }
    }
  }



  toString(): string {
    const mapAsArray = Array.from(this.sortedSegments());
    return JSON.stringify(mapAsArray);
  }
}
