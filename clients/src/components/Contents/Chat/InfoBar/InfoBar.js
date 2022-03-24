import React from 'react';

import onlineIcon from '../../../../assets/images/onlineIcon.png';
import closeIcon from '../../../../assets/images/closeIcon.png';
import { Link } from 'react-router-dom';

const InfoBar = (room) => {
  return (
    <div className='infoBar'>
      <div className='leftInnerContainer'>
        <img className='onlineIcon' src={onlineIcon} alt='online icon' />
        <h3>{room.room}</h3>
      </div>
      <div className='rightInnerContainer'>
        <Link to='/yamoonjin.com/join'>
          <img src={closeIcon} alt='close icon' />
        </Link>
      </div>
    </div>
  );
};

export default InfoBar;