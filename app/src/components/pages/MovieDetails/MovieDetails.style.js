import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const SpinnerContainer = styled.div`
  margin: 20vh 0;
`;

export const Title = styled.h1`
  font-family: 'Oswald', sans-serif;
  font-weight: bolder;
  text-transform: uppercase;
  font-size: 4rem;
  align-self: flex-start;
  margin: 25px auto;
  letter-spacing: 0.2rem;
  line-height: 1;
  @media (max-width: 992px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const Rate = styled.h5`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Oswald', sans-serif;
  font-weight: bolder;
  text-transform: uppercase;
  font-size: 1.4rem;
  align-self: flex-start;
  margin: 0 auto;
  letter-spacing: 0.2rem;
  line-height: 0.1;
  color: var(--golden);
`;

export const Container = styled.div`
  width: 100%;
  background-color: var(--secondary);
  padding: 10px;
`;

export const Content = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2.5rem 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const BasicContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 60rem) {
    flex-direction: row;
    align-items: center;
  }
`;

export const MovieBasicInfo = styled.div`
  line-height: 1.4rem;
`;

export const WatchTrailer = styled.p`
  margin-top: 1.5rem;
`;

export const TitleSmall = styled.p`
  font-family: 'Oswald', sans-serif;
  font-weight: 800;
  letter-spacing: 0.1rem;
`;

export const TransparentParagraph = styled.p`
  opacity: 0.5;
`;

export const ReviewsHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

export const ReviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
`;

export const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
  padding: 1rem 0 4rem 0;
`;

export const CreateReviewText = styled.p`
  cursor: pointer;
  opacity: 0.7;
`;

export const CinemaSelect = styled.select`
  background-color: transparent;
  border: none;
  color: var(--white);
  font-family: 'Oswald', sans-serif;
  font-size: 1.2rem;
  text-transform: uppercase;
`;

export const CinemaOption = styled.option`
  background-color: var(--secondary);
  color: var(--white);
  border: none;
`;
