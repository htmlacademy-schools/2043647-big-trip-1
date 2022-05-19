import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import { offers } from './offers';
import { destinations } from './destinations';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDates = () => {
  const maxGap = 14;
  const fromDate = dayjs()
    .add(getRandomInteger(-maxGap, maxGap), 'day')
    .add(getRandomInteger(-maxGap, maxGap), 'hour')
    .add(getRandomInteger(-maxGap, maxGap), 'minute');
  const toDate = fromDate
    .clone()
    .add(getRandomInteger(0, maxGap), 'day')
    .add(getRandomInteger(0, 59), 'hour')
    .add(getRandomInteger(0, 59), 'minute');
  return {
    from: fromDate.toISOString(),
    to: toDate.toISOString()
  };
};

const generatePrice = () => getRandomInteger(20, 240);

export const generatePoint = () => {
  const dates = generateDates();
  const locationArray = destinations();
  const pointArray = offers();
  return {
    id: nanoid(),
    dateFrom: dates.from,
    dateTo: dates.to,
    events: pointArray,
    destination: locationArray[getRandomInteger(0, locationArray.length-1)],
    basePrice: generatePrice(),
    type: pointArray[getRandomInteger(0, pointArray.length-1)].type,
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
