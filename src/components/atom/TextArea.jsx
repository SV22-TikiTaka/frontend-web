import React from 'react';
import styled from 'styled-components';

const StyledInput= styled.textarea`
  margin: 1rem 0rem 0rem 0rem;
  border-radius: 1rem;
  padding: 1rem 1rem 1rem 1rem;
  border: none;
  width: 19rem;
  height: 6rem;
  font-family: Cormorant;
  font-size: 0.9rem;
  font-weight: semi-bold;
  font-family:Anton;
  resize: none;
`;

function TextArea(props){
    
    return (
    <div>
      <StyledInput type={props.type} placeholder={props.name} onChange={props.onChange}></StyledInput>
  
    </div>
    )    
  }

  export default TextArea;