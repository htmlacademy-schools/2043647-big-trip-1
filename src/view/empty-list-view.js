import AbstractView from './abstract-view';
import { FilterType } from '../const';

const emptyTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now'
};


const createEmptyListTemplate = (filterType) => {
  const emptyTextValue = emptyTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${emptyTextValue}
    </p>`);
};

export default class EmptyListView extends AbstractView{
  constructor(data) {
    super();
    this._data = data;
  }

  get template(){
    return createEmptyListTemplate(this._data);
  }
}
