const initialState = {
  getMultipleMeasurements: [],
};

const measurement = (state = initialState, action) => {
  const { getMultipleMeasurements } = action;
  switch (action.type) {
    case 'MULTIPLE_MEASUREMENTS_RECEIVED':
      return {
        getMultipleMeasurements,
      };
    case 'NEW_MEASUREMENTS_RECEIVED':
      if (Object.prototype.hasOwnProperty.call(state.getMultipleMeasurements, 'getMultipleMeasurements')) {
        for (let i = 0; i
          < Object.keys(state.getMultipleMeasurements.getMultipleMeasurements).length;
          i += 1) {
          if (
            state.getMultipleMeasurements.getMultipleMeasurements[i].metric
            === action.newMeasurementData.newMeasurement.metric
          ) {
            state.getMultipleMeasurements.getMultipleMeasurements[i].measurements.push(
              action.newMeasurementData.newMeasurement,
            );
            state.getMultipleMeasurements.getMultipleMeasurements[i].measurements.shift();
          }
        }
      }
      return state;
    case 'MULTIPLE_MEASUREMENTS_ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'NEW_MEASUREMENTS_ERROR':
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default measurement;
