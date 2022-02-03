import React from 'react';

const PortfolioSearchForm = () => {

  return (
    <div className='SearchFrom'>
      <form>
        <input type='radio' id='portfolios' name='search' value='블로그' defaultChecked />&nbsp;
        <label htmlFor='portfolios'>Portfolios</label>
        &nbsp;&nbsp;&nbsp;
        <input type='radio' id='resumes' name='search' value='게시글' />&nbsp;
        <label htmlFor='resumes'>Resumes</label>
        &nbsp;&nbsp;&nbsp;
        <input type='radio' id='businesscards' name='search' value='게시글' />&nbsp;
        <label htmlFor='businesscards'>BusinessCards</label><br />
        <select>
          <option>제목 검색</option>
          <option>닉네임 검색</option>
        </select>
        <input type='text' placeholder='검색어를 입력해주세요.' />
        <input type='submit' value='검색' />
      </form>
    </div>
  );
};

export default PortfolioSearchForm;