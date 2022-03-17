import React, { useState } from 'react';
import PdfViewer from './PdfViewer';
import '../../../assets/css/uploadArchive.css';
import $ from 'jquery';
import SummerNote from '../Api/SummerNote';
import { Link } from 'react-router-dom';

const UploadArchiveForm = (props) => {
  const blog_name = window.location.pathname.split('/').at(3);
  const [url, setUrl] = useState('none');

  const formData = new FormData();

  const onLoadFile = (e) => {
    const file = e.target.files;
    file.length > 0
      ? setUrl(URL.createObjectURL(file[0]))
      : setUrl('none');
  };

  let uploadArchiveData = {
    title: '',
    content: '',
    type: '',
  };

  const submitCreateArchive = (e) => {
    e.preventDefault();
    uploadArchiveData = {
      title: $('input[name=\'title\']').val(),
      content: $('input[name=\'content\']').val(),
      type: $('select[name=\'type\']').val(),
    };
    formData.append('pdfFile', $('input[name=\'pdfFile\']')[0].files[0]);
    fetch('http://localhost:8080/create-archive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
      body: JSON.stringify(uploadArchiveData),
    })
    .then(res => res.json())
    .then(res => {
      if (res.responseMessage === 'Create Archive Success') {
        console.log(res);
        if (url !== 'none') {
          fetch('http://localhost:8080/upload-file/' + res.archive.id, {
            method: 'POST',
            headers: {
              'X-AUTH-TOKEN': sessionStorage.getItem('token'),
            },
            body: formData,
          })
          .then(res)
          .then(res => {
            alert('작성되었습니다.');
            props.history.push('/yamoonjin.com/blog/"+blog_name+"/archive/list');
          });
        } else {
          alert('작성되었습니다.');
          window.location.href = '/yamoonjin.com/blog/' + blog_name
            + '/archive/list';
        }
      } else {
        alert('작성 실패하였습니다.');
      }
    });
  };

  return (
    <div className='container'>
      <h4 className='mainTitle'>Upload Archive</h4>
      <div className='divider' id='divider'></div>
      <form encType='multipart/form-data' onSubmit={submitCreateArchive}>
        Title : <input type='text' name='title' id='title' />
        Type :
        <select name='type'>
          <option value='null'>Select</option>
          <option value='RESUME'>Resume</option>
          <option value='BUSINESS_CARD'>Business Card</option>
          <option value='PORTFOLIO'>Portfolio</option>
        </select>
        <br />
        <input type='file' name='pdfFile' onChange={onLoadFile} accept='.pdf'
               style={{ display: 'inline-block' }} />
        (pdf 파일만 첨부 가능합니다. 이미지는 아래 양식에서 첨부해주세요.)
        <br />
        Preview : (화면에 마우스를 올리면, 하단에 Preview Navigation 나타납니다. )<br />
        {
          url !== 'none'
            ? <PdfViewer url={url} />
            : null
        }
        <br />
        <br />
        <SummerNote />
        <br />
        <br />
        <button className='btn2 btnHover' type='submit'>Submit</button>
        <Link to={'/yamoonjin.com/blog/' + blog_name
        + '/archive/list'}><button className='btn2 btnHover'>Cancel</button></Link>
      </form>
    </div>
  );
};

export default UploadArchiveForm;