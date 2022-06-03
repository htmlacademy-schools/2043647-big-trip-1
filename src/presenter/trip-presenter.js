import ContentListView from "../view/content-list-view";
import { render, RenderPosition, remove } from "../render";
import EmptyListView from '../view/empty-list-view';
import SortView from "../view/sort-view";
import PointPresenter from "./point-presenter";
import PointNewPresenter from "./point-new-presenter";
import { filter } from "../utils/filter";
import { sortTaskByDay, sortTaskByPrice, sortTaskByDuration } from "../utils/sort";
import { UpdateType, FilterType, UserAction, SortType } from "../const";

export default class TripPresenter {
  #mainElement = null;
  #tripPointsElement = null;

  #pointsModel = null;
  #filterModel = null;

  #noTripPointsComponent = null;
  #tripPointsListElement = new ContentListView();
  #sortComponent = null;

  #pointPresenter = new Map();
  #pointNewPresenter = null;

  #currentSortType = SortType.SORT_DAY;
  #filterType = FilterType.EVERYTHING;

  constructor(mainElement, pointsModel, filterModel) {
    this.#mainElement = mainElement;
    this.#tripPointsElement = this.#mainElement.querySelector('.trip-events');

    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#tripPointsListElement, this.#handleViewAction);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoint = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.SORT_DAY:
        return filteredPoint.sort(sortTaskByDay);
      case SortType.SORT_TIME:
        return filteredPoint.sort(sortTaskByDuration);
      case SortType.SORT_PRICE:
        return filteredPoint.sort(sortTaskByPrice);
    }

    return filteredPoint;
  }

  init = () => {
    this.#renderMain();
  }

  createPoint = () => {
    this.#currentSortType = SortType.SORT_DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init();
  }

  #renderNoTasks = () => {
    this.#noTripPointsComponent = new NoTripPointsView(this.#filterType);
    render(this.#tripPointsElement, this.#noTripPointsComponent, RenderPosition.BEFOREEND);
  }

  #renderTripPointsListElement = () => {
    render(this.#tripPointsElement, this.#tripPointsListElement, RenderPosition.BEFOREEND);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#pointsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#pointsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#pointsModel.deleteEvents(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearMain();
        this.#renderMain();
        break;
      case UpdateType.MAJOR:
        this.#clearMain({ resetRenderedTaskCount: true });
        this.#renderMain();
        break;
    }
  }

  #renderTripPoints = (points) => {
    points.forEach((point) => this.#renderTripPoint(point));
  };

  #renderTripPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripPointsListElement, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderTripPoints(this.points);
    this.#clearMain({ resetRenderedTaskCount: true });
    this.#renderMain();
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#tripPointsElement, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #clearMain = ({ resetSortType = false } = {}) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.SORT_DAY;
    }

    if (this.#noTripPointsComponent) {
      remove(this.#noTripPointsComponent);
    }
  }

  #renderMain = () => {
    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoTasks();
      return;
    }

    this.#renderSort();
    this.#renderTripPointsListElement();
    this.#renderTripPoints(points);
  }

  #clearPointList = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }
}
