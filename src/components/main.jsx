import React from 'react';
import '../App.css';
import DownloadApp from './atom/DownloadApp';
import MessageBox from './box/MessageBox';

function Main(){

    return (
      <div className='Main'>
          <MessageBox></MessageBox>
          <DownloadApp>DOWNLOAD APP!</DownloadApp>
      </div>
    )
};

export default Main;