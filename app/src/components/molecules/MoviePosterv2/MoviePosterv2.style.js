import styled from 'styled-components';
import { IoMdStar } from 'react-icons/io';

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
  border-radius: 15px;
  position: relative;
`;

export const Figure = styled.figure`
  margin: 0;
  position: relative;
  cursor: pointer;
`;

export const Figcaption = styled.figcaption`
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 0;
  height: 35%;
  /* background: blue; */
  overflow: hidden;
  border-radius: 5px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: 100% auto;
    filter: blur(0.5rem);
    background-image: url(${({ posterImage }) => posterImage});
    transform: scale(1.1);
  }
`;

export const FigInfo = styled.div`
  position: relative;
  top: 0.5rem;
  align-self: center;
  width: 100%;
  margin: 0 1rem;
`;

export const Paragraph = styled.p`
  margin: 0;
  padding: 0;
`;

export const Year = styled(Paragraph)`
  color: var(--golden);
  font-size: 0.8rem;

  @media (max-width: 1182px) {
    font-size: 1rem;
  }
`;

export const Title = styled(Paragraph)`
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.02rem;
  @media (max-width: 1182px) {
    font-size: 1.4rem;
    letter-spacing: 0.05rem;
  }
  text-transform: uppercase;
`;

export const Rate = styled(Year)`
  margin: 0.2rem 0;
  font-size: 0.9rem;
  @media (max-width: 1182px) {
    font-size: 1rem;
  }
`;

export const Genre = styled(Paragraph)`
  opacity: 0.35;
  @media (max-width: 1182px) {
    font-size: 1rem;
  }
`;

export const StarIcon = styled(IoMdStar)`
  position: absolute;
  top: 10px;
  right: 5px;
  z-index: 1;
  font-size: 2.5rem;
  color: var(--golden);
  opacity: ${({ isfavourite }) => (isfavourite === 'true' ? 1 : 0.6)};
  transition: opacity, scale 0.15s ease-in-out;
  &:hover {
    opacity: 1;
    scale: 1.1;
  }
`;
