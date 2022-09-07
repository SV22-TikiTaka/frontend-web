import React from 'react';
import '../../App.css';
import DownloadApp from '../atom/DownloadApp';
import MessageBox from '../box/MessageBox';

function Message(){

    return (
      <div className='Message'>
          <MessageBox></MessageBox>
          <DownloadApp>DOWNLOAD APP!</DownloadApp>
      </div>
    )
};

export default Message;