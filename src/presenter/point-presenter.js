import EditPointView from "../view/edit-item-event-view";
import PointView from "../view/content-items-view";
import { render, RenderPosition, replace, remove } from "../render";
import { UpdateType, UserAction } from "../const";
import {isDatesEqual} from '../utils/common';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #tripPointsListElement = null;
  #changeData = null;
  #changeMode = null;

  #pointItemComponent = null;
  #pointEditComponent = null;

  #tripPoint = null;
  #mode = Mode.DEFAULT;

  constructor(tripPointsListElement, changeData, changeMode) {
    this.#tripPointsListElement = tripPointsListElement;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (tripPoint) => {
    this.#tripPoint = tripPoint;
    const prevPointItemComponent = this.#pointItemComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointItemComponent =  new PointView(tripPoint);
    this.#pointEditComponent = new EditPointView(tripPoint);

    this.#pointItemComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointItemComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointEditComponent.setRollupClickHandler(this.#handleRollupClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevPointItemComponent === null || prevPointEditComponent === null) {
      render(this.#tripPointsListElement, this.#pointItemComponent, RenderPosition.BEFOREEND);

      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointItemComponent, prevPointItemComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointItemComponent);
    remove(prevPointEditComponent);
  }

  destroy = () => {
    remove(this.#pointItemComponent);
    remove(this.#pointEditComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#tripPoint);
      this.#replaceFormToItem();
    }
  }

  #replaceItemToForm = () => {
    replace(this.#pointEditComponent, this.#pointItemComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToItem = () => {
    replace(this.#pointItemComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#tripPoint);
      this.#replaceFormToItem();
    }
  }

  #handleEditClick = () => {
    this.#replaceItemToForm();
  }

  #handleRollupClick = () => {
    this.#pointEditComponent.reset(this.#tripPoint);
    this.#replaceFormToItem();
  }

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      { ...this.#tripPoint, isFavorite: !this.#tripPoint.isFavorite },
    );
  }

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      !isDatesEqual(this.#tripPoint.dateFrom, update.dateFrom) ||
      !isDatesEqual(this.#tripPoint.dateTo, update.dateTo)||
      (this.#tripPoint.basePrice !== update.basePrice);

    this.#changeData(
      UserAction.UPDATE_EVENT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this.#replaceFormToItem();
  };

  #handleDeleteClick = (event) => {
    this.#changeData(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event,
    );
  }
}
