import React from "react";
import styled from "styled-components";

const StyledDownload = styled.button`
  width: 20rem;
  height: 7rem;
  padding: 1rem auto;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: transparent;
  border-color: black;
  color: white;
  font-size: 2rem;
  border: 6px solid black;
  background-color: black;
  position: relative;
  left: -16px;
  top: -50px;

  border-radius: 1.1rem;
  font-family: SBAggro;
  :hover {
    transform: scale(1.03);
  }
  @media screen and (max-width: 768px) {
    margin-left: 50px;
    width: 15rem;
    height: 4rem;
    font-size: 1.2rem;
  }
`;

function DownloadApp({ disabled, children }) {
  return (
    <StyledDownload
      onClick={() => alert("아직 준비중입니다...")}
      disabled={disabled}
    >
      {children}
    </StyledDownload>
  );
}

export default DownloadApp;
