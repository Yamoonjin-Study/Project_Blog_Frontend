import React from 'react';
import { Route } from 'react-router-dom';
import Archives from '../components/Contents/Archive/Archives';
import UploadArchiveForm from '../components/Contents/Archive/UploadArchiveForm';

const ArchivePage = () => {
  const blog_name = window.location.pathname.split('/').at(3);
  return (
    <div className='showBlogContent'>
      <Route path={'/yamoonjin.com/blog/'+blog_name+'/archive/list'} exact={true} component={Archives}></Route>
      <Route path={'/yamoonjin.com/blog/'+blog_name+'/archive/upload'} exact={true} component={UploadArchiveForm}></Route>
    </div>
  );
};

export default ArchivePage;