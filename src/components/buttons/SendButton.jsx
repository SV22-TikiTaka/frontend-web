import React from 'react';
import styled from 'styled-components';

const StyledSend = styled.button`
    width: 5rem;
    height: 3rem;
    margin: 10rem auto;
    padding: 1rem 1rem 1rem;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    background-color: black;
    border: none;
    color: white;
    font-size: 1rem;
    border-radius: 1rem;
`;

function SendButton  ({disabled,children}){
    return <StyledSend disabled={disabled}>{children}
    </StyledSend>;
  }
  
export default SendButton;