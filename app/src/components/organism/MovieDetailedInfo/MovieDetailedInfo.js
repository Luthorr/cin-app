import React from 'react';
import {
  AdditionalContent,
  Details,
  SectionHeader,
  InformationContainer,
  InformationContent,
  TransparentParagraph,
  Storyline,
  StoryLineContent,
  InfoParagraph,
} from './MovieDetailedInfo.style';
import { OrangeLine } from '../../atoms/Lines/Lines';

const MovieDetailedInfo = ({
  movie: { duration, releaseDate, genre, director, description },
}) => {
  return (
    <AdditionalContent>
      <Details>
        <SectionHeader>INFORMACJE</SectionHeader>
        <OrangeLine />
        <InformationContainer>
          <InformationContent>
            <TransparentParagraph>CZAS TRWANIA</TransparentParagraph>
            <InfoParagraph>{duration} MIN</InfoParagraph>
          </InformationContent>
          <InformationContent>
            <TransparentParagraph>DATA WYDANIA</TransparentParagraph>
            <InfoParagraph>{releaseDate}</InfoParagraph>
          </InformationContent>
          <InformationContent>
            <TransparentParagraph>GATUNEK</TransparentParagraph>
            <InfoParagraph>{genre?.name}</InfoParagraph>
          </InformationContent>
          <InformationContent>
            <TransparentParagraph>REŻYSER</TransparentParagraph>
            <InfoParagraph>{director}</InfoParagraph>
          </InformationContent>
          {/* <p>CZAS TRWANIA</p> <p>160 MINUT</p>
                <p>DATA WYDANIA</p> <p>2021 SIE 18</p>
                <p>REŻYSER</p> <p>2021</p> */}
        </InformationContainer>
      </Details>
      <Storyline>
        <SectionHeader>OPIS FILMU</SectionHeader>
        <OrangeLine />
        <StoryLineContent>{description}</StoryLineContent>
      </Storyline>
    </AdditionalContent>
  );
};

export default MovieDetailedInfo;
