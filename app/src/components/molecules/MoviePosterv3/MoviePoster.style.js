import styled from 'styled-components';
import { IoMdStar } from 'react-icons/io';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  flex-direction: column;
  justify-self: center;
  cursor: pointer;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
  min-height: 360px;
  @media (max-width: 586px) {
    min-height: 550px;
  }
`;

export const Info = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 3;
  color: white;
  opacity: 0;
  transform: translateY(30px);
  transition: 0.5s;
  width: 100%;
  height: 100%;
  min-height: 360px;
  @media (max-width: 586px) {
    min-height: 550px;
  }

  p {
    letter-spacing: 1px;
    font-size: 15px;
    margin-top: 8px;
  }
`;

export const Card = styled.div`
  position: relative;
  width: 100%;
  border-radius: 15px;
  padding: 2.5rem 1rem;
  padding-right: 0;
  display: flex;
  align-items: flex-end;
  transition: 0.4s ease-out;
  box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.5);
  &:hover {
    &:before {
      opacity: 1;
    }
    ${Info} {
      opacity: 1;
    }
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.77);
    z-index: 2;
    transition: 0.25s;
    opacity: 0;
  }
`;

export const Title = styled.h3`
  color: var(--white);
  text-align: center;
  margin-top: 0.5rem;
  text-transform: uppercase;
`;

export const StarIcon = styled(IoMdStar)`
  position: absolute;
  top: -55px;
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
