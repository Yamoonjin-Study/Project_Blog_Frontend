import React from 'react';
import '../../../assets/css/boardList.css'

const BoardList = (boards) => {

  const board = boards.boards;

  return (
    <div className='boardList'>
      <h3>title : {board.title}</h3>
      <h2>content : {board.content}</h2>
      <h4>createDate : {board.createDate.split('T').at(0)}</h4>
      <h4>category : {board.category}</h4>
      <h4>count : {board.count}</h4>
    </div>
  );
};

export default BoardList;