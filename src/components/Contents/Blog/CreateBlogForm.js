import React, { useState } from 'react';
import '../../../assets/css/main.css';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

const CreateBlogForm = (props) => {
  let blog_id;

  const [createBlog, setCreateBlog] = useState({
    name:"",
    info:"",
    category:"",
    menu_design:"",
    main_content:"",
  });

  const onChangeValue = (e) => {
    setCreateBlog({
      ...createBlog,
      [e.target.name] : e.target.value
    });
  }

  const formData = new FormData();

  const onChangeFile = (e) => {
    console.log(e.target.name+" : "+e.target.files[0]);
    formData.append(e.target.name, e.target.files[0]);
    console.log(formData.get("icon"));
    console.log(formData.get("logo_image"));
  }

  const submitCreateBlog = (e) => {
    e.preventDefault();
    console.log(createBlog);
    fetch("http://localhost:8080/create-blog",{
      method:"POST",
      headers:{
        "Content-Type":"application/json; charset=utf-8",
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
      body:JSON.stringify(createBlog)
    })
    .then(res => res.json())
    .then(res=>{
      if(res.responseMessage === "Create Blog Success"){
        blog_id = res.blog.id;

        fetch("http://localhost:8080/save-file/"+blog_id,{
          method:"POST",
          headers:{
            'X-AUTH-TOKEN': sessionStorage.getItem('token'),
          },
          body: formData
        })
        .then(res)
        .then((res)=>console.log(res));

        alert("블로그 생성을 축하합니다.");
        props.history.push('/yamoonjin.com/blog/'+res.blog.name);
      }else{
        alert("블로그 생성에 실패하였습니다.");
      }
    });
  }

  return (
    <div className='mainPage'>
      <div className='section1'>
        <div className='section1Contents'>
          <h4 className='mainTitle'>Blog Creation</h4>
          <div className='divider'></div>
          <form className='signUpForm' encType='multipart/form-data' onSubmit={submitCreateBlog}>
            <label className='signUpInfo'>BLOG NAME</label>
            <br />
            <input id='name' name='name' type='text'className='signUpInput' onChange={onChangeValue}/>
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>BLOG INFORMATION</label>
            <br />
            <input id='info' name='info' type='text' className='signUpInput' onChange={onChangeValue}/>
            <div className='signUpUnderLine'></div>
            <br />


            <label className='signUpInfo'>BLOG CATEGORY&nbsp;&nbsp;&nbsp;&nbsp;<i className='signUpExample'>Personal Blog or Business Blog</i></label>
            <br />
            <select id='category' name='category' className='settingSelect' onChange={onChangeValue}>
              <option value="none">=== 선택 ===</option>
              <option value='PERSONAL'>PERSONAL</option>
              <option value='BUSINESS'>BUSINESS</option>
            </select>
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>BLOG MAIN SCREEN CONTENT&nbsp;&nbsp;&nbsp;&nbsp;
              <i className='signUpExample'>If the content does not exist, a blank space appears on the main screen.</i></label>
            <br />
            <select id='main_content' name='main_content' className='settingSelect' onChange={onChangeValue}>
              <option value="none">=== 선택 ===</option>
              <option value='0'>None</option>
              <option value='1'>Your Business Card</option>
              <option value='2'>Your Profile</option>
              <option value='3'>Your Board</option>
            </select>
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>BLOG MENU DESIGN&nbsp;&nbsp;&nbsp;&nbsp;
              <i className='signUpExample'>Set the position of the menu.</i></label>
            <br />
            <select id='menu_design' name='menu_design' className='settingSelect' onChange={onChangeValue}>
              <option value="none">=== 선택 ===</option>
              <option value='0'>LEFT</option>
              <option value='1'>TOP</option>
              <option value='2'>RIGHT</option>
            </select>
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>BLOG ICON</label>
            <br />
            <input id='icon' name='icon' type='file' accept="image/gif, image/jpeg, image/png" className='signUpInput' onChange={onChangeFile}/>
            <div className='signUpUnderLine'></div>
            <br />

            <label className='signUpInfo'>BLOG LOGO IMAGE&nbsp;&nbsp;&nbsp;&nbsp;<i className='signUpExample'></i></label>
            <br />
            <input id='logo_image' name='logo_image' type='file' accept="image/gif, image/jpeg, image/png" className='signUpInput' onChange={onChangeFile}/>
            <div className='signUpUnderLine'></div>
            <br />

            <Link to='/yamoonjin.com/blog'><input type='button' value='Cancel' className='btn2 btnHover'/></Link>
            <input type='button' value='Preview' className='btn2 btnHover'/>
            <input type='submit' value='Create' className='btn2 btnHover'/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CreateBlogForm);