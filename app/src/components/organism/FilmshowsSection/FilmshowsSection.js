import React from 'react';
import Filmshowv2 from '../../molecules/Filmshowv2/Filmshowv2';
import { Wrapper, FilmshowContainer, Heading } from './FilmshowsSection.style';

export const FilmshowsSection = ({ filmshows }) => {
  return (
    <Wrapper>
      <Heading>Seanse ({filmshows.length})</Heading>
      <FilmshowContainer>
        {filmshows.map((filmshow) => (
          <Filmshowv2 key={filmshow.filmshowId} filmshow={filmshow} />
        ))}
      </FilmshowContainer>
    </Wrapper>
  );
};
