import React, { useState, useRef, useEffect } from "react";
import {useParams, useNavigate} from 'react-router-dom';
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

const StyledOptionDiv = styled.div`
  background: transparent;
  border: none;
  margin-top: 10px;
  
  & button {
    width: 350px;
    background-color: #ff7979;
    font-size: 18px;
    font-weight: semi-bold;
    font-familly: SBAgrro;
    height: 50px;
    border: none;
    border-radius: 15px;
    padding: 15px 15px;
    margin: 10px;
    cursor: pointer;
    box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.25);
    color: white;
    :hover {
      scale: 1.05;
      opacity: 0.8;
    }
  }
`;

// const Buttons = styled.div`
//   top: 100px;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background: transparent;
//   border: none;
//   & button {
//     width: 100px;
//     background-color: #ff7979;
//     font-size: 18px;
//     font-weight: 700;
//     height: 50px;
//     border: none;
//     border-radius: 15px;
//     padding: 15px 15px;
//     margin: 15px;
//     cursor: pointer;
//     box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.25);
//     :hover {
//       scale: 1.05;
//       opacity: 0.8;
//     }
//   }
// `;

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
const getQuestionDataUrl = process.env.REACT_APP_API_URL + "questions/url/?question_id=";
const getVoteOptionsUrl = process.env.REACT_APP_API_URL + "questions/vote_options/?question_id=";
const getUserInfoUrl = process.env.REACT_APP_API_URL + "users/";
const updateVoteOptionUrl = process.env.REACT_APP_API_URL + "comments/vote/";

function MessageBox() {
  const [input, setInput] = useState('');
  const [username, setUsername] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [questionContent, setQuestionContent] = useState();
  const [voteOptions, setVoteOptions] = useState([]);
  // const [currentFocus, setCurrentFocus] = useState("코멘트");
  const [selectOption, setSelectOption] = useState();
  const audioRef = useRef();
  const question_id = useRef();
  const [visible, setVisible] = useState(); // 0: 코멘트 1: 음성 2: 투표
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    question_id.current = param.questionId;
    setQuestionData();
  },[])

  const goComment = () => {
    setVisible(0);
    // setCurrentFocus("코멘트");
    setInput('');
  };
  const goSound = () => {
    setVisible(1);
    // setCurrentFocus("음성");
  };
  const goVote = () => {
    setVisible(2);
  };

  const setQuestionData = () => {
    if (question_id.current === undefined) {
      return;
    }
    console.log(getQuestionDataUrl+question_id.current);
    axios
      .get(getQuestionDataUrl+question_id.current)
      .then(response => {
        // response.data.user_id 로 userName 확인
        const data = response.data;
        const commentType = data.comment_type;
        console.log(data);
        // if(data.expired)
        checkInstaId(data.user_id);
        if (commentType === "text") {
          goComment();
        }
        else if (commentType === "sound") {
          goSound();
        }
        else if (commentType === "vote") {
          settingOptions();
          goVote();
        }
        setQuestionContent(data.content);
      })
      .catch(() => {
        goToMainPage();
      });
  };

  function settingOptions() {
    axios
      .get(getVoteOptionsUrl+question_id.current)
      .then(response => {
        const options = response.data;
        const optionsData = [];
        options.map(element => {
          optionsData.push({ "id": element.id, "content": element.content })
        });
        setVoteOptions(optionsData);
      })
      .catch(() => {
        goToMainPage();
      })
  }

  // url의 username이 옳지 않으면 메인페이지로 이동
  function checkInstaId(user_id){
    axios
      .get(getUserInfoUrl+user_id)
      .then(response => {
        setUsername(response.data.username);
        setImgUrl(response.data.profile_image_url)
        if (response.data.insta_id !== param.insta_id) {
          goToMainPage();
        }
      })
      .catch(error => console.log(error));
  }

  function goToMainPage() {
    alert("잘못된 접근입니다.");
    navigate('/');//메인페이지로 이동
  }

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
      .then(() => {
        alert("전송완료!");
        navigate('/');//메인페이지로 이동
      })
      .catch(error => console.log(error));
  };

  const sendSoundButtonClick = () => {
    audioRef.current.postSoundFileToBack();
  };

  const sendVoteButtonClick = () => {
    if (selectOption === undefined) {
      alert("선택지를 골라주세요!");
      return;
    }
    updateVoteOptions(selectOption);
  };
  const updateVoteOptions = (vote_comment_id) => {
    axios
      .put(updateVoteOptionUrl+vote_comment_id)
      .then(() => {
        alert("전송완료!");
        navigate('/');//메인페이지로 이동
      })
      .catch(error => console.log(error));
  }
  

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
                src={imgUrl}
                alt="img"
              />
              <InfoContainer>
                <StyledInfo>{username}</StyledInfo>
                <StyledInfo>{questionContent}</StyledInfo>
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
        ) : visible === 1 ? (
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
                src={imgUrl}
                alt="img"
              />
              <InfoContainer>
                  <StyledInfo>{username}</StyledInfo>
                  <StyledInfo>{questionContent}</StyledInfo>
              </InfoContainer>
            </StyledHeader>
            <AudioRecord ref={audioRef} question_id={question_id.current} />

            <SendButton sendButtonClick={() => { sendSoundButtonClick() }} >
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
                  src={imgUrl}
                  alt="img"
                />
                <InfoContainer>
                  <StyledInfo>{username}</StyledInfo>
                  <StyledInfo>{questionContent}</StyledInfo>
                </InfoContainer>
              </StyledHeader>
                <StyledOptionDiv>
                  {voteOptions.map((element) => (
                    <button
                      style={{ 'background-color': selectOption === element.id ? '#779874' : "#FF8F8F" }}
                      onClick={() => { setSelectOption(element.id) }}
                      key={element.id}
                    >
                      {element.content}
                    </button>
                  ))}
              </StyledOptionDiv>
              <SendButton sendButtonClick={() => { sendVoteButtonClick() }} >
                SEND!
              </SendButton>
            </StyledContainer>
        )}
      </AnimatePresence>
      {/* <Buttons>
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
      </Buttons> */}
    </>
  );
}

export default MessageBox;
