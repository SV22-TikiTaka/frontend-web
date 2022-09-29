import React from "react";
import styled, { keyframes } from "styled-components";
import DownloadApp from "../components/atom/DownloadApp";
const Main = () => {
  //   cons Fadeout = keyframes`
  //   0% {
  //     opacity: 0;
  //   }
  //   100% {
  //     opacity: 1;
  //   }
  // `;

  const View = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const InformNav = styled.div`
    width: 100%;
    background-color: red;
    position: fixed;
    top: 0;
  `;
  const CenterBox = styled.div`
    display: flex;
    width: 50%;
  `;
  const ImgBox = styled.div`
    height: 700px;

    & img {
      width: 300px;
      height: 600px;
    }
  `;
  const IntroduceBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & h1 {
      margin-bottom: 200px;
    }
  `;
  const BottomBox = styled.div`
    position: fixed;
    height: 100px;
    width: 1000px;
    bottom: 50px;
  `;
  return (
    <View>
      <InformNav>
        <span>답변이 정상적으로 전달되었습니다!</span>
      </InformNav>
      <CenterBox>
        <ImgBox>
          <img src="img/splash.png"></img>
        </ImgBox>
        <IntroduceBox>
          <h1>
            당신의 비밀을 알려주세요 <br />
            아무도 모르게🤫
          </h1>
          <DownloadApp>DOWNLOAD APP!</DownloadApp>
        </IntroduceBox>
      </CenterBox>
      <BottomBox>
        <span>여기가 팀원 깃 사진이나 정보 들어가는곳</span>
      </BottomBox>
    </View>
  );
};

export default Main;
