import PointAddView from '../view/add-item-event-view';
import { nanoid } from 'nanoid';
import { UserAction, UpdateType } from '../const.js';
import { RenderPosition, render, remove } from '../render';

export default class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;
  #pointAddComponent = null;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = () => {

    if (this.#pointAddComponent !== null) {
      return;
    }

    this.#pointAddComponent = new PointAddView();
    this.#pointAddComponent.setFormSubmitHadler(this.#handleFormSubmit);
    this.#pointAddComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointListContainer, this.#pointAddComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = () => {
    if (this.#pointAddComponent === null) {
      return;
    }

    remove(this.#pointAddComponent);
    this.#pointAddComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      { id: nanoid(), ...point },
    );
    this.destroy();
  }
}
