import {createMenuTemplate} from './view/menu-view';
import {createFilterTemplate} from './view/filter-view';
import {createSortTemplate} from './view/sort-view';
import { createHeaderItemsTemplate } from './view/header-items-view';
import { createAddTripEvent } from './view/add-item-event-view';
import { createContentItemsTemplate } from './view/content-items-view';
import { createEditTripEvent } from './view/edit-item-event-view';
import { createContentTemplate } from './view/content-view';
import {renderTemplate, RenderPosition} from './render.js';
import {generatePoint} from './mock/point';

const POINT_COUNT = 10;

const point = Array.from({length: POINT_COUNT}, generatePoint);

const mainElement = document.querySelector('.trip-main');
const menuElement = document.querySelector('.trip-controls__navigation')
const filtersElement = document.querySelector('.trip-controls__filters');
const sortElement = document.querySelector('.trip-events');

renderTemplate (sortElement, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate (sortElement, createContentTemplate(), RenderPosition.BEFOREEND);
renderTemplate (menuElement, createMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate (filtersElement, createFilterTemplate(), RenderPosition.BEFOREEND);
renderTemplate (mainElement, createHeaderItemsTemplate(point[0]), RenderPosition.AFTERBEGIN);

const eventElement = sortElement.querySelector('.trip-events__list');

renderTemplate (eventElement, createAddTripEvent(point[0]), RenderPosition.BEFOREEND);
renderTemplate (eventElement, createEditTripEvent(point[0]), RenderPosition.BEFOREEND);

for (let i = 1; i < POINT_COUNT; i++) {
    renderTemplate(eventElement, createContentItemsTemplate(point[i]), RenderPosition.BEFOREEND);
}
