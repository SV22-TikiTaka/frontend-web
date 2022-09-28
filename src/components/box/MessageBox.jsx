import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import SendButton from "../atom/SendButton";
import TextArea from "../atom/TextArea";
import { motion, AnimatePresence } from "framer-motion";
import AudioRecord from "../audio/AudioRecord";
import axios from "axios";
const StyledContainer = styled(motion.div)`
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 1.5rem;
  width: 24rem;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.25);
  position: absolute;
  left: 50%;
  margin-left: -12rem;
  top: 50px;
`;

const StyledHeader = styled(motion.div)`
  display: flex;
  flex-direction: row;
  background-color: white;
  height: 6rem;
  border-radius: 1.5rem 1.5rem 0rem 0rem;
  justify-content: center;
  align-items: center;
`;

const InfoContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 6;
  margin-left: 1.5rem;
  margin-top: 0.5rem;
`;

const StyledInfo = styled(motion.div)`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Buttons = styled.div`
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: transparent;
  border: none;
  & button {
    width: 100px;
    background-color: #ff7979;
    font-size: 18px;
    font-weight: 700;
    height: 50px;
    border: none;
    border-radius: 15px;
    padding: 15px 15px;
    margin: 15px;
    cursor: pointer;
    box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.25);
    :hover {
      scale: 1.05;
      opacity: 0.8;
    }
  }
`;

const container = {
  invisible: (isBack) => ({
    y: 100,
    opacity: 0,
    scale: 0.8,
  }),
  visible: {
    y: 100,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.6,
    },
  },
  exit: (isBack) => ({
    y: 100,
    opacity: 0,
    scale: 0.8,
    transition: { type: "spring", duration: 0.6 },
  }),
};

const sendTextCommentUrl = process.env.REACT_APP_API_URL + "comments/text";

function MessageBox() {
  const [input, setInput] = useState('');
  const [currentFocus, setCurrentFocus] = useState("코멘트");
  const audioRef = useRef();
  const question_id = useRef();
  const [visible, setVisible] = useState(0); // 0: 코멘트 1: 음성

  useEffect(() => {
    question_id.current = 2;
  },[])

  const goComment = () => {
    setVisible(0);
    setCurrentFocus("코멘트");
    setInput('');
  };
  const goSound = () => {
    setVisible(1);
    setCurrentFocus("음성");
  };

  const sendTextButtonClick = () => {
    if (input === '') {
      alert("내용을 적어주세요!");
      return;
    }
    const data = {
      "content": input,
      "question_id": question_id.current
    }
    console.log(data);
    axios
      .post(sendTextCommentUrl, data)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  };

  const sendSoundButtonClick = () => {
    audioRef.current.postSoundFileToBack();
  };

  return (
    <>
      <AnimatePresence mode={"wait"}>
        {visible === 0 ? (
          <StyledContainer
            variants={container}
            initial="invisible"
            animate="visible"
            exit="exit"
            key={visible}
          >
            <StyledHeader>
              <img
                style={{
                  marginLeft: "2rem",
                  width: "3.8rem",
                  height: "3.8rem",
                  flex: "1",
                }}
                src={process.env.PUBLIC_URL + "/logo192.png"}
                alt="logo"
              />
              <InfoContainer>
                <StyledInfo>@tikitaka</StyledInfo>
                <StyledInfo>The question goes here.</StyledInfo>
              </InfoContainer>
            </StyledHeader>
            <TextArea
              name="LET ME KNOW WHAT YOU THINK..."
              type="text"
              onChange={(e) => setInput(e.target.value)}
            ></TextArea>

            <SendButton
              sendButtonClick={()=>{sendTextButtonClick()}}
            >
              SEND!
            </SendButton>
          </StyledContainer>
        ) : (
          <StyledContainer
            variants={container}
            initial="invisible"
            animate="visible"
            exit="exit"
            key={visible}
          >
            <StyledHeader>
              <img
                style={{
                  marginLeft: "2rem",
                  width: "3.8rem",
                  height: "3.8rem",
                  flex: "1",
                }}
                src={process.env.PUBLIC_URL + "/logo192.png"}
                alt="logo"
              />
              <InfoContainer>
                <StyledInfo>@tikitaka</StyledInfo>
                <StyledInfo>The question goes here.</StyledInfo>
              </InfoContainer>
            </StyledHeader>
            <AudioRecord ref={audioRef} question_id={question_id.current} />

            <SendButton sendButtonClick={() => { sendSoundButtonClick() }} >
              SEND!
            </SendButton>
          </StyledContainer>
        )}
      </AnimatePresence>
      <Buttons>
        <button
          style={{ color: currentFocus === "코멘트" ? "yellow" : "white" }}
          onClick={goComment}
        >
          코멘트
        </button>
        <button
          style={{ color: currentFocus === "음성" ? "yellow" : "white" }}
          onClick={goSound}
        >
          음성
        </button>
      </Buttons>
    </>
  );
}

export default MessageBox;
