import { Segments, Keys } from './types';

export default class IntensitySegments {

  private segments: Segments;

  constructor() {
    this.segments = new Map();
  }

  /**
   * Add intensity segments to segments
   * @param from 
   * @param to 
   * @param amount 
   */
  add(from: number, to: number, amount: number) {
    this.set(from, to, amount);
  }
  
  /**
   * Set new intensicty segment to segments
   * @param from 
   * @param to 
   * @param amount 
   */
  private set(from: number, to: number, amount: number) {
    this.setFrom(from, amount);
    this.setTo(to, 0);
  }

  private setFrom(from: number, amount: number) {
    this.segments.set(from, amount);
  }

  private setTo(to: number, amount: number) {
    this.segments.set(to, amount);
  }

  /**
   * get the sort keys of the segments, the key is the from number
   * @returns a sorted array of number from small to large
   */
  keys = (): Keys => Array.from(this.segments.keys()).sort();

  toString(): string {
    const mapAsArray = Array.from(this.segments);
    return JSON.stringify(mapAsArray);
  }
}
