import FilterView from '../view/filter-view.js';
import { render, RenderPosition, replace, remove } from '../render.js';
import { FilterType, UpdateType } from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #taskModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, taskModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#taskModel = taskModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return ['everything', 'future', 'past'];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterContainer, this.#filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
