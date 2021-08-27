import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from 'recharts';
import Detail from './Detail';

const moment = require('moment');

function formatXAxis(tickItem) {
  tickItem = moment(parseInt(tickItem, 10)).format('LT');
  return tickItem;
}

const getMultipleMeasurement = state => {
  const data = state.measurement.getMultipleMeasurements; // eslint-disable-line
  return data;
};

const measurementsToChart = (dataList, measurements) => {
  const data = measurements.getMultipleMeasurements;
  if (data.length === 0) {
    return [];
  }
  const length = data[0].measurements.length; // eslint-disable-line
  const dataChart = [];

  for (let i = 0; i < length; i += 1) {
    const obj = {};
    for (let j = 0; j < data.length; j += 1) {
      obj[data[j].measurements[i].metric] = data[j].measurements[i].value;
      obj.name = data[j].measurements[i].at;
    }
    dataChart.push(obj);
  }
  return dataChart;
};

const Chart = props => {
  const data = useSelector(getMultipleMeasurement);
  const [state, setState] = useState({ details: [] });
  let dataList = [];
  if (data.length !== 0) {
    dataList = measurementsToChart(
      dataList,
      data,
    );
  }

  if (props.command.value.length === 0) { // eslint-disable-line
    return null;
  }

  if (dataList.length === 0) {
    return <div>NO DATA</div>;
  }

  const showDetails = name => e => {
    setState({ ...state, [name]: e });
  };

  const hideDetails = name => e =>{ // eslint-disable-line
    setState({ ...state, [name]: [] });
  };

  return (
    <div>
      <ResponsiveContainer height={500}>
        <LineChart
          width={500}
          height={500}
          data={dataList}
          onMouseMove={showDetails('details')}
          onMouseLeave={hideDetails('details')}
          margin={{
            top: 15,
            right: 15,
            left: 15,
            bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            allowDataOverflow={true} // eslint-disable-line
            tickFormatter={formatXAxis}
          />
          <YAxis
            domain={['auto', 'auto']}
            scale='linear'
            tickCount={20}
          />
          <Legend />

          {props.command.value // eslint-disable-line
            ? props.command.value.map(data => { //eslint-disable-line
              return (
                <Line
                  type="monotone"
                  key={`${data}`}
                  dataKey={`${data}`}
                  activeDot={{ r: 8 }}
                  dot={false}
                  isAnimationActive={false}
                />
              );
            })
            : null}
        </LineChart>
      </ResponsiveContainer>
      {state.details === false ? null : <Detail details={state.details} /> }
    </div>
  );
};

export default Chart;
