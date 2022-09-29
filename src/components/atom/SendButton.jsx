import React from "react";
import styled from "styled-components";

const StyledSend = styled.button`
  width: 4rem;
  height: 3rem;
  margin: 0.5rem 1rem 1rem 18rem;
  padding: 1rem auto;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: black;
  border: none;
  color: white;
  font-weight: semi-bold;
  font-size: 0.9rem;
  border-radius: 1.2rem;
  font-family: SBAggro;
  &: hover {
    scale: 1.05;
    opacity: 0.8;
  }
`;

function SendButton({ sendButtonClick, disabled, children }) {
  return <StyledSend onClick={sendButtonClick} disabled={disabled}>{children}</StyledSend>;
}

export default SendButton;
