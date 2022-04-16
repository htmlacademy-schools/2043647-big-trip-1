import dayjs from "dayjs";

export const createAddTripEvent = (tripAddEvent) => {
  const {cities, types, description, photo, startDate, endDate, offers} = tripAddEvent;

  const templateDateBegin = dayjs(startDate).format('DD/MM/YY HH:mm');
  const templateDateEnd = dayjs(endDate).format('DD/MM/YY HH:mm');

  const photosList = photo.map((x) => (`<img className="event__photo" src="${x}">`)).join('');

  const titleType = types.title;
  const imgType = types.img;

  const nameOffer = offers.name;
  const costOffer = offers.price;
  const typeOffer = offers.type;

    return `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-${titleType}-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="${imgType}" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-${titleType}-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
              ${titleType}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${titleType}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${cities}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
              <option value="Moscow"></option>
              <option value="Paris"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${templateDateBegin}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${templateDateEnd}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-${typeOffer}-1" type="checkbox" name="event-offer-${typeOffer}" checked>
                <label class="event__offer-label" for="event-offer-name-1">
                  <span class="event__offer-title">${nameOffer}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${costOffer}</span>
                </label>
              </div>

              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
                <label class="event__offer-label" for="event-offer-comfort-1">
                  <span class="event__offer-title">${nameOffer}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${costOffer}</span>
                </label>
              </div>

              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
                <label class="event__offer-label" for="event-offer-meal-1">
                  <span class="event__offer-title">${nameOffer}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${costOffer}</span>
                </label>
              </div>

              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
                <label class="event__offer-label" for="event-offer-seats-1">
                  <span class="event__offer-title">${nameOffer}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${costOffer}</span>
                </label>
              </div>

              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
                <label class="event__offer-label" for="event-offer-train-1">
                  <span class="event__offer-title">${nameOffer}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${costOffer}</span>
                </label>
              </div>
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${photosList}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`;
};
