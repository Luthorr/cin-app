import styled from 'styled-components';
// aktywnie kliknięte #71e6bf // zarezerowane #fd6565 // dostępne #3b3e46

export const UpperChair = styled.div`
  background-color: #71e6bf;
  padding: 0.5rem 0.7rem;
  border-radius: 5px;
`;
export const LowerChair = styled.div`
  background-color: #71e6bf;
  padding: 0.2rem;
  border-radius: 5px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.15rem;
  cursor: pointer;
  ${UpperChair}, ${LowerChair} {
    background-color: ${({ disabled }) => (disabled ? '#fd6565' : '#3b3e46')};
  }
`;
