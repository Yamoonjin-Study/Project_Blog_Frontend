import React, { useState } from 'react';
import PdfViewer from './PdfViewer';
import '../../../assets/css/uploadArchive.css';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';
import 'react-summernote/lang/summernote-ko-KR';
import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';

const UploadArchiveForm = () => {
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

  const onContentChange = (content) => {
    $('input[name=\'content\']').val(content);
  };

  const onImageUpload = (images, insertImage) => {
    for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        insertImage(reader.result);
      };

      reader.readAsDataURL(images[i]);
    }
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
            console.log(res);
            alert('작성되었습니다.');
            window.location.href="/yamoonjin.com/blog/"+blog_name+"/archive/list";
          });
        }else{
          alert('작성되었습니다.');
          window.location.href="/yamoonjin.com/blog/"+blog_name+"/archive/list";
        }
      } else {
        alert('작성 실패하였습니다.');
      }
    });
  };

  return (
    <div>
      <h4 className='mainTitle'>Upload Archive</h4>
      <div className='divider' id='divider'></div>
      <form encType='multipart/form-data' onSubmit={submitCreateArchive}>
        Title : <input type='text' name='title' id='title'/>
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
        <input type='text' name='content' style={{ display: 'none' }} />
        <ReactSummernote
          value='내용을 입력하여주세요'
          options={{
            lang: 'ko-KR',
            height: 500,
            dialogsInBody: true,
            toolbar: [
              // [groupName, [list of button]]
              ['fontname', ['fontname']],
              ['fontsize', ['fontsize']],
              ['style',
                ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
              ['color', ['forecolor', 'color']],
              ['table', ['table']],
              ['para', ['ul', 'ol', 'paragraph']],
              ['height', ['height']],
              ['insert', ['picture', 'link', 'video']],
              ['view', ['fullscreen', 'help']],
            ],
            fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New',
              '맑은 고딕', '궁서', '굴림체', '굴림', '돋움체', '바탕체'],
            fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20',
              '22',
              '24', '28', '30', '36', '50', '72'],
          }}
          onChange={onContentChange}
          onImageUpload={onImageUpload}
        />
        <br />
        <br />
        <button className='btn2 btnHover' type='submit'>Submit</button>
        <button className='btn2 btnHover'>Cancel</button>
      </form>
    </div>
  );
};

export default UploadArchiveForm;