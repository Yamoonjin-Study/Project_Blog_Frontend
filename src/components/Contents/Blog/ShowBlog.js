import React, { useEffect, useState } from 'react';
import '../../../assets/css/showBlog.css';

const ShowBlog = ({ match }) => {

  const blogname = match.params.name;
  const [blogOwnerCheck, setBlogOwnerCheck] = useState('');
  const [blog, setBlog] = useState({
    id: '',
    name: '',
    info: '',
    icon: '',
    create_date: '',
    status: '',
    logo_image: '',
    design_form: '',
    category: '',
  });

  //블로그의 주인인지 아닌지를 체크해줘야한다.
  useEffect(() => {
    fetch('http://localhost:8080/blog/myBlog', {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      if (res.blogname === blogname) {
        setBlogOwnerCheck('true');
      } else {
        setBlogOwnerCheck('false');
      }
    });
  }, []);

  //블로그 호출
  useEffect(() => {
    fetch('http://localhost:8080/blog/' + blogname, {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      if (res.responseMessage === 'No Result') {
        alert('블로그를 조회할 수 없습니다. 관리자에게 문의해 주세요.');
      } else {
        setBlog(res.blog);
      }
    });
  }, []);

  return (
    <div className='showBlogSection'>
      <img className='showBlogTitleImg' src={blog.logo_image} />
      <div className='showBlogMenu'>
        <h2><img src={blog.icon}/>{blog.name}</h2>
        <h6>_{blog.category} 계정</h6>
        <h6>DesignForm_{blog.design_form}</h6>
        <button>Following</button><button>Follower</button><br/>
        {
          blogOwnerCheck === 'true'
            ? <button>Management</button>
            : null
        }
        <hr style={{width:'80%', margin:'15px 10% 15px 10%'}}/>
        <div className='showBlogContentsMenu'>
          <h6>> boards</h6>
          <h6>> guest books</h6>
        </div>
      </div>
      <div className='showBlogContent'>
        <h4>명함 or 이력서 or 게시글 선택하여 띄울 수 있음.</h4>
      </div>
      <div className='showBlogContent'>
        <h4>게시글 리스트</h4>
      </div>
    </div>
  );
};

export default ShowBlog;