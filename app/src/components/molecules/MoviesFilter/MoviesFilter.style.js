import styled from 'styled-components';

export const Wrapper = styled.div`
  padding-top: 3.5rem;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 840px) {
    flex-direction: column;
    row-gap: 20px;
  }
`;

export const SelectMenu = styled.select`
  background-color: var(--secondary);
  color: gray;
  font-size: 1rem;
  border: none;
`;

export const SelectOption = styled.option`
  &:after {
    content: 'ww';
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 1.5rem;
  @media (max-width: 780px) {
    flex-direction: column;
    row-gap: 20px;
  }
`;

export const MenuOption = styled.div`
  display: flex;
  font-size: 'Oswald', sans-serif;
  text-transform: uppercase;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-weight: ${({ isActive }) => isActive && '800'};
  ${({ isActive }) =>
    isActive &&
    `&:before {
    content: '';
    position: absolute;
    bottom: 21px;
    border: 4px solid var(--contrast);
    display: inline-block;
    border-radius: 50%;
    opacity: 0.6;
    width: 8px;
    height: 8px;
    background-color: var(--contrast);
  }`}
`;

export const Icon = styled.span`
  font-size: 15px;
  display: flex;
  align-items: center;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-left: 35px;
  pointer-events: none;
  color: var(--white);
  transition: all 0.4s;
`;

export const InputWrapper = styled.div`
  position: relative;
  z-index: 1;
  &:focus-within {
    ${Icon} {
      color: var(--contrast);
      padding-left: 28px;
    }
  }
`;

export const FormInput = styled.input`
  font-size: 1rem;
  color: var(--white);
  border: none;
  width: 100%;
  background: transparent;
  height: 40px;
  border-radius: 5px;
  padding: 0 30px 0 68px;
`;
