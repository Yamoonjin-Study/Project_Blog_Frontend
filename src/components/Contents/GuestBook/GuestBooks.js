import React from 'react';

const GuestBooks = (blogOwnerCheck) => {
  return (
    <div>
      <h1>Guest Books</h1>
      <div className='divider'></div>
      <form>
        방명록 : <textarea name='content' style={{
        width: '80%',
        height: '100px',
        verticalAlign: 'middle',
      }}/>
        <button>작성하기</button>
      </form>
    </div>
  );
};

export default GuestBooks;