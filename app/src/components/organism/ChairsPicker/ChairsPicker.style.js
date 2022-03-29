import styled from 'styled-components';

export const Legend = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 3.5rem;
  row-gap: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  margin-top: 2.5rem;
`;

export const LegendElement = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 0.6rem;
  align-items: center;
  justify-content: center;
`;

export const LegendText = styled.p`
  opacity: 0.4;
`;

export const Screen = styled.div`
  display: flex;
  align-self: center;
  justify-self: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  margin: 2rem 0 3rem 0;
  border-color: #fd6565 transparent transparent transparent;
  border-radius: 50%/100px 100px 0 0;
  box-shadow: 0px -11px 8px #888;
  user-select: none;
`;

export const ScreenText = styled.p`
  opacity: 0.3;
`;
