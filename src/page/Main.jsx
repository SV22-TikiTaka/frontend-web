import React from "react";
import styled, { keyframes } from "styled-components";
import DownloadApp from "../components/atom/DownloadApp";
const Main = () => {
  const animationNav = keyframes`
    0%{
      transform:translateY(-70px);
    }
    30%{
      transform:translateY(0px);
    }
    70%{
      transform:translateY(0px);
    }
    100%{
      transform:translateY(-70px);
    }
  `;
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
    opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  `;
  const gitAnimation = keyframes`
   0%{
     transform:translateY(-5px);
   }
   25%{
     transform:translateY(0px);
   }
   50%{
     transform:translateY(-15px);
   }
   100%{
     transform:translateY(0px);
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
    animation: ${animationNav} 5s forwards;
    //#FF6347
    position: fixed;
    top: 0;
  `;
  const CenterBox = styled.div`
    display: flex;
    width: 65%;
    @media screen and (max-width: 1024px) {
      flex-direction: column;
      margin: 0 auto;
      width: 50%;
    }
  `;
  const ImgBox = styled.div`
    height: 500px;
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
    @media screen and (max-width: 1024px) {
      height: 300x;
      margin-left: 30px;
      align-items: center;
      & img {
        width: 150px;
        height: 300px;
        transform: rotateY(10deg);
      }
      & img:last-child {
        width: 150px;
        height: 300px;
        transform: rotateY(-10deg);
      }
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
    @media screen and (max-width: 768px) {
      & h1 {
        margin-left: 40px;
        font-size: 24px;
        width: 700px;
        margin-bottom: 100px;
      }
    }
    @media screen and (max-width: 1024px) {
    }
  `;
  const BottomBox = styled.div`
    position: fixed;
    height: 100px;
    bottom: 150px;
  `;
  const GitLink = styled.div`
    position: fixed;
    animation: ${gitAnimation} 2s infinite alternate;
    bottom: 35px;
    left: 35px;
    color: black;
    text-decoration: none;
    :hover {
      color: red;
    }
    & img {
      width: 60px;
      height: 60px;
      margin-bottom: 10px;
    }
    & span {
      display: block;
    }
    @media screen and (max-width: 768px) {
      font-size: 8px;
      bottom: 8px;
      left: 8px;
      & img {
        width: 25px;
        height: 25px;
      }
    }
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
          <DownloadApp onClick={() => alert("준비중 입니다...")}>
            DOWNLOAD APP!
          </DownloadApp>
        </IntroduceBox>
      </CenterBox>
      <GitLink as="a" href="https://github.com/SV22-TikiTaka">
        <img src="img/git.png" />
        <span>깃 주소는 여기 !</span>
      </GitLink>
    </View>
  );
};

export default Main;
