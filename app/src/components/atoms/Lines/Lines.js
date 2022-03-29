import styled from 'styled-components';

export const OrangeLine = styled.hr`
  background: linear-gradient(
    90deg,
    rgba(227, 115, 60, 1) 0%,
    rgba(227, 115, 60, 1) 45%,
    rgba(29, 30, 34, 1) 100%
  );
  border: none;
  border-radius: 5px;
  height: 3px;
  width: 100%;
  opacity: 0.5;
`;

export const WhiteLine = styled.hr`
  border: 1px solid var(--white);
  width: 100%;
  opacity: 0.5;
  margin: 1px;
`;
