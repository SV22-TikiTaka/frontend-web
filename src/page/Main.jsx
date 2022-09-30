import React from "react";
import styled, { keyframes } from "styled-components";
import DownloadApp from "../components/atom/DownloadApp";
const Main = () => {
  const Fadeout = keyframes`
    0% {
    transform: translateX(-300px);
    opacity: 0.1;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  `;
  const FadeoutRight = keyframes`
  0% {
    transform: translateX(300px);
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  `;
  const View = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const InformNav = styled.div`
    width: 100%;
    height: 60px;
    color: whitesmoke;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ff6347;
    font-size: 22px;
    //#FF6347
    position: fixed;
    top: 0;
  `;
  const CenterBox = styled.div`
    display: flex;
    width: 65%;
  `;
  const ImgBox = styled.div`
    height: 700px;
    perspective: 800px;
    margin-right: 70px;
    display: flex;
    opacity: 0;
    animation: ${Fadeout} 1.5s forwards;
    & img {
      width: 300px;
      height: 600px;
      transform: rotateY(10deg);
    }
    & img:last-child {
      width: 300px;
      height: 600px;
      transform: rotateY(-10deg);
    }
  `;
  const IntroduceBox = styled.div`
    animation: ${FadeoutRight} 3s 1s forwards;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;

    & h1 {
      font-size: 48px;
      margin-bottom: 200px;
    }
  `;
  const BottomBox = styled.div`
    position: fixed;
    height: 100px;
    bottom: 150px;
  `;
  const UserImg = styled.div`
    height: 50px;
    width: 50px;
    background-image: url("https://github.com/yjshin229");
  `;
  return (
    <View>
      <InformNav>
        <span>답변이 정상적으로 전달되었습니다!</span>
      </InformNav>
      <CenterBox>
        <ImgBox>
          <img src="img/splash.png"></img>
          <img src="img/setting.png"></img>
        </ImgBox>
        <IntroduceBox>
          <h1>
            당신의 비밀을 알려주세요 <br />
            아무도 모르게🤫
          </h1>
          <DownloadApp>DOWNLOAD APP!</DownloadApp>
        </IntroduceBox>
      </CenterBox>
      <BottomBox></BottomBox>
    </View>
  );
};

export default Main;
