import AbstractView from './abstract-view.js';

const createContentTemplate = () => (
  `<ul class="trip-events__list">
</ul>`
);

export default class ContentListView extends AbstractView{
  get template() {
    return createContentTemplate();
  }
}
