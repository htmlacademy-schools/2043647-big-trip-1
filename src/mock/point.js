import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateBeginEndDates = () => {
  const maxGap = 14;
  const startDate = dayjs()
    .add(getRandomInteger(-maxGap, maxGap), 'day')
    .add(getRandomInteger(-maxGap, maxGap), 'hour')
    .add(getRandomInteger(-maxGap, maxGap), 'minute');
  const endDate = startDate
    .clone()
    .add(getRandomInteger(0, 14), 'day')
    .add(getRandomInteger(0, 59), 'hour')
    .add(getRandomInteger(0, 59), 'minute');
  return {
    start: startDate.toDate(),
    end: endDate.toDate()
  };
};

const countDuration = (start, end) => {
  const interval = new Date(end - start);

  return {
    days: interval.getUTCDate() - 1,
    hours: interval.getUTCHours(),
    minutes: interval.getUTCMinutes(),
  };

};

const generateOffers = () => {
  const offer = [
    {
      name: 'Add luggage',
      price: 30,
      type: 'luggage',
      isChosen: Boolean(getRandomInteger(0,1))
    },
    {
      name: 'Switch to comfort',
      price: 100,
      type: 'flight',
      isChosen: Boolean(getRandomInteger(0,1))
    },
    {
      name: 'Add meal',
      price: 15,
      type: 'meal',
      isChosen: Boolean(getRandomInteger(0,1))
    },
    {
      name: 'Travel by train',
      price: 40,
      type: 'transport',
      isChosen: Boolean(getRandomInteger(0,1))
    },
    {
      name: 'Rent a car',
      price: 200,
      type: 'car',
      isChosen: Boolean(getRandomInteger(0,1))
    },
    {
      name: 'Add breakfast',
      price: 50,
      type: 'meal',
      isChosen: Boolean(getRandomInteger(0,1))
    },
    {
      name: 'Order Uber',
      price: 20,
      type: 'transport',
      isChosen: Boolean(getRandomInteger(0,1))
    },
    {
      name: 'Book tickets',
      price: 40,
      type: 'sightseeing',
      isChosen: Boolean(getRandomInteger(0,1))
    },
    {
      name: 'Lunch in city',
      price: 30,
      type: 'meal',
      isChosen: Boolean(getRandomInteger(0,1))
    },
  ];
  const randomIndex = getRandomInteger(0, offer.length - 1);

  return offer[randomIndex];
};

const generateCity = () => {
  const city = [
    'Amsterdam',
    'Chamonix',
    'Geneva'
  ];

  const randomIndex = getRandomInteger(0, city.length-1);

  return city[randomIndex];
};

const type = [
  {title: 'Taxi', img: 'img/icons/taxi.png'},
  {title: 'Bus', img: 'img/icons/bus.png'},
  {title: 'Train', img: 'img/icons/train.png'},
  {title: 'Ship', img: 'img/icons/ship.png'},
  {title: 'Drive', img: 'img/icons/drive.png'},
  {title: 'Flight', img: 'img/icons/flight.png'},
  {title: 'Check-in', img: 'img/icons/check-in.png'},
  {title: 'Sightseeng', img: 'img/icons/sightseeing.png'},
  {title: 'Restaurant', img: 'img/icons/restaurant.png'}
];

const generateDescriptions = () => {
  const description = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.'
  ];

  const randomIndex = getRandomInteger(0, description.length-1);

  return description[randomIndex];
};

const generatePhoto = () => {
  const photo = [];
  for (let i = 0; i <= 5; i++){
    photo[i] = 'http://picsum.photos/248/152?';
    photo[i] += getRandomInteger(0, 99).toString();
  }
  return photo;
};

const generatePrice = () => getRandomInteger(20, 240);

export const generatePoint = () => {
  const dates = generateBeginEndDates();
  return {
    startDate: dates.start,
    endDate: dates.end,
    duration: countDuration(dates.start, dates.end),
    offers: generateOffers(),
    description: generateDescriptions(),
    photo: generatePhoto(),
    price: generatePrice(),
    types: type[getRandomInteger(0, 8)],
    cities: generateCity(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
