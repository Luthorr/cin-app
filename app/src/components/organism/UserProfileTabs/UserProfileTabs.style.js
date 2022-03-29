import styled from 'styled-components';
import { RectButton } from '../../atoms/Button/RectButton';

export const Heading = styled.h1`
  font-size: 1.5rem;
`;

export const Wrapper = styled.div`
  max-width: 100%;
`;

export const Content = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const Label = styled.p`
  font-weight: 500;
`;

export const Value = styled.p`
  font-style: italic;
  font-size: 0.8rem;
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
`;

export const ImportantText = styled.span`
  color: var(--contrast);
  font-size: 0.7rem;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.4rem;
  padding: 1rem 0;
`;

export const Text = styled.p`
  font-size: 0.8rem;
  opacity: 0.7;
`;

export const ConfirmButton = styled(RectButton)`
  width: 125px;
  height: 50px;
`;
