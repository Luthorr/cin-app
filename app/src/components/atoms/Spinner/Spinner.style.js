import styled from 'styled-components';

export const SpinnerContainer = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  left: 50%;
  top: 50%;
  margin: 2rem 0;
  transform: translate(-50%, -50%);
  animation: chase infinite linear both;

  @keyframes chase {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const SpinnerDot = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: chase-dot 2s infinite ease-in-out both;

  &:before {
    content: '';
    display: block;
    width: 25%;
    height: 25%;
    background-color: #fff;
    border-radius: 100%;
    animation: chase-dot-before 2s infinite ease-in-out both;
  }

  @keyframes chase-dot {
    80%,
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes chase-dot-before {
    50% {
      transform: scale(0.4);
    }
    100%,
    0% {
      transform: scale(1);
    }
  }

  &:nth-child(1) {
    animation-delay: -1.1s;
  }

  &:nth-child(2) {
    animation-delay: -1s;
  }

  &:nth-child(3) {
    animation-delay: -0.9s;
  }

  &:nth-child(4) {
    animation-delay: -0.8s;
  }

  &:nth-child(5) {
    animation-delay: -0.7s;
  }

  &:nth-child(6) {
    animation-delay: -0.6s;
  }

  &:nth-child(1):before {
    animation-delay: -1.1s;
  }

  &:nth-child(2):before {
    animation-delay: -1s;
  }

  &:nth-child(3):before {
    animation-delay: -0.9s;
  }

  &:nth-child(4):before {
    animation-delay: -0.8s;
  }

  &:nth-child(5):before {
    animation-delay: -0.7s;
  }

  &:nth-child(6):before {
    animation-delay: -0.6s;
  }
`;