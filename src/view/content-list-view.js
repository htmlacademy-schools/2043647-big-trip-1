import {createElement} from '../render.js';

const createContentTemplate = () => (
  `<ul class="trip-events__list">
</ul>`
);

export default class ContentListView {
  #element = null;

  get element() {
    if (!this.#element){
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template(){
    return createContentTemplate();
  }

  removeElement(){
    this.#element = null;
  }
}
