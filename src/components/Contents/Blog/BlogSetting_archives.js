import React, { useEffect, useState } from 'react';
import ArchiveList from '../Archive/ArchiveList';

const BlogSetting_archives = () => {

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
      {
        archiveList.map &&
        archiveList.map((archives)=>(
          <ArchiveList key={archives.id} archives={archives}/>
        ))
      }
    </div>
  );
};

export default BlogSetting_archives;