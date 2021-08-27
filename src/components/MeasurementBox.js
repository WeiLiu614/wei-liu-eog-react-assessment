import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';

const getNewMeasurements = state => {
  const getMeasurements = state.measurement.getMultipleMeasurements;
  return getMeasurements;
};

const MeasurementBox = props => {
  if (props.display.value.length === 0) {  // eslint-disable-line
    return null;
  }

  const measurementList = props.display.value;  // eslint-disable-line
  const newData = useSelector(getNewMeasurements).getMultipleMeasurements;

  const list = [];
  for (let i = 0; i < newData.length; i += 1) {
    const data = newData[i].measurements.slice(-1)[0];
    if (measurementList.includes(data.metric)) {
      list.push(data);
    }
  }

  return (
    <div>
      <Grid columns="equal" divided>
        {list
          ? list.map(measurement => (
            <Grid.Column key={measurement.metric} style={{ margin: '20px' }}>
              <Segment>
                {measurement.metric} : <h2>{measurement.value}</h2><p>{measurement.unit}</p>
              </Segment>
            </Grid.Column>
          ))
          : null}
      </Grid>
    </div>
  );
};

export default MeasurementBox;
