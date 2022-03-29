import styled from 'styled-components';

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

export const ReviewsHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

export const SectionHeader = styled.p`
  font-family: 'Oswald', sans-serif;
  font-size: 1.1rem;
  padding-bottom: 0.2rem;
  letter-spacing: 0.1rem;
`;
