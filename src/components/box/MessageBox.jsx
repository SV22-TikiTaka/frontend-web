import React, {useState} from 'react';
import styled from 'styled-components';
import SendButton from '../atom/SendButton';
import TextArea from '../atom/TextArea';

const StyledContainer = styled.div`
    margin: 6rem auto;
    background-color: white;
    border-radius: 1.5rem;
    width: 24rem;
`;

const StyledHeader = styled.div`
    background-color: var(--main-pink);
    height: 6rem;
    border-radius: 1.5rem 1.5rem 0rem 0rem;
`;



function MessageBox(){
    const [input, setInput] = useState({
        message :''
    })
    return(
        <StyledContainer>
            <StyledHeader></StyledHeader>
            <TextArea name="LET ME KNOW WHAT YOU THINK..." type="text" onChange={(e) => setInput({...input,"message":e.target.value})}></TextArea>

            <SendButton>SEND!</SendButton>
        </StyledContainer>
    )
    }

export default MessageBox;
