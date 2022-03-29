import styled from 'styled-components';

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.4rem;
  padding: 1rem 0;
`;

export const Label = styled.p`
  font-weight: 500;
`;

export const Input = styled.input`
  background-color: var(--primaryLighter);
  border-radius: 2px;
  border: none;
  padding: 0.7rem;
  /* transition: all 0.1s ease-in-out; */
  color: var(--white);
  font-family: 'Work Sans', sans-serif;
  &:focus {
    outline: 1px solid rgba(255, 255, 255, 0.4);
  }
  max-width: 100%;
`;

export const ImportantText = styled.span`
  color: var(--contrast);
  font-size: 0.7rem;
`;

export const TextArea = styled.textarea`
  background-color: var(--primaryLighter);
  border-radius: 2px;
  border: none;
  padding: 0.7rem;
  /* transition: all 0.1s ease-in-out; */
  color: var(--white);
  font-family: 'Work Sans', sans-serif;
  &:focus {
    outline: 1px solid rgba(255, 255, 255, 0.4);
  }
`;

export const Select = styled.select`
  background-color: var(--primaryLighter);
  border-radius: 2px;
  border: none;
  padding: 0.7rem;
  /* transition: all 0.1s ease-in-out; */
  color: var(--white);
  font-family: 'Work Sans', sans-serif;
  &:focus {
    outline: 1px solid rgba(255, 255, 255, 0.4);
  }
`;

export const Option = styled.option``;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 0.5rem;
`;

export const ErrorText = styled.p`
  color: var(--contrast);
  font-size: 0.9rem;
`;
