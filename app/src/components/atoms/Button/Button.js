import styled from 'styled-components';

export const Button = styled.button`
  background-color: var(--contrast);
  border-radius: 40px;
  max-width: 225px;
  min-height: 45px;
  margin-top: 20px;
  border: none;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: 0.18s ease-out;
  margin: 15px 0;
  padding: 1rem;
  margin-right: 20px;

  &:hover {
    background-color: var(--contrastDarker);
  }
`;
