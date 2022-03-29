import styled from 'styled-components';
//
export const Wrapper = styled.div`
  margin-top: 7rem;
  background-color: var(--secondary);
`;

export const Content = styled.div`
  display: flex;
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2.5rem;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  opacity: 0.8;
`;

export const Title = styled.h1`
  font-family: 'Oswald', sans-serif;
  text-transform: uppercase;
`;

export const CreatedText = styled.h4`
  opacity: 0.7;
`;

export const NewsContainer = styled.div`
  max-width: 912px;
  padding: 1rem;
  margin: 0 auto;
`;

export const NewsText = styled.div`
  letter-spacing: 0.02rem;
  font-size: 1.25rem;

  &:first-child:first-letter {
    color: #903;
    float: left;
    font-family: Georgia;
    font-size: 75px;
    line-height: 60px;
    padding-top: 10px;
    padding-right: 8px;
    padding-left: 3px;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  min-height: 600px;
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

export const BGImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 0;
  margin: 0;
  object-fit: fill;
  opacity: 0.8;
  filter: contrast(110%);
`;
