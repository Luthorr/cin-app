import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';

export const BlogImage = styled.img`
  border-radius: 5px 0 0 5px;
  max-width: 100%;
  height: 100%;
  filter: brightness(80%);
  transition: all 0.25s ease-in-out;
`;

export const Container = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    ${BlogImage} {
      filter: brightness(100%);
    }
  }
  border-radius: 5px;
  @media (max-width: 45rem) {
    flex-direction: column;
  }
`;

export const ImageContainer = styled.div`
  flex: 0 1 35%;
  min-width: 35%;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex: 0 1 60%;
  flex-direction: column;
  padding: 1rem 0.5rem;
`;

export const NewsHeading = styled.h3`
  text-transform: uppercase;
  font-family: 'Oswald', sans-serif;
`;

export const NewsDate = styled.p`
  opacity: 0.6;
  font-size: 0.8rem;
  font-family: 'Oswald', sans-serif;
`;

export const NewsShortenedInfo = styled.div`
  margin: 1rem 0;
  opacity: 0.7;
`;

export const LearnMore = styled.p`
  color: var(--contrast);
`;

export const ArrowIcon = styled(FaArrowRight)`
  vertical-align: middle;
  font-size: 1.2rem;
`;
