const initialState = {
  multipleMeasurements: [],
};

const measurement = (state = initialState, action) => {
  const { multipleMeasurements } = action;
  switch (action.type) {
    case 'MULTIPLE_MEASUREMENTS_RECEIVED':
      return {
        multipleMeasurements,
      };
    case 'NEW_MEASUREMENTS_RECEIVED':
      if (Object.prototype.hasOwnProperty.call(state.multipleMeasurements, 'multipleMeasurements')) {
        for (let i = 0; i < Object.keys(state.multipleMeasurements.multipleMeasurements).length;
          i += 1) {
          if (
            state.multipleMeasurements.multipleMeasurements[i].metric
            === action.newMeasurementData.newMeasurement.metric
          ) {
            state.multipleMeasurements.multipleMeasurements[i].measurements.push(
              action.newMeasurementData.newMeasurement,
            );
            state.multipleMeasurements.multipleMeasurements[i].measurements.shift();
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
