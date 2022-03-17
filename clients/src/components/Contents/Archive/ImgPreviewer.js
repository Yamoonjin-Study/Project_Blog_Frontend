import React from 'react';

const ImgPreviewer = (url) => {

  return (
    <div className='imgFileReader'>
      <img src={url.url}/>
    </div>
  );
};

export default ImgPreviewer;