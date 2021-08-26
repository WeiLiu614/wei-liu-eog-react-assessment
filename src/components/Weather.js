import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'urql';
import { useGeolocation } from 'react-use';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from './Chip';

const query = `
query($latLong: WeatherQuery!) {
  getWeatherForLocation(latLong: $latLong) {
    description
    locationName
    temperatureinCelsius
  }
}
`;

const getWeather = state => {
  const { temperatureinFahrenheit, description, locationName } = state.weather;
  return {
    temperatureinFahrenheit,
    description,
    locationName,
  };
};

const Weather = () => {
  const getLocation = useGeolocation();
  const latLong = {
    latitude: getLocation.latitude || 29.7604,
    longitude: getLocation.longitude || -95.3698,
  };

  const dispatch = useDispatch();
  const { temperatureinFahrenheit, description, locationName } = useSelector(
    getWeather,
  );

  const [result] = useQuery({
    query,
    variables: {
      latLong,
    },
  });
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch({ type: 'ERROR_RECEIVED', error: error.message });
      return;
    }

    if (!data) return;
    const { getWeatherForLocation } = data;
    dispatch({ type: 'WEATHER_DATA_RECEIVED', getWeatherForLocation });
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return (
    <Chip
      label={`Weather in ${locationName}: ${description} and ${temperatureinFahrenheit}°`}
    />
  );
};

export default () => (<Weather />);
