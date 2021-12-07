import React from 'react';
import '../../../assets/css/boardList.css';

const BoardList = (boards) => {

  const board = boards.boards;

  // db에 저장되어있는 가공하지 않은 데이터
  let orginContent;
  // 글만 있는 컨텐츠면 앞의 50글자만 표시, 글 + 이미지 혹은 이미지만 있는 컨텐츠면 이미지만 표시.
  let convertedContent;
  //이미지의 가로 길이
  let contentWidth;

  if(board.content.indexOf('<img') !== -1){
    orginContent = '<p><img ' + board.content.split('<img').at(1).split('>').at(0) + '></p>';
    contentWidth = orginContent.split('style="width:').at(1).split('px;"').at(0);
    convertedContent = orginContent.replace(contentWidth+'px', '100%');
    console.log('contentWidth : '+ contentWidth);
    console.log(true);
  }else{
    console.log(false);
    if(board.content.split('</p>').at(0).length > 50){
      convertedContent = board.content.split('</p>').at(0).substring(0, 30) + "...";
    }else{
      convertedContent = board.content.split('</p>').at(0) + "...";
    }
  }
  console.log('그냥 컨텐츠 : '+ board.content);
  console.log('변환된 컨텐츠 : '+ convertedContent);

  return (
    <div className='boardList'>
      <h3>title : {board.title}</h3>
      <h2>content :</h2> <p dangerouslySetInnerHTML={{__html: convertedContent}}></p>
      <h4>createDate : {board.createDate.split('T').at(0)}</h4>
      <h4>category : {board.category}</h4>
      <h4>count : {board.count}</h4>
    </div>
  );
};

export default BoardList;