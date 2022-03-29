import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h4 {
    letter-spacing: 0.15rem;
  }
`;

export const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: 10px;
`;

export const Title = styled.h4`
  padding: 1rem 0 0 0;
  align-self: center;
  text-align: center;
  text-transform: uppercase;
`;
