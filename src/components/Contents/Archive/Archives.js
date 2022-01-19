import React, { useEffect, useState } from 'react';
import ArchiveList from './ArchiveList';

const Archives = () => {

  const blog_name = window.location.pathname.split('/').at(3);
  const [archiveList, setArchiveList] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:8080/show-archives/' + blog_name, {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      setArchiveList(res.archive);
    });
  },[]);

  console.log(archiveList);

  return (
    <div>
      <h4 className='mainTitle'>Archive List</h4>
      <div className='divider'></div>
      <button className='btn2 btnHover'>Portfolios</button>
      <button className='btn2 btnHover'>Business Cards</button>
      <button className='btn2 btnHover'>Resumes</button>
      <br/>
      {
        archiveList.map &&
          archiveList.map((archives)=>(
            <ArchiveList key={archives.id} archives={archives}/>
          ))
      }
    </div>
  );
};

export default Archives;