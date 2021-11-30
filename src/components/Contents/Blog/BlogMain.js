import React from 'react';
import '../../../assets/css/blog.css';
import BlogSearchForm from './BlogSearchForm';

const BlogMain = () => {

  return (
    <div className='blogSection'>
      <BlogSearchForm/>
      <div className='blogSectionTitle'>
        <h1>Hot Bloggers</h1>
        <hr />
      </div>
      <div className='blogSectionContents'>
        <div className='leftSide'>
          <div className='blogSectionSubTitle'>
            <h3>Order of Activity</h3>
          </div>
          <div className='blogSectionContents'>
            블로그 활동이 많은 순서대로 정렬된 블로거들입니다.
          </div>
        </div>
        <div className='rightSide'>
          <div className='blogSectionSubTitle'>
            <h3>Order of Followers</h3>
          </div>
          <div className='blogSectionContents'>
            팔로워가 많은 순서대로 정렬된 블로거들입니다.
          </div>
        </div>
      </div>
      <div style={{ clear: 'both' }}></div>

      <div>
        <div className='blogSectionTitle'>
          <h1>New Bloggers</h1>
          <hr />
        </div>
      </div>
      <div className='blogSectionContents'>
        신규 가입한 순서대로 나열된 블로거들입니다.
      </div>

      <div className='blogSectionTitle'>
        <h1>Hot Boards</h1>
        <hr />
      </div>

      <div className='blogSectionContents'>
        <div className='leftSide'>
          <div className='blogSectionSubTitle'>
            <h3>Order of Replies</h3>
          </div>
          <div className='blogSectionContents'>
            댓글 많은 순서대로 정렬된 게시글입니다.
          </div>
        </div>

        <div className='rightSide'>
          <div className='blogSectionSubTitle'>
            <h3>Order of Likes</h3>
          </div>
          <div className='blogSectionContents'>
            좋아요 많은 순서대로 정렬된 게시글입니다.
          </div>
        </div>
      </div>
      <div style={{ clear: 'both' }}></div>
    </div>
  );
};

export default BlogMain;