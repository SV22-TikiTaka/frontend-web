import React, {useState} from 'react';
import styled from 'styled-components';
import SendButton from '../atom/SendButton';
import TextArea from '../atom/TextArea';

const StyledContainer = styled.div`
    margin: 6rem auto;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 1.5rem;
    width: 24rem;
    box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.25);

`;

const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    background-color: white;
    height: 6rem;
    border-radius: 1.5rem 1.5rem 0rem 0rem;
    justify-content: center;
    align-items: center;
`;



const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 6;
    margin-left: 1.5rem;
    margin-top: 0.5rem;
    
    
`;

const StyledInfo = styled.div`
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
`;


function MessageBox(){
    const [input, setInput] = useState({
        message :''
    })
    return(
        <StyledContainer>
            <StyledHeader>
                <img style={{ marginLeft:"2rem",width:"3.8rem" ,height:"3.8rem", flex:"1"}} src = {process.env.PUBLIC_URL + "/logo192.png"} alt = 'logo'/>
                <InfoContainer>
                    <StyledInfo>@tikitaka</StyledInfo>
                    <StyledInfo>The question goes here.</StyledInfo>
                </InfoContainer>
            </StyledHeader>
            <TextArea name="LET ME KNOW WHAT YOU THINK..." type="text" onChange={(e) => setInput({...input,"message":e.target.value})}></TextArea>

            <SendButton>SEND!</SendButton>
        </StyledContainer>
    )
    }

export default MessageBox;
