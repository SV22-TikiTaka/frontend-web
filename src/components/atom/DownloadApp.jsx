import React from "react";
import styled from "styled-components";

const StyledDownload = styled.button`
  width: 12rem;
  height: 3rem;
  margin: 3rem 1rem;
  padding: 1rem auto;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: transparent;
  border-color: black;
  color: black;
  font-size: 1rem;
  border-radius: 1.1rem;
  font-family: "Anton";
  position: fixed;
  bottom: 100px;
  left: 50%;
  margin-left: -6rem;
`;

function DownloadApp({ disabled, children }) {
  return <StyledDownload disabled={disabled}>{children}</StyledDownload>;
}

export default DownloadApp;
