import { Segments } from './IntensitySegments';
export default class helper {

    /**
     * Display text in browser for dev purpose
     * @param text text to display in browser
     */
    static display(text: string) {
        let h1 = document.createElement("div");
        h1.innerText = text;
        document.body.appendChild(h1);
    }

  /**
   * get the sorted segments
   * @returns sorted segments
   */
    static sortMap(map: Segments) {
        return new Map([...map.entries()].sort());
    }
}