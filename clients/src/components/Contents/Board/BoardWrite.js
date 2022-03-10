import React from 'react';
import $ from 'jquery';
import SummerNote from '../Api/SummerNote';
import { Link } from 'react-router-dom';

const BoardWrite = (props) => {

  const blogName = window.location.pathname.split('/').at(3);

  let boardWrite = {
    title: '',
    content: '',
    category: null,
  };

  const submitBoard = (e) => {
    e.preventDefault();
    boardWrite = {
      title: $('input[name=\'title\']').val(),
      content: $('input[name=\'content\']').val(),
      category: null,
    };
    fetch('http://localhost:8080/write-board', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
      body: JSON.stringify(boardWrite),
    })
    .then(res => res)
    .then(res => {
      alert('글을 작성하였습니다.');
      props.history.push('/yamoonjin.com/blog/' + blogName + '/board/list');
    });
  };
  return (
    <div className='container'>
      <h4 className='mainTitle'>Write Board</h4>
      <div className='divider' id='divider'></div>
      제목 : <input type='text' name='title' />
      <SummerNote />
      <Link to={'/yamoonjin.com/blog/' + blogName + '/board/list'} onClick={submitBoard}><button className='btn2 btnHover'>Summit</button></Link>
      <Link to={'/yamoonjin.com/blog/' + blogName + '/board/list'}><button className='btn2 btnHover'>Cancel</button></Link>
    </div>
  );
};

export default BoardWrite;