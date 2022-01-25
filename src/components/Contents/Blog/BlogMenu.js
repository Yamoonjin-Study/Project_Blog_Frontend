import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FollowingList from '../Follow/FollowingList';

const BlogMenu = ({blog, blogOwnerCheck, goMain}) => {
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);

  const blogName = window.location.pathname.split('/').at(3);

  useEffect(() => {
      fetch('http://localhost:8080/blog/showFollowingList/' + blogName, {
        method: 'GET',
        headers: {
          'X-AUTH-TOKEN': sessionStorage.getItem('token'),
        },
      })
      .then(res => res.json())
      .then(res => {
        setFollowingList(res);
      });

    fetch('http://localhost:8080/blog/showFollowerList/' + blogName, {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      setFollowerList(res);
    });
  }, []);

  const onClickFollowing = () => {
    fetch('http://localhost:8080/blog/following/'+blogName,{
      method:'GET',
      headers:{
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res=>res.json())
    .then(res=>{
      alert(res.responseMessage);
      window.location.reload();
    });
  }

  const onClickShowFollower = () => {

  }

  const onClickShowFollowing = () => {

  }

  return (
    <div>
      <h2><img className='iconImage' src={blog.iconImage} onClick={goMain} alt='icon'/>{blog.blogName}</h2>
      <h6>_{blog.category} 계정</h6>
      <h6>{blog.info}</h6>
      <div className='btn5 btnHover' style={{display:'inline-block'}}><h3>{followingList.length}</h3>Following</div>
      <div className='btn5 btnHover' style={{display:'inline-block'}}><h3>{followerList.length}</h3>Follower</div>
      <br />
      {
        blogOwnerCheck === 'true'
          ? <Link to={'/yamoonjin.com/blog/' + blogName + '/settings'}>
            <button className='btn2 btnHover'>Settings</button>
          </Link>
          : <button className='btn2 btnHover' onClick={onClickFollowing}>Following</button>
      }
      <hr style={{ width: '80%', margin: '15px 10% 15px 10%' }} />
      <div className='showBlogContentsMenu'>
        <Link to ={'/yamoonjin.com/blog/' + blogName + '/board/list'}><h6>> board list</h6></Link>
        {
          blogOwnerCheck === 'true' &&
          <Link to ={'/yamoonjin.com/blog/' + blogName + '/board/write'}><h6>> write board</h6></Link>
        }
        <Link to ={'/yamoonjin.com/blog/' + blogName + '/archive/list'}><h6>> archive list</h6></Link>
        {
          blogOwnerCheck === 'true' &&
          <Link to ={'/yamoonjin.com/blog/' + blogName + '/archive/upload'}><h6>> upload archive</h6></Link>
        }
        <Link to ={'/yamoonjin.com/blog/' + blogName + '/guestbook'}><h6>> guest books</h6></Link>
      </div>
      <FollowingList followingList={followingList}/>
    </div>
  );
};

export default BlogMenu;