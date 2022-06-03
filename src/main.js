import MenuView from './view/menu-view';
import {render, RenderPosition} from './render.js';
import {generatePoint} from './mock/point';
import TripPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter';
import PointsModel from './model/point-model';
import FilterModel from './model/filter-model';

const POINT_COUNT = 10;

const tripPoints = Array.from({length: POINT_COUNT}, generatePoint);

const mainElement = document.querySelector('.page-body');
const navigationElement = document.querySelector('.trip-controls__navigation');
const filtersElement = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
pointsModel.points = tripPoints;

const filterModel = new FilterModel();

render(navigationElement, new MenuView(),RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(mainElement, pointsModel, filterModel);

const filterPresenter = new FilterPresenter(filtersElement, filterModel);

filterPresenter.init();
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
