import React, { useEffect, useState } from 'react';
import '../../../assets/css/blog.css';
import BlogSearchForm from './BlogSearchForm';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const BlogMain = (props) => {
  const goToAdminBlog = () => {
    props.history.push('/yamoonjin.com/blog/admin');
  };
  const goToTest1Blog = () => {
    props.history.push('/yamoonjin.com/blog/test1');
  };

  const [newBloggers, setNewBloggers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/blogger/sign-up-date', {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      setNewBloggers(res.results);
    });
  }, []);

  return (
    <div>
      <div className='blogSection'>
        <BlogSearchForm />
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
          신규 가입한 순서대로 나열된 블로거들입니다.<br />
          {
            newBloggers.map((blogName, index) => (
              <div key={index}>
                <Link to={'/yamoonjin.com/blog/' + blogName}>
                  <Button>{blogName} Blog</Button>
                </Link>
              </div>
            ))
          }
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
    </div>
  );
};

export default withRouter(BlogMain);