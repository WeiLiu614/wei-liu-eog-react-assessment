const initialState = {
  temperatureinCelsius: null,
  temperatureinFahrenheit: null,
  description: '',
  locationName: '',
};

const toF = c => (c * 9) / 5 + 32;

const weather = (state = initialState, action) => {
  const { getWeatherForLocation } = action;
  let description;
  let locationName;
  let temperatureinCelsius;

  if (getWeatherForLocation) {
    description = getWeatherForLocation.description;
    locationName = getWeatherForLocation.locationName;
    temperatureinCelsius = getWeatherForLocation.temperatureinCelsius;
    console.log(description); // eslint-disable-line no-alert
  }

  switch (action.type) {
    case 'WEATHER_DATA_RECEIVED':
      return {
        temperatureinCelsius,
        temperatureinFahrenheit: toF(temperatureinCelsius),
        description,
        locationName,
      };
    default:
      return state;
  }
};

export default weather;
