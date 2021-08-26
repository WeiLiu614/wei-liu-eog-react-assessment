import { combineReducers } from 'redux';
import measurement from './measurement';
import metric from './metric';
import weather from './weather';

const reducers = combineReducers({
  weather,
  metric,
  measurement,
});

export default reducers;
