const initialState = {
  multipleMeasurements: []
};

const measurement = (state = initialState, action) => {
  switch(action.type) {
    case 'MULTIPLE_MEASUREMENTS_RECEIVED':
      const { multipleMeasurements } = action;
      return {
        multipleMeasurements
      };
    case 'NEW_MEASUREMENTS_RECEIVED':
      if (state.multipleMeasurements.hasOwnProperty("multipleMeasurements")) {
        for (let i = 0; i < Object.keys(state.multipleMeasurements.multipleMeasurements).length; i++) {
          if ( state.multipleMeasurements.multipleMeasurements[i].metric === action.newMeasurementData.newMeasurement.metric ) {
            state.multipleMeasurements.multipleMeasurements[i].measurements.push(action.newMeasurementData.newMeasurement);
            state.multipleMeasurements.multipleMeasurements[i].measurements.shift()
          }
        }
      }
      return state;
    case 'MULTIPLE_MEASUREMENTS_ERROR':
      return {
        ...state,
        error: action.error
      };
    case 'NEW_MEASUREMENTS_ERROR':
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default measurement;