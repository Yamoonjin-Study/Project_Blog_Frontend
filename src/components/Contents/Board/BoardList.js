import React from 'react';
import '../../../assets/css/board.css';
import { Link } from 'react-router-dom';

const BoardList = (boards) => {
  const blog_name = window.location.pathname.split('/').at(3);
  const board = boards.boards;

  // db에 저장되어있는 가공하지 않은 데이터
  let orginContent;
  // 글만 있는 컨텐츠면 앞의 50글자만 표시, 글 + 이미지 혹은 이미지만 있는 컨텐츠면 이미지만 표시.
  let convertedContent;
  //이미지의 가로 길이
  let contentWidth;

  if (board.content.indexOf('<img') !== -1) {
    orginContent = '<p><img ' + board.content.split('<img').at(1).split('>').at(
      0) + '></p>';
    contentWidth = orginContent.split('style="width:').at(1).split('px;"').at(
      0);
    convertedContent = orginContent.replace(contentWidth + 'px', '100%');
  } else {
    if (board.content.split('</p>').at(0).length > 50) {
      convertedContent = board.content.split('</p>').at(0).substring(0, 30)
        + '...';
    } else {
      convertedContent = board.content.split('</p>').at(0) + '...';
    }
  }

  return (
    <Link to={'/yamoonjin.com/blog/' + blog_name + '/board/' + board.id}>
      <div className='boardList'>
        <div className='boardContent'>
          <h6>title : {board.title}</h6>
          <h6>content :</h6> <p
          dangerouslySetInnerHTML={{ __html: convertedContent }}></p>
          <h6>createDate : {board.createDate.split('T').at(0)}</h6>
          <h6>category : {board.category}</h6>
          <h6>count : {board.count}</h6>
        </div>
      </div>
    </Link>
  );
};

export default BoardList;