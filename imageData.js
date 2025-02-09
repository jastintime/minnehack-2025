/*
Image data element
*/

export default class imageElement extends HTMLDivElement {
   constructor() {
      super();
   }

   render() {
      this.innerHTML = `
      <h1>${this.getAttribute(`data-title`)}</h1>
      <img src="${this.getAttribute(`data-src`)}">
      <p>${this.getAttribute(`data-description`)}</p>
      `
   }

   connectedCallback() {
      Tthis.render();
   }

   attributeChangedCallback() {
      this.render();
   }
}

customElements.define(`carousel-image`, imageElement);