import React from 'react';
import styled from 'styled-components';

const StyledInput= styled.input`
  margin: 0rem 0rem 1.5rem 0rem;
  border-radius: 3rem;
  padding: 1rem 2rem;
  border: none;
  width: 10rem;
  font-family: Cormorant;
  font-size: 0.9rem;
  font-weight: semi-bold;
  font-family:Anton;
`;

function Input(props){
    
    return (
    <div>
      <StyledInput type={props.type} placeholder={props.name} onChange={props.onChange}></StyledInput>
  
    </div>
    )    
  }

  export default Input;