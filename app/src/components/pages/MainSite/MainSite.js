/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { Wrapper } from './MainSite.style';
import HeroImage from '../../organism/HeroImage/HeroImage';
import MoviesList from '../../organism/MoviesList/MoviesList';
import MovieInformation from '../../molecules/MovieInformation/MovieInformation';
import { useMovie } from '../../../hooks/useMovie';

const Mainsite = () => {
  const [playedMovies, setPlayedMovies] = useState([]);
  const [randomMovieNumber, setRandomMovieNumber] = useState([]);
  const { getPlayedMovies } = useMovie();
  const componentMounted = useRef(true);

  useEffect(() => {
    (async () => {
      const obtainedMovies = await getPlayedMovies();
      if (obtainedMovies && componentMounted.current) {
        setPlayedMovies(obtainedMovies);
        setRandomMovieNumber(Math.floor(Math.random() * obtainedMovies.length));
      }
    })();
    return () => {
      componentMounted.current = false;
    };
  }, []);

  return (
    <Wrapper>
      <HeroImage image={playedMovies[randomMovieNumber]?.bgImage}>
        <MovieInformation movie={playedMovies[randomMovieNumber]} />
      </HeroImage>
      <MoviesList playedMovies={playedMovies} />
    </Wrapper>
  );
};

export default Mainsite;
