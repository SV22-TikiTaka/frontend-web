import React, {useState} from 'react';
import styled from 'styled-components';
import SendButton from '../atom/SendButton';
import Input from '../atom/Input';

const StyledBox = styled.div`
  margin: 3rem auto;
  background-color: white;
  border-radius: 1.5rem;
  padding-top: 2.5rem;
  padding-bottom: 1.5rem;
  width: 24rem;
  height: 15rem;
  
`;

const StyledHeader = styled.div`
    display: flex;
    background:white;

`;



function MessageBox(){
    const [input, setInput] = useState({
        message :''
    })
    return(
        <StyledBox>
        <Input name="LET ME KNOW WHAT YOU THINK..." type="text" onChange={(e) => setInput({...input,"message":e.target.value})}></Input>

        <SendButton>SEND!</SendButton>
        </StyledBox>
    )
    }

export default MessageBox;
