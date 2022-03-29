import styled from 'styled-components';
import { OrangeLine } from '../../atoms/Lines/Lines';

export const Wrapper = styled.div`
  background-color: var(--secondary);
  padding: 7rem 0;
`;

export const Container = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem 0;
`;

export const Table = styled.table`
  width: 100%;
  @media (min-width: 456px) {
    table-layout: fixed;
  }
  border-spacing: 0 0.2rem;
`;

export const THead = styled.thead`
  background-color: var(--primary);
`;

export const TBody = styled.tbody`
  width: 100%;
`;

export const TRow = styled.tr``;

export const TH = styled.th`
  padding: 0.5rem;
  @media (max-width: 610px) {
    display: ${({ isHidden }) => isHidden && 'none'};
  }
  @media (max-width: 456px) {
    display: ${({ isHiddenNext }) => isHiddenNext && 'none'};
  }
`;

export const TD = styled.td`
  background-color: var(--primaryLighter);
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  vertical-align: middle;
  word-wrap: break-word;
  justify-content: center;
  @media (max-width: 610px) {
    display: ${({ isHidden }) => isHidden && 'none'};
  }
  @media (max-width: 456px) {
    display: ${({ isHiddenNext }) => isHiddenNext && 'none'};
  }
`;

export const Header = styled.div`
  padding-top: 1rem;
  line-height: 1.25;
  text-align: center;
  h3 {
    color: var(--contrast);
  }
`;

export const Line = styled(OrangeLine)`
  padding: 0.05rem 0;
  margin: 0.5rem 0;
`;

export const NoTicketsInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;
