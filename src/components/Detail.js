import React from 'react';

const moment = require('moment');

const style = {
  height: 'auto',
  backgroundColor: 'white',
  border: '2px solid #96C8DA',
  width: '200px',
  borderRadius: '20px',
};

const Detail = props => {
  if (props.details === null || props.details.length === 0){return null} // eslint-disable-line
  const time = moment(parseInt(props.details.activePayload[0].payload.name, 10)).format('lll') // eslint-disable-line
  return (
    <div style={{
      position: 'absolute',
      left: '65%',
      top: 200,
      color: '#9F9FA2',
      fontSize: '15px',
      opacity: '.9',
    }}
    >
      {time}
      <div style={style}>
        {
          props.details.activePayload.map(measurement =>{ // eslint-disable-line
            return (
              <p key={measurement.dataKey} style={{ margin: '2px', fontSize: '13px' }}>{measurement.dataKey}: {measurement.value}</p>
            );
          })
        }
      </div>
    </div>
  );
};

export default Detail;
