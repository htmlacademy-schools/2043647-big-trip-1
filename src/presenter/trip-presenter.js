import ContentListView from "../view/content-list-view";
import EmptyListView from "../view/empty-list-view";
import SortView from "../view/sort-view";
import { render, RenderPosition } from "../render";
import PointPresenter from "./point-presenter";
import { updateItem } from "../utils/common";
import { SortType } from "../const";
import { sortTaskByDay, sortTaskByPrice, sortTaskByDuration } from "../utils/sort";

export default class TripPresenter {
  #mainElement = null;
  #tripEventsElement = null;

  #sortComponent = new SortView();
  #emptyEventList = new EmptyListView();
  #tripEventsListElement = new ContentListView();

  #point = [];
  #pointPresenter = new Map();

  #currentSortType = SortType.SORT_DAY;
  #sourcedTripPoints = [];

  constructor(mainElement) {
    this.#mainElement = mainElement;
    this.#tripEventsElement = this.#mainElement.querySelector('.trip-events');
  }

  init = (point) => {
    this.#point = [...point];
    this.#sourcedTripPoints = [...point];
    this.#renderMain();
  }

  #renderEmptyList = () => {
    render(this.#tripEventsElement, this.#emptyEventList, RenderPosition.BEFOREEND);
  }

  #renderTripEventsListElement = () => {
    render(this.#tripEventsElement, this.#tripEventsListElement, RenderPosition.BEFOREEND);
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleTaskChange = (updatedPoint) => {
    this.#point = updateItem(this.#point, updatedPoint);
    this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #sortTasks = (sortType) => {
    switch (sortType) {
      case SortType.SORT_DAY:
        this.#point.sort(sortTaskByDay);
        break;
      case SortType.SORT_TIME:
        this.#point.sort(sortTaskByDuration);
        break;
      case SortType.SORT_PRICE:
        this.#point.sort(sortTaskByPrice);
        break;
      default:
        this.#point = [...this.#sourcedTripPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTasks(sortType);
    this.#clearPointList();
    this.#renderTripEventsList();
  }

  #renderSort = () => {
    render(this.#tripEventsElement, this.#sortComponent, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderTripEvent = (waypoint) => {
    const pointPresenter = new PointPresenter(this.#tripEventsListElement, this.#handleTaskChange, this.#handleModeChange);
    pointPresenter.init(waypoint);
    this.#pointPresenter.set(waypoint.id, pointPresenter);
  }

  #renderTripEventsList = () => {
    for (let i = 0; i < this.#point.length; i++) {
      this.#renderTripEvent(this.#point[i]);
    }
  }

  #renderMain = () => {
    if (this.#point.length === 0) {
      this.#renderEmptyList();
    } else {
      this.#renderSort();
      this.#renderTripEventsListElement();
      this.#sortTasks(this.#currentSortType);
      this.#renderTripEventsList();
    }
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }
}
