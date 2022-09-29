import React, { useState, useImperativeHandle, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiFillAudio, AiFillCaretRight } from "react-icons/ai";
import axios from 'axios';

const sendSoundCommentUrl = process.env.REACT_APP_API_URL + "comments/voice";

function AudioRecord({question_id}, ref) {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  
  const Button = styled.button`
    padding: 10px 20px;
    border-radius: 15px;
    border: none;
    margin-right: 15px;
    margin-top: 30px;
    padding: 1rem auto;
    background-color: transparent;
    color: black;
    font-size: 1.3rem;
    border-radius: 1.2rem;
    font-weight:"600"
    font-family: SBAggro;
    &:hover {
      scale: 1.2;
    }
    & span {
      display: flex;
      align-items: center;
      font-family: SBAggro;
    }
  `;
  const onRecAudio = () => {
    setDisabled(true); // 😀😀😀

    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지 했을 때
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();

    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();

    if (audioUrl) {
      URL.createObjectURL(audioUrl); // 출력된 링크에서 녹음된 오디오 확인 가능
    }

    // 😀😀😀
    setDisabled(false);
  };

  const play = () => {
    if (!audioUrl) {
      alert("녹음한 음성이 없습니다!");
      return;
    }
    const audio = new Audio(URL.createObjectURL(audioUrl)); // 여기에서 출력된 링크에서 녹음된 오디오 확인가능
    audio.loop = false;
    audio.volume = 1;
    audio.play();
    console.log(audio); //이걸 서버로 보내면 될꺼같은데,,
  };

  function postSoundFileToBack() {
    if (!audioUrl) {
      alert("녹음한 음성이 없습니다!");
      return;
    }
    const formData = new FormData();
    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl], "soundBlob", {
      lastModified: new Date().getTime(),
      type: "audio/webm",
    });
    formData.append('file', sound);
    formData.append('question_id', question_id);
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'multipart/form-data',
    };
    axios
      .post(sendSoundCommentUrl, formData, headers)
      .then(() => {
        alert("전송완료!");
        navigate('/');//메인페이지로 이동
      })
      .catch(error => console.log(error));
  }

  // 부모 컴포넌트에서 아래 함수들을 참조할수있음
  useImperativeHandle(ref, () => ({
    postSoundFileToBack: () => postSoundFileToBack(),
  }));
  
  // 😀😀😀
  return (
    <>
      <Button onClick={onRec ? onRecAudio : offRecAudio}>
        <AiFillAudio size={25} />
        <span>녹음하기</span>
      </Button>
      <Button onClick={play} disabled={disabled}>
        <AiFillCaretRight size={25} />
        <span>재생하기</span>
      </Button>
    </>
  );
}


export default forwardRef(AudioRecord);
