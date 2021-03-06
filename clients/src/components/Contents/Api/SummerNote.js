import React from 'react';
import ReactSummernote from 'react-summernote';
import $ from 'jquery';
import 'react-summernote/dist/react-summernote.css';
import 'react-summernote/lang/summernote-ko-KR';
import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/dist/css/bootstrap.css';

const SummerNote = () => {

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

  return (
    <div>
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
          fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22',
            '24', '28', '30', '36', '50', '72'],
        }}
        onChange={onContentChange}
        onImageUpload={onImageUpload}
      />
    </div>
  );
};

export default SummerNote;