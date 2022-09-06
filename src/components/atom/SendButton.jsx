import React from 'react';
import styled from 'styled-components';

const StyledSend = styled.button`
    width: 4rem;
    height: 3rem;
    margin: 3rem 1rem;
    padding: 1rem auto;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    background-color: black;
    border: none;
    color: white;
    font-size: 1rem;
    border-radius: 1.2rem;
    font-family: 'Anton';
    }
`;

function SendButton  ({disabled,children}){
    return <StyledSend disabled={disabled}>{children}
    </StyledSend>;
  }
  
export default SendButton;