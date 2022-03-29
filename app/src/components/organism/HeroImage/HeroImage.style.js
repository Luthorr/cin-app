import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  min-height: ${({ height }) => height}px;
  position: relative;
  background-color: var(--secondary);
  align-items: center;
  justify-content: center;
  animation: animateHeroImage 0.6s;
  @keyframes animateHeroImage {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const BGImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 0;
  margin: 0;
  opacity: 0.4;
  object-fit: cover;
  filter: contrast(130%);
  @media (max-width: 1240px) {
    object-fit: fill;
  }
`;
