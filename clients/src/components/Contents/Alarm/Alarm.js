import React from 'react';
import '../../../assets/css/navigation.css';

const Alarm = (alarms) => {
  const alarm = alarms.alarms;
  const alarmReadCheck = alarm.status;
  const alarmType = alarm.message.split('.').at(0);
  const alarmMessage = alarm.message.split('.').at(1);
  const url = alarm.url;

  let alarmDate = new Date(alarm.alarmDate);

  function dateFormat(alarmDate) {
    let month = alarmDate.getMonth() + 1;
    let day = alarmDate.getDate();
    let hour = alarmDate.getHours();
    let minute = alarmDate.getMinutes();
    let second = alarmDate.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return alarmDate.getFullYear() + '-' + month + '-' + day + ' ' + hour
      + ':' + minute + ':' + second;
  }

  const moveToPage = () => {
    window.location.href = url;
  };

  return (
    <div className={'alarm ' + alarmReadCheck} onClick={moveToPage}>
      {
        alarmType
      }
      <br />
      {
        alarmMessage
      }
      <br />
      {
        dateFormat(alarmDate)
      }
    </div>
  );
};

export default Alarm;