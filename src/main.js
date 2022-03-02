import {createMenuTemplate} from './view/menu-view';
import {createFilterTemplate} from './view/filter-view';
import {createSortTemplate} from './view/sort-view';
import {createContentTemplate} from './view/content-view';
import {createAddNewPoint} from './view/add-new-point-view';
import {createEditPoint} from './view/edit-point-view';
import {renderTemplate, RenderPosition} from './render.js';

const headerElement = document.querySelector('.page-header');
const menuElement = headerElement.querySelector('.trip-controls__navigation');

renderTemplate (menuElement, createMenuTemplate(), RenderPosition.BEFOREEND);

const filtersElement = headerElement.querySelector('.trip-controls__filters');

renderTemplate (filtersElement, createFilterTemplate(), RenderPosition.BEFOREEND);

const mainElement = document.querySelector('.page-main');
const mainContentElement = mainElement.querySelector('.page-body__container');

renderTemplate (mainContentElement, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate (mainContentElement, createContentTemplate(), RenderPosition.BEFOREEND);

const eventsElement = document.querySelector('.trip-events__list');

renderTemplate (eventsElement, createEditPoint(), RenderPosition.AFTERBEGIN);
renderTemplate (eventsElement, createAddNewPoint(), RenderPosition.AFTERBEGIN);
