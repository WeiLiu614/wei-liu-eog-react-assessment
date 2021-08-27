const initialState = {
  getMetrics: [],
};

const metric = (state = initialState, action) => {
  const { getMetrics } = action;
  switch (action.type) {
    case 'METRIC_DATA_RECEIVED':
      return { getMetrics };
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
