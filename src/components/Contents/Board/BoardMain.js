import React from 'react';
import BoardList from './BoardList';

const BoardMain = ({boardList}) => {

  return (
    <div>
      <h4 className='mainTitle'>Boards</h4>
      <div className='divider'></div>
      <br/>
      {
        boardList.map((boards)=>(
          <BoardList key={boards.id} boards={boards}/>
        ))
      }
    </div>
  );
};

export default BoardMain;