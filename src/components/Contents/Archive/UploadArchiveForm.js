import React, { useState } from 'react';
import PdfPreviewer from './PdfPreviewer';
import '../../../assets/css/pdfFiles.css'

const UploadArchiveForm = () => {

  const [url, setUrl] = useState('none');

  const onLoadFile = (e) => {
    const file = e.target.files;
    file.length > 0
      ? setUrl(URL.createObjectURL(file[0]))
      : setUrl('none');
  };

  const onSubmit = () => {
    fetch('http://localhost:8080/',{

    }).then().then();
  };

  return (
    <div>
      <form>
        Title : <input type='text' id='inputTitle'/>
        Type :
        <select>
          <option>Select</option>
          <option>Resume</option>
          <option>Business Card</option>
          <option>Portfolio</option>
        </select>
        <br />
        <input type='file' onChange={onLoadFile} />
        Preview : (화면에 마우스를 올리면, 하단에 Preview Navigation 나타납니다. )<br/>
        <PdfPreviewer url={url} />
        <br/>
        <br/>
        <br/>
        <button className='btn2 btnHover' onClick={onSubmit}>Submit</button><button className='btn2 btnHover'>Cancel</button>
      </form>
    </div>
  );
};

export default UploadArchiveForm;