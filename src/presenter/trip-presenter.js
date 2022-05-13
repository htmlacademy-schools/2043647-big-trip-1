import ContentListView from "../view/content-list-view";
import EmptyListView from "../view/empty-list-view";
import SortView from "../view/sort-view";
import { render, RenderPosition } from "../render";
import PointPresenter from "./point-presenter";
import { updateItem } from "../utils/common";

export default class TripPresenter {
  #mainElement = null;
  #tripEventsElement = null;

  #sortComponent = new SortView();
  #emptyEventList = new EmptyListView();
  #tripEventsListElement = new ContentListView();

  #point = [];
  #pointPresenter = new Map();

  constructor(mainElement) {
    this.#mainElement = mainElement;
    this.#tripEventsElement = this.#mainElement.querySelector('.trip-events');
  }

  init = (point) => {
    this.#point = [...point];
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
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #renderSort = () => {
    render(this.#tripEventsElement, this.#sortComponent, RenderPosition.AFTERBEGIN);
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
      this.#renderTripEventsList();
    }
  }

  #clearTaskList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }
}
