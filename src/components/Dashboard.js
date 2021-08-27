import React, { useEffect, useState } from 'react';
import { useQuery, useSubscription } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Dimmer, Loader } from 'semantic-ui-react';
import Container from '@material-ui/core/Container';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Charts from './Charts';
import MeasurementBox from './MeasurementBox';

const currentTime = new Date().valueOf();
const queryMetric = `
  query {
    getMetrics
  }`;

const queryMultipleMeasurements = `
  query($input: [MeasurementQuery] = [
    {metricName: "tubingPressure", after: ${currentTime - 1800000}, before: ${currentTime}},
    {metricName: "casingPressure", after: ${currentTime - 1800000}, before: ${currentTime}},
    {metricName: "oilTemp", after: ${currentTime - 1800000}, before: ${currentTime}},
    {metricName: "flareTemp", after: ${currentTime - 1800000}, before: ${currentTime}},
    {metricName: "waterTemp", after: ${currentTime - 1800000}, before: ${currentTime}},
    {metricName: "injValveOpen", after: ${currentTime - 1800000}, before: ${currentTime}}
  ]
  ){
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
       at
       value
       metric
       unit
      }
    }
  }
`;

const metricSubscriptionQuery = `
  subscription {
    newMeasurement{
      metric
      at
      value
      unit
    }
  }
`;

const getMetric = state => {
  const getMetrics = state.metric.getMetrics;  // eslint-disable-line
  return getMetrics;
};

const FetchMetrics = () => {
  const query = queryMetric;
  const dispatch = useDispatch();
  const [result] = useQuery({
    query,
    variables: {},
  });
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch({ type: 'METRIC_DATA_ERROR', error });
    }
    if (!data) {
      return;
    }
    if (fetching) {
      return;
    }
    const getMetrics = data;
    dispatch({ type: 'METRIC_DATA_RECEIVED', getMetrics });
  }, [dispatch, data, error, fetching]);
};

const FetchMeasurements = () => {
  const dispatch = useDispatch();
  const [result] = useQuery({
    query: queryMultipleMeasurements,
    variable: [],
  });
  const { data, error, fetching } = result;
  useEffect(() => {
    if (error) {
      dispatch({ type: 'MULTIPLE_MEASUREMENTS_ERROR', error });
    }
    if (!data) {
      return;
    }
    if (fetching) {
      return;
    }
    const getMultipleMeasurements = data;
    dispatch({
      type: 'MULTIPLE_MEASUREMENTS_RECEIVED',
      getMultipleMeasurements,
    });
  }, [dispatch, data, error, fetching]);
};

const metricsToDropDown = (options, metrics) => {
  metrics.getMetrics.forEach(value => {
    const obj = { key: value, text: value, value: value };   // eslint-disable-line
    options.push(obj);
  });
  return options;
};

const FetchNewMeasurement = state => {
  const dispatch = useDispatch();
  const [result] = useSubscription({
    query: metricSubscriptionQuery,
    variables: {},
  });
  const { data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch({ type: 'NEW_MEASUREMENTS_ERROR', error });
    }
    if (!data) {
      return;
    }
    const newMeasurementData = data;
    if (state.switch === true) {
      dispatch({
        type: 'NEW_MEASUREMENTS_RECEIVED',
        newMeasurementData,
      });
    }
  }, [data, error, dispatch, state]);
};

const Dashboard = () => {
  const [state, setState] = useState({
    switch: true,
    value: [],
  });

  FetchMetrics();
  FetchMeasurements();
  FetchNewMeasurement(state);
  const getMetrics = useSelector(getMetric);

  let options = [];

  if (getMetrics.length === 0) {
    return (
      <Dimmer active>
        <Loader size="massive">Loading</Loader>
      </Dimmer>
    );
  }

  options = metricsToDropDown(options, getMetrics);

  const handleSelectionChange = (event, { value }) => {
    setState({ ...state, value });
  };

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <div>
      <div style={{ textAlign: 'right', margin: '20px' }}>
        <FormControlLabel
          control={
            <Switch   // eslint-disable-line
              checked={state.switch}
              onChange={handleChange('switch')}
              value="switch"
              color="primary"
            />
          }
          label="real-time"
        />
      </div>

      <Container>
        <Dropdown
          placeholder="Select..."
          fluid
          multiple
          selection
          options={options}
          onChange={handleSelectionChange}
        />
      </Container>

      <div style={{ margin: '30px' }}>
        <Charts command={state} />
      </div>
      <div>
        <MeasurementBox display={state} />
      </div>
    </div>
  );
};

export default Dashboard;
