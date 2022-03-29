import styled from 'styled-components';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  user-select: none;
`;

export const LeftArrow = styled(RiArrowLeftSLine)`
  font-weight: 600;
  font-size: 2.5rem;
  opacity: 0.7;
  cursor: pointer;
`;

export const RightArrow = styled(RiArrowRightSLine)`
  font-weight: 600;
  font-size: 2.5rem;
  opacity: 0.7;
  cursor: pointer;
`;
