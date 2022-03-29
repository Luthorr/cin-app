import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: linear-gradient(55deg, #141e30, #243b55);
`;
export const Content = styled.div`
  width: 960px;
  background: var(--white);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 100px 130px 100px 95px;

  @media (max-width: 992px) {
    padding: 177px 90px 177px 85px;
  }
  @media (max-width: 768px) {
    padding: 100px 80px 33px 80px;
  }

  @media (max-width: 576px) {
    padding: 100px 15px 33px 15px;
  }
`;
export const NarrowerColumn = styled.div`
  width: 316px;

  @media (max-width: 992px) {
    width: 35%;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
export const Logo = styled.img`
  max-width: 100%;
`;
export const Form = styled.form`
  width: 290px;

  @media (max-width: 992px) {
    width: 50%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
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
  color: var(--secondary);
  transition: all 0.4s;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;

  &:focus-within {
    ${Icon} {
      color: #57b846;
      padding-left: 28px;
    }
  }
`;

export const FormInput = styled.input`
  font-size: 1rem;
  color: var(--secondary);
  width: 100%;
  background: var(--gray);
  height: 50px;
  border-radius: 25px;
  border: ${({ isValidated }) => (isValidated ? 'none' : '2px solid #ff8088')};
  outline: none;
  padding: 0 30px 0 68px;
`;

export const Heading = styled.div`
  font-size: 24px;
  color: #333333;
  line-height: 1.2;
  text-align: center;
  width: 100%;
  display: block;
  padding-bottom: 1.5rem;
`;

export const Button = styled.button`
  font-size: 15px;
  line-height: 1.5;
  color: #fff;
  text-transform: uppercase;
  border: none;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  background: var(--green);
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.5rem;
  transition: all 0.4s ease-in-out;
  margin: 0.5rem 0;
  cursor: pointer;
  &:hover {
    background: var(--primary);
  }
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.3rem 0;
`;
