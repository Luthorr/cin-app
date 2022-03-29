import styled from 'styled-components';
import { OutlineButton } from '../../atoms/Button/OutlineButton';
import { RectButton } from '../../atoms/Button/RectButton';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

export const Header = styled.h3``;

export const Points = styled.span`
  color: var(--contrast);
`;

export const Input = styled.input`
  font-family: 'Oswald', sans-serif;
  font-size: 1.2rem;
  background-color: transparent;
  border: 2px solid rgba(50, 50, 50, 0.7);
  padding: 0.5rem;
  color: var(--white);
  text-align: center;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.p`
  padding: 0.2rem 0;
`;

export const Info = styled.h4`
  opacity: 0.9;
  padding: 1rem 0;
`;

export const ButtonContainer = styled.div`
  align-self: center;
  padding: 1rem 0;
`;

export const PriceContainer = styled.div`
  padding: 1rem 0;
  font-family: 'Oswald', sans-serif;
`;

export const TotalPrice = styled.h3`
  opacity: 0.8;
`;

export const Price = styled.span`
  opacity: 1;
  color: var(--contrast);
  font-size: 1.5rem;
`;

export const ShortNote = styled.span`
  opacity: 0.7;
`;

export const BackButton = styled(OutlineButton)``;

export const ConfirmButton = styled(RectButton)``;
