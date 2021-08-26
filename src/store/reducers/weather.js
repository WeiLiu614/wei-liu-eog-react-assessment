const initialState = {
  temperatureinCelsius: null,
  temperatureinFahrenheit: null,
  description: "",
  locationName: ""
};

const toF = c => (c * 9) / 5 + 32;

const weather = (state = initialState, action) => {
  switch(action.type) {
    case 'WEATHER_DATA_RECEIVED':
      const { weatherForLocation } = action;
      const {
        description,
        locationName,
        temperatureinCelsius
      } = weatherForLocation;

    return {
      temperatureinCelsius,
      temperatureinFahrenheit: toF(temperatureinCelsius),
      description,
      locationName
    };
    default:
      return state;
  }
};

export default weather;