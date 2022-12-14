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
    setDisabled(true); // πππ

    // μμμ λ³΄λ₯Ό λ΄μ λΈλλ₯Ό μμ±νκ±°λ μμμ μ€νλλ λμ½λ© μν€λ μΌμ νλ€
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // μλ°μ€ν¬λ¦½νΈλ₯Ό ν΅ν΄ μμμ μ§νμνμ μ§μ μ κ·Όμ μ¬μ©λλ€.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // λ΄ μ»΄ν¨ν°μ λ§μ΄ν¬λ λ€λ₯Έ μμ€λ₯Ό ν΅ν΄ λ°μν μ€λμ€ μ€νΈλ¦Όμ μ λ³΄λ₯Ό λ³΄μ¬μ€λ€.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      }
    // λ§μ΄ν¬ μ¬μ© κΆν νλ
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        // 3λΆ(180μ΄) μ§λλ©΄ μλμΌλ‘ μμ± μ μ₯ λ° λΉμ μ€μ§
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          // λ©μλκ° νΈμΆ λ λΈλ μ°κ²° ν΄μ 
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

  // μ¬μ©μκ° μμ± λΉμμ μ€μ§ νμ λ
  const offRecAudio = () => {
    // dataavailable μ΄λ²€νΈλ‘ Blob λ°μ΄ν°μ λν μλ΅μ λ°μ μ μμ
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    // λͺ¨λ  νΈλμμ stop()μ νΈμΆν΄ μ€λμ€ μ€νΈλ¦Όμ μ μ§
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // λ―Έλμ΄ μΊ‘μ² μ€μ§
    media.stop();

    // λ©μλκ° νΈμΆ λ λΈλ μ°κ²° ν΄μ 
    analyser.disconnect();
    source.disconnect();

    if (audioUrl) {
      URL.createObjectURL(audioUrl); // μΆλ ₯λ λ§ν¬μμ λΉμλ μ€λμ€ νμΈ κ°λ₯
    }

    // πππ
    setDisabled(false);
  };

  const play = () => {
    if (!audioUrl) {
      alert("λΉμν μμ±μ΄ μμ΅λλ€!");
      return;
    }
    const audio = new Audio(URL.createObjectURL(audioUrl)); // μ¬κΈ°μμ μΆλ ₯λ λ§ν¬μμ λΉμλ μ€λμ€ νμΈκ°λ₯
    audio.loop = false;
    audio.volume = 1;
    audio.play();
    console.log(audio); //μ΄κ±Έ μλ²λ‘ λ³΄λ΄λ©΄ λ κΊΌκ°μλ°,,
  };

  function postSoundFileToBack() {
    if (!audioUrl) {
      alert("λΉμν μμ±μ΄ μμ΅λλ€!");
      return;
    }
    const formData = new FormData();
    // File μμ±μλ₯Ό μ¬μ©ν΄ νμΌλ‘ λ³ν
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
        alert("μ μ‘μλ£!");
        navigate('/');//λ©μΈνμ΄μ§λ‘ μ΄λ
      })
      .catch(error => console.log(error));
  }

  // λΆλͺ¨ μ»΄ν¬λνΈμμ μλ ν¨μλ€μ μ°Έμ‘°ν μμμ
  useImperativeHandle(ref, () => ({
    postSoundFileToBack: () => postSoundFileToBack(),
  }));
  
  // πππ
  return (
    <>
      <Button onClick={onRec ? onRecAudio : offRecAudio}>
        <AiFillAudio size={25} />
        <span>λΉμνκΈ°</span>
      </Button>
      <Button onClick={play} disabled={disabled}>
        <AiFillCaretRight size={25} />
        <span>μ¬μνκΈ°</span>
      </Button>
    </>
  );
}


export default forwardRef(AudioRecord);
