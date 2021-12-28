import React from 'react';
import PortfolioSearchForm from './ArchiveSearchForm';

const ArchiveMain = () => {

  return (
    <div className='blogSection'>
      <PortfolioSearchForm/>
      <div className='blogSectionTitle'>
        <h1>Hot Portfolio</h1>
        <hr />
      </div>

      <div className='blogSectionContents'>
        <div className='leftSide'>
          <div className='blogSectionSubTitle'>
            <h3>Order of Replies</h3>
          </div>
          <div className='blogSectionContents'>
            댓글 많은 순서대로 정렬된 포트폴리오입니다.
          </div>
        </div>

        <div className='rightSide'>
          <div className='blogSectionSubTitle'>
            <h3>Order of Likes</h3>
          </div>
          <div className='blogSectionContents'>
            좋아요 많은 순서대로 정렬된 포트폴리오입니다.
          </div>
        </div>
      </div>
      <div style={{ clear: 'both' }}></div>

      <div>
        <div className='blogSectionTitle'>
          <h1>New Portfolio</h1>
          <hr />
        </div>
      </div>
      <div className='blogSectionContents'>
        신규 등록된 순서대로 나열된 포트폴리오입니다.
      </div>

      <div className='blogSectionTitle'>
        <h1>Hot Resumes</h1>
        <hr />
      </div>

      <div className='blogSectionContents'>
        <div className='leftSide'>
          <div className='blogSectionSubTitle'>
            <h3>Order of Replies</h3>
          </div>
          <div className='blogSectionContents'>
            댓글 많은 순서대로 정렬된 포트폴리오입니다.
          </div>
        </div>

        <div className='rightSide'>
          <div className='blogSectionSubTitle'>
            <h3>Order of Likes</h3>
          </div>
          <div className='blogSectionContents'>
            좋아요 많은 순서대로 정렬된 포트폴리오입니다.
          </div>
        </div>
      </div>
      <div style={{ clear: 'both' }}></div>

      <div>
        <div className='blogSectionTitle'>
          <h1>New Resumes</h1>
          <hr />
        </div>
      </div>
      <div className='blogSectionContents'>
        신규 등록된 순서대로 나열된 포트폴리오입니다.
      </div>

      <div className='blogSectionTitle'>
        <h1>Hot BusinessCards</h1>
        <hr />
      </div>

      <div className='blogSectionContents'>
        <div className='leftSide'>
          <div className='blogSectionSubTitle'>
            <h3>Order of Replies</h3>
          </div>
          <div className='blogSectionContents'>
            댓글 많은 순서대로 정렬된 포트폴리오입니다.
          </div>
        </div>

        <div className='rightSide'>
          <div className='blogSectionSubTitle'>
            <h3>Order of Likes</h3>
          </div>
          <div className='blogSectionContents'>
            좋아요 많은 순서대로 정렬된 포트폴리오입니다.
          </div>
        </div>
      </div>
      <div style={{ clear: 'both' }}></div>

      <div>
        <div className='blogSectionTitle'>
          <h1>New BusinessCards</h1>
          <hr />
        </div>
      </div>
      <div className='blogSectionContents'>
        신규 등록된 순서대로 나열된 포트폴리오입니다.
      </div>
    </div>

  );
};

export default ArchiveMain;