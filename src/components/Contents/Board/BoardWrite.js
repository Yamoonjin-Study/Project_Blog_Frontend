import React from 'react';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';
import 'react-summernote/lang/summernote-ko-KR';
import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';

const BoardWrite = () => {

  const blog_name = window.location.pathname.split('/').at(3);

  let boardWrite = {
    title: '',
    content: '',
    category: null,
  };

  const onContentChange = (content) => {
    $('input[name=\'content\']').val(content);
  };

  const onImageUpload = (images, insertImage) => {
    for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        insertImage(reader.result);
      };

      reader.readAsDataURL(images[i]);
    }
  };

  const goBoard = () => {
    window.location.href = '/yamoonjin.com/blog/' + blog_name + '/board';
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
      window.location.href = '/yamoonjin.com/blog/' + blog_name + '/board/list';
    });
  };
  return (
    <div className='container'>
      <h4 className='mainTitle'>Write Board</h4>
      <div className='divider' id='divider'></div>
      제목 : <input type='text' name='title' />
      <input type='text' name='content' style={{ display: 'none' }} />
      <ReactSummernote
        value='내용을 입력하여주세요'
        options={{
          lang: 'ko-KR',
          height: 500,
          dialogsInBody: true,
          toolbar: [
            // [groupName, [list of button]]
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['style',
              ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
            ['color', ['forecolor', 'color']],
            ['table', ['table']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['insert', ['picture', 'link', 'video']],
            ['view', ['fullscreen', 'help']],
          ],
          fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New',
            '맑은 고딕', '궁서', '굴림체', '굴림', '돋움체', '바탕체'],
          fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22',
            '24', '28', '30', '36', '50', '72'],
        }}
        onChange={onContentChange}
        onImageUpload={onImageUpload}
      />
      <button className='btn2 btnHover' onClick={submitBoard}>작성하기</button>
      <button className='btn2 btnHover' onClick={goBoard}>취소</button>
    </div>
  );
};

export default BoardWrite;