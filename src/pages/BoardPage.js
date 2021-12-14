import React, { useEffect, useState } from 'react';
import BoardMain from '../components/Contents/Board/BoardMain';
import BoardWrite from '../components/Contents/Board/BoardWrite';
import BoardUpdate from '../components/Contents/Board/BoardUpdate';
import { Route } from 'react-router-dom';
import BoardDetail from '../components/Contents/Board/BoardDetail';

const BoardPage = () => {
  const blog_name = window.location.pathname.split('/').at(3);
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/board-list/'+blog_name, {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      setBoardList(res);
    });
  }, []);

  return (
    <div className='showBlogContent'>
      <Route path={'/yamoonjin.com/blog/'+blog_name+'/board'} exact={true} ><BoardMain boardList={boardList}/></Route>
      <Route path={'/yamoonjin.com/blog/'+blog_name+'/board/:board_id'} exact={true} component={BoardDetail}></Route>
      <Route path={'/yamoonjin.com/blog/'+blog_name+'/board-write'} exact={true} component={BoardWrite}></Route>
      <Route path={'/yamoonjin.com/blog/'+blog_name+'/board/update/:id'} exact={true}><BoardUpdate /></Route>
    </div>
  );
};

export default BoardPage;