import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 7rem;
  background-color: var(--secondary);
  position: relative;
  height: 65vh;
`;

export const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 520px;
  width: 100%;
  line-height: 1.4;
  text-align: center;

  h2 {
    font-family: 'Cabin', sans-serif;
    font-size: 20px;
    text-transform: uppercase;
    color: #000;
    margin-top: 0px;
    margin-bottom: 25px;
    color: var(--white);
  }

  @media only screen and (max-width: 480px) {
    height: 162px;
    h2 {
      font-size: 16px;
    }
  }
`;

export const Content = styled.div`
  position: relative;
  height: 240px;

  h1 {
    font-family: 'Montserrat', sans-serif;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 14rem;
    font-weight: 900;
    margin: 0px;
    color: #262626;
    text-transform: uppercase;
    letter-spacing: -40px;
    margin-left: -20px;
    color: var(--contrast);
  }

  h1 > span {
    text-shadow: -8px 0px 0px #fff;
    color: var(--contrast);
    user-select: none;
  }

  h3 {
    font-family: 'Cabin', sans-serif;
    position: relative;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    color: #262626;
    letter-spacing: 3px;
    padding-left: 6px;
    color: var(--white);
  }

  @media only screen and (max-width: 767px) {
    height: 200px;
    h1 {
      font-size: 200px;
    }
  }

  @media only screen and (max-width: 480px) {
    height: 162px;
    h1 {
      font-size: 162px;
      height: 150px;
      line-height: 162px;
    }
    h2 {
      font-size: 16px;
    }
  }
`;
