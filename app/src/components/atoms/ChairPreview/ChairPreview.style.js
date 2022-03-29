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
  visibility: ${({ chairState }) => chairState === 'disabled' && 'hidden'};
  flex-direction: column;
  row-gap: 0.15rem;
  ${UpperChair}, ${LowerChair} {
    background-color: ${({ chairState }) => {
      switch (chairState) {
        case 'selected':
          return '#71e6bf';
        case 'reserved':
          return '#fd6565';
        case 'available':
          return '#3b3e46';
        default:
          return '#3b3e46';
      }
    }};
  } ;
`;
