const initialState = {
  metrics: [],
};

const metric = (state = initialState, action) => {
  const { metrics } = action;
  switch (action.type) {
    case 'METRIC_DATA_RECEIVED':
      return { metrics };
    case 'METRIC_DATA_ERROR':
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default metric;
