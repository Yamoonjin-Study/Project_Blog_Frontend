import React, { useEffect, useState } from 'react';

// imports for summernote
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';
import 'react-summernote/lang/summernote-ko-KR';
import 'bootstrap/js//modal';
import 'bootstrap/js//dropdown';
import 'bootstrap/js//tooltip';
import 'bootstrap/dist/css/bootstrap.css';

const BoardUpdate = ({ match }) => {
  // console.log(match.params.id);
  const [board, setBoard] = useState({
    board:{}
  });
  useEffect(() => {
    fetch('http://localhost:8080/show-board/' + 1,{
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': sessionStorage.getItem('token'),
      },
    })
    .then(res => res.json())
    .then(res => {
      setBoard(res);
      console.log(board.board);
    });
  }, []);

  const onChange = (content) => {
    console.log('onChange ', content);
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
    <div className='container'>
      <ReactSummernote
        value="글을 작성해 주세요."
        options={{
          lang: 'ko-KR',
          height: 380,
          dialogsInBody: true,
          toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview']],
          ],
        }}
        onChange={onChange}
        onImageUpload={onImageUpload}
      />
    </div>
  );
};

export default BoardUpdate;