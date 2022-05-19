import dayjs from 'dayjs';

export const sortTaskByDay = (pointA, pointB) => dayjs(pointA.dateStart).diff(dayjs(pointB.dateStart));

export const sortTaskByDuration = (pointA, pointB) => {
  const durationA = dayjs(pointA.dateStart).diff(dayjs(pointA.dateEnd));
  const durationB = dayjs(pointB.dateStart).diff(dayjs(pointB.dateEnd));

  if (durationB - durationA !== 0) {
    return durationB - durationA;
  } else {
    return dayjs(pointA.dateEnd).diff(dayjs(pointB.dateEnd));
  }
};

export const sortTaskByPrice = (pointA, pointB) => {
  if(pointB.prices - pointA.prices !== 0) {
    return pointB.prices - pointA.prices;
  } else {
    return dayjs(pointA.dateStart).diff(dayjs(pointB.dateStart));
  }
};
