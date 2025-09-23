import { Collections } from './types';

export default class IntensitySegments {

  private collection: Collections;

  constructor() {
    this.collection = new Map();
  }

  /**
   * Add intensity segments to collection
   * @param from 
   * @param to 
   * @param amount 
   */
  add(from: number, to: number, amount: number): Collections {

    return this.collection;
  }
  
  /**
   * Set new intensicty segment to collection
   * @param from 
   * @param to 
   * @param amount 
   */
  set(from: number, to: number, amount: number): Collections {

    return this.collection;
  }

  toString(): string {
    const mapAsArray = Array.from(this.collection);
    return JSON.stringify(mapAsArray);
  }
}
