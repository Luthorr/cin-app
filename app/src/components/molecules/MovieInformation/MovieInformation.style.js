import styled from 'styled-components';
import { FaRegClock, FaStar } from 'react-icons/fa';
import { Button } from '../../atoms/Button/Button';

export const Content = styled.div`
  position: absolute;
  bottom: 0px;
  display: grid;
  max-width: var(--maxWidth);
  grid-template-columns: 1fr 3fr;
  padding: 0 2rem;
  margin: 0 auto;
  column-gap: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    align-items: center;
    justify-content: center;
    margin: 6rem 0;
  }
`;

export const Poster = styled.img`
  margin-left: 10px;
  max-width: 100%;
  min-width: 300px;
  min-height: 500px;
  object-fit: fill;
  border-radius: 0.75rem 0.75rem 0 0;
  margin-left: auto;
  @media (max-width: 768px) {
    display: none;
  }
  filter: contrast(110%);
`;

export const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;

  h1 {
    font-size: 3rem;
    font-weight: 1000;
    margin: 0;
  }

  h4 {
    margin: 10px 0;
  }
  margin-right: 200px;
  @media (max-width: 768px) {
    margin: auto;
    width: 80%;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 3.5rem;
    }
  }
`;

export const AdditionalInformations = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 1rem;
  padding: 0.5rem 0;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
  }
`;

export const Clock = styled(FaRegClock)`
  font-size: 20px;
`;

export const Star = styled(FaStar)`
  font-size: 20px;
`;

export const Title = styled.h1`
  font-family: 'Oswald', sans-serif;
`;

export const ShowMoreButton = styled(Button)`
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0.5rem;
`;
