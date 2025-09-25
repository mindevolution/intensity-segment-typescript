import Helper from './helper';

export type Segments = Map<number, number>;
export type Keys = number[];

export default class IntensitySegments {

  segments: Segments;

  constructor() {
    this.segments = new Map();
  }

  /**
   * Adds an intensity segment to the segments map.
   * @param from The start of the segment (inclusive).
   * @param to The end of the segment (exclusive).
   * @param amount The intensity value to add to the segment.
   */
  add(from: number, to: number, amount: number) {
    if (from > to) {
      throw new Error("Invalid range: 'from' must be less than to 'to'");
    }

    const sortedKeys = this.sortedKeys(this.segments);

    if (this.isEmptySegments()) {
      this.set(from, to, amount);
      return;
    } 

    // existing segments not empty
    // get the left key and right key value
    const leftKey = sortedKeys[0];
    const rightKey = sortedKeys[sortedKeys.length - 1];

    // if the <from, to> not in the range of existing segments
    // just add it
    // @ts-ignore
    if (to < leftKey || from > rightKey) {
      this.set(from, to, amount);
      return;
    }

    const fromIntensity = this.getIntensityValue(from, amount);
    this.segments.set(from, fromIntensity);

    const toIntensity = this.getIntensityValue(to, 0);
    this.segments.set(to, toIntensity);

    // update the segments value within the from and to
    sortedKeys.forEach(key => {
      if (key > from && key < to) {
        // @ts-ignore
        this.segments.set(key, this.segments.get(key) + amount)
      }
    })
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

  getIntensityValue(key: number, amount: number): number {
    let updatedAmount = amount;
    const leftKey = this.leftKey(key)
    if (this.segments.has(key)) {
      // @ts-ignore
      updatedAmount = this.segments.get(key) + amount;
    } else if (leftKey > -1) {
      // @ts-ignore
      updatedAmount = this.segments.get(leftKey) + amount;
    }
    return updatedAmount;
  }

  /**
   * get the keys of the segments
   * @returns a array of numbers
   */
  keys(segments: Segments): Keys {
    return Array.from(segments.keys());
  }

  /**
   * get the sorted keys of the segments
   * @returns a sorted array of numbers from small to large
   */
  sortedKeys = (segments: Segments): Keys => this.keys(segments).sort((a, b) => a - b);

  /**
   * get the left key next to the provided key
   * @param key the key which which want get the left key next to it
   * @returns the left nearby key for the provided one
   */
  leftKey(key: number): number {
    let leftKey = -1
    this.sortedKeys(this.segments).forEach(k => {
      if (k < key) {
        leftKey = k;
      }
    })
    return leftKey;
  }

  /**
   * Checks if the segments map is empty.
   * @returns True if the segments map is empty, false otherwise.
   */
  isEmptySegments(): boolean {
    return this.keys(this.segments).length === 0;
  }

  merge(segments: Segments): Segments {
    if (this.isEmptySegments()) {
      return segments;
    }

    const mergedSegments = this.sortSegments(new Map(segments));
    let k = this.sortedKeys(mergedSegments);

    let i;
    // loop from beginning to check the same 0 value and remove the redundant
    // @ts-ignore
    for (i = 0; i < k.length && mergedSegments.get(k[i]) == 0; i++) {
      // @ts-ignore
      mergedSegments.delete(k[i])
    }

    k = this.sortedKeys(mergedSegments);
    // loop from end to remove the redundant
    for (let i = k.length - 1; i >= 0; i--) {
      // @ts-ignore
      if (mergedSegments.get(k[i]) == 0) {
        // @ts-ignore
        if (i - 1 >= 0 && mergedSegments.get(k[i - 1]) == 0) {
          // @ts-ignore
          mergedSegments.delete(k[i])
        }
      }
    }

    // merge segments in middle
    let start
    // @ts-ignore
    start = mergedSegments.get(k[0])
    for (let i = 1; i < k.length; i++) {
      // if the start intensity value the same as next element 
      // then delete it 
      // @ts-ignore
      if (mergedSegments.get(k[i]) == start && start != 0) {
        // @ts-ignore
        mergedSegments.delete(k[i])
      } else {
        // @ts-ignore
        start = mergedSegments.get(k[i])
      }
    }
    return mergedSegments;
  }

  sortSegments(segments: Segments): Segments {
    return new Map([...segments.entries()].sort((a, b) => a[0] - b[0]))
  }

  toString(): string {
    const mergedSegments = this.merge(this.segments);
    const sortedSegments = this.sortSegments(mergedSegments);
    const mapAsArray = Array.from(sortedSegments);
    return JSON.stringify(mapAsArray);
  }
}
