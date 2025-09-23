export default class helper {
  static display(text: string|number) {
    let h1 = document.createElement("h1");
    h1.innerText = `>>> ${text}`;
    document.body.appendChild(h1);
  }

}