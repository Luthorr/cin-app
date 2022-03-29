import styled from 'styled-components';

export const Star = styled.i`
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? '#fc0' : 'rgb(53, 53, 53)')};
`;

export const Wrapper = styled.span`
  i:hover ~ i {
    color: rgb(53, 53, 53);
    text-shadow: none;
    transition: color 200ms, text-shadow 200ms;
    transition-delay: 0;
  }

  &:hover i {
    color: #fc0;
    text-shadow: #fc0 0 0 20px;
  }

  &:hover i:nth-child(2) {
    transition-delay: 20ms;
  }

  &:hover i:nth-child(3) {
    transition-delay: 30ms;
  }

  &:hover i:nth-child(4) {
    transition-delay: 40ms;
  }

  &:hover i:nth-child(5) {
    transition-delay: 50ms;
  }

  &:hover i:nth-child(6) {
    transition-delay: 60ms;
  }

  &:hover i:nth-child(7) {
    transition-delay: 70ms;
  }

  &:hover i:nth-child(8) {
    transition-delay: 80ms;
  }

  &:hover i:nth-child(9) {
    transition-delay: 90ms;
  }

  &:hover i:nth-child(10) {
    transition-delay: 100ms;
  }
`;
