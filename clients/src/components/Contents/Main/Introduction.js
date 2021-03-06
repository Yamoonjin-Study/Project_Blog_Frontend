import React from 'react';
import '../../../assets/css/main.css';
import { Link } from 'react-router-dom';
import TypeWriter from '../../../assets/images/typewriter.jpg';
import { Route, withRouter } from 'react-router-dom';

const Introduction = (props) => {
  const blog_id = sessionStorage.getItem('blog_id');
  const blog_nickName = sessionStorage.getItem('blog_nickName');
  const CreateBlogLink = (e) => {
    e.preventDefault();
    if (blog_id) {
      alert('이미 생성된 블로그가 있습니다!');
      props.history.push('/yamoonjin.com/blog/'+blog_nickName);
    } else {
      props.history.push('/yamoonjin.com/blogCreate');
    }
  };

  return (
    <div className='mainPage'>
      <div className='section1'>
        <div className='section1Contents'>
          <h4 className='mainTitle'>OUR VISION</h4>
          <div className='divider'></div>
          <h2 className='mainContents'>
            We want anyone to easily and conveniently<br />create, manage, and
            communicate with their own blog<br />through our blogging service.
          </h2>
          <Link to='/yamoonjin.com/blogCreate' className='makeBlogLink'
                onClick={CreateBlogLink}>MAKE
            YOUR BLOG NOW!</Link>
        </div>
      </div>

      <div className='subsection'>
        <div className='leftSide subsectionContents' style={{ width: '70%' }}>
          <span className='infoSpan'>We offer you a variety of functions<br />to manage your Blog easily and effectively.</span>
        </div>
        <div className='rightSide subsectionContents'
             style={{ width: '30%', textAlign: 'right' }}>
          <button className='btn1'>CHECK IT OUT</button>
        </div>
      </div>

      <div className='section2'>
        <div className='section2Contents'>
          <h4 className='mainTitle' style={{ textAlign: 'left' }}>MANAGE YOU
            PROFILE</h4>
          <h6 className='subTitle'>We offer a variety of features to help you
            manage your Profile.</h6>
          <div className='divider' style={{ margin: '25px 0' }}></div>
          <h2 className='mainContents'>
            We can help you easily manage your resume, portfolio and business
            card.
          </h2>
          <h6 className='subTitle'>Check it out by clicking the button
            below.</h6>
          <button className='btn1'>Resume</button>
          <button className='btn1'>Portfolio</button>
          <button className='btn1'>Business Card</button>
        </div>
        <div style={{ float: 'right', width: '50%', padding: '0 30px' }}>
          <img src={TypeWriter} style={{ width: '100%' }} alt='type writer' />
        </div>
      </div>

    </div>
  );
};

export default withRouter(Introduction);