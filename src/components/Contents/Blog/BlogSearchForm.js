import React from 'react';
import $ from 'jquery';

const BlogSearchForm = () => {

  const radioBoxChange = () => {
    if ($('#blogs').is(':checked') === true) {
      $('#searchBlogs').css('display', 'inline-block');
      $('#boardsLbl').css('color', 'gray');
    } else {
      $('#searchBlogs').css('display', 'none');
      $('#boardsLbl').css('color', 'black');
      $('#blogsLbl').css('color', 'gray');
    }

    if ($('#boards').is(':checked') === true) {
      $('#searchBoards').css('display', 'inline-block');
      $('#blogsLbl').css('color', 'gray');
    } else {
      $('#searchBoards').css('display', 'none');
      $('#blogsLbl').css('color', 'black');
      $('#boardsLbl').css('color', 'gray');
    }
  };

  return (
    <div className='SearchFrom'>
      <form>
        <input type='radio' id='blogs' name='search' value='블로그'
               onChange={radioBoxChange} defaultChecked />&nbsp;
        <label htmlFor='blogs' id='blogsLbl'>Blogs</label>
        &nbsp;&nbsp;&nbsp;
        <input type='radio' id='boards' name='search' value='게시글'
               onChange={radioBoxChange} />&nbsp;
        <label htmlFor='boards' id='boardsLbl' style={{color:'gray'}}>Boards</label><br />
        <select id='searchBlogs'>
          <option>블로그 검색</option>
          <option>닉네임 검색</option>
        </select>
        <select id='searchBoards' style={{ display: 'none' }}>
          <option>통합 검색</option>
          <option>제목 검색</option>
          <option>내용 검색</option>
          <option>닉네임 검색</option>
        </select>
        <input type='text' placeholder='검색어를 입력해주세요.' />
        <input type='submit' value='검색' />
      </form>
    </div>
  );
};

export default BlogSearchForm;