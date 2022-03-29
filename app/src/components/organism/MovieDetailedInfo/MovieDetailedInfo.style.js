import styled from 'styled-components';

export const AdditionalContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 2rem 0;
  column-gap: 3rem;
`;

export const Details = styled.div`
  width: 30%;
  /* background-color: blue; */
  /* padding: 10px; */
  @media (max-width: 992px) {
    width: 100%;
    margin-bottom: 3rem;
  }
`;

export const SectionHeader = styled.p`
  font-family: 'Oswald', sans-serif;
  font-size: 1.1rem;
  padding-bottom: 0.2rem;
  letter-spacing: 0.1rem;
`;

export const Storyline = styled.div`
  width: 60%;
  /* background-color: green; */
  /* padding: 10px; */
  @media (max-width: 992px) {
    width: 100%;
  }
`;

export const StoryLineContent = styled.p`
  margin-top: 1rem;
`;

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
  margin-top: 1rem;
`;

export const InformationContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid rgb(255, 255, 255, 0.3);
  column-gap: 1rem;
`;

export const TransparentParagraph = styled.p`
  opacity: 0.5;
  text-transform: uppercase;
`;

export const InfoParagraph = styled.p`
  text-transform: uppercase;
`;
