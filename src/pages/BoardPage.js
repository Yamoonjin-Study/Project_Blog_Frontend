import React, { useEffect, useState } from 'react';
import BoardMain from '../components/Contents/Board/BoardMain';
import BoardWrite from '../components/Contents/Board/BoardWrite';
import BoardUpdate from '../components/Contents/Board/BoardUpdate';
import { Route } from 'react-router-dom';

const BoardPage = ({ blog, blogOwnerCheck, goMain, blogDesign }) => {

  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/board-list', {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      setBoardList(res);
      console.log(res);
    });
  }, []);

  return (
    <div className='showBlogContent'>
      <Route path={'/yamoonjin.com/blog/'+blog.name+'/board'} exact={true}><BoardMain boardList={boardList}/></Route>
      <Route path={'/yamoonjin.com/blog/'+blog.name+'/board/write'} exact={true}><BoardWrite blog={blog}/></Route>
      <Route path={'/yamoonjin.com/blog/'+blog.name+'/board/update/:id'} ><BoardUpdate /></Route>
    </div>
  );
};

export default BoardPage;