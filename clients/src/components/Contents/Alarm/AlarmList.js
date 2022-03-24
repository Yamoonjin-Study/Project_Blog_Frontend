import React from 'react';
import Alarm from './Alarm';
import '../../../assets/css/navigation.css';

const AlarmList = ({ alarmList }) => {
  return (
    <div>
      {
        alarmList.map((alarms) => (
          <Alarm key={alarms.id} alarms={alarms} />
        ))
      }
    </div>
  );
};

export default AlarmList;