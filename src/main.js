import MenuView from './view/menu-view';
import FilterView from './view/filter-view';
import {render, RenderPosition} from './render.js';
import {generatePoint} from './mock/point';
import TripPresenter from './presenter/trip-presenter';

const POINT_COUNT = 10;

const point = Array.from({length: POINT_COUNT}, generatePoint);

const mainElement = document.querySelector('.page-body');
const menuElement = document.querySelector('.trip-controls__navigation');
const filtersElement = document.querySelector('.trip-controls__filters');

render(menuElement, new MenuView(),RenderPosition.BEFOREEND);
render(filtersElement, new FilterView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(mainElement);
tripPresenter.init(point);
if (point.length !== 0){
  render(menuElement, new HeaderView(point), RenderPosition.BEFOREBEGIN);
}
