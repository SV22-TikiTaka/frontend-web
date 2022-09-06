import React from 'react';
import '../App.css';
import SendButton from './buttons/SendButton';
import DownloadApp from './buttons/DownloadApp';


function Main(){

    return (
      <div className='main'>
          TikiTaka
          <SendButton>SEND!</SendButton>
          <DownloadApp>DOWNLOAD APP!</DownloadApp>
      </div>
    )
};

export default Main;