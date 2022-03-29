/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Wrapper,
  Title,
  Container,
  Content,
  BasicContent,
  WatchTrailer,
  MovieBasicInfo,
  TitleSmall,
  TransparentParagraph,
  Rate,
  CinemaSelect,
  CinemaOption,
  SpinnerContainer,
} from './MovieDetails.style';
import HeroImage from '../../organism/HeroImage/HeroImage';
import ReviewsSection from '../../organism/ReviewsSection/ReviewsSection';
import MovieDetailedInfo from '../../organism/MovieDetailedInfo/MovieDetailedInfo';
import PlayButton from '../../atoms/PlayButton/PlayButton';
import RateStars from '../../molecules/RateStars/RateStars';
import { useMovie } from '../../../hooks/useMovie';
import { useAuth } from '../../../hooks/useAuth';
import { useFilmshow } from '../../../hooks/useFilmshow';
import { useCinema } from '../../../hooks/useCinema';
import { useReview } from '../../../hooks/useReview';
import YoutubePlayer from '../../organism/YoutubePlayer/YoutubePlayer';
import Spinner from '../../atoms/Spinner/Spinner';
import { IoMdStar } from 'react-icons/io';
import { FilmshowsSection } from '../../organism/FilmshowsSection/FilmshowsSection';
import { OrangeLine } from '../../atoms/Lines/Lines';
import { toast } from 'react-toastify';

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState([]);
  const [filmshows, setFilmshows] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [userRate, setUserRate] = useState(null);
  const [showYTPlayer, setShowYTPlayer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { getMovieById, getUserMovieRate, rateMovie, changeMovieRating } =
    useMovie();
  const { getReviewsByMovieId } = useReview();
  const { getMovieFilmshows } = useFilmshow();
  const { user } = useAuth();
  const { getCinemas, setCinemaId, cinemaId } = useCinema();
  let history = useHistory();
  const componentMounted = useRef(true);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const movieData = await getMovieById(id);
      if (movieData && componentMounted.current) {
        setMovie(movieData);
      } else {
        history.push('/not-found');
      }
      const reviewsData = await getReviewsByMovieId(id);
      if (reviewsData && componentMounted.current) {
        setReviews(reviewsData);
      }
      const cinemasData = await getCinemas();
      if (cinemasData && componentMounted.current) {
        setCinemas(cinemasData);
      }
      componentMounted.current && setIsLoading(false);
    })();
    return () => {
      componentMounted.current = false;
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (user) {
        const userRating = await getUserMovieRate(user.id, id);
        if (userRating && componentMounted.current) {
          setUserRate(userRating.rate);
        }
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      if (cinemaId && componentMounted.current) {
        const filmshowsData = await getMovieFilmshows(id, cinemaId);
        setFilmshows(filmshowsData);
      }
    })();
  }, [cinemaId]);

  const { title, statistics, bgImage, genre, duration, trailerURL } = movie;
  const countNewRate = (oldRate, newRate, wasPreviouslyRated) => {
    if (wasPreviouslyRated) {
      setMovie((prevState) => ({
        ...prevState,
        statistics: {
          ...prevState.statistics,
          rate:
            Math.round(
              ((prevState.statistics.totalSum - oldRate + newRate) /
                prevState.statistics.votes +
                Number.EPSILON) *
                100
            ) / 100,
          totalSum: prevState.statistics.totalSum - oldRate + newRate,
        },
      }));
    } else {
      setMovie((prevState) => ({
        ...prevState,
        statistics: {
          rate:
            Math.round(
              ((prevState.statistics.totalSum + newRate) /
                (prevState.statistics.votes + 1) +
                Number.EPSILON) *
                100
            ) / 100,
          votes: prevState.statistics.votes + 1,
          totalSum: prevState.statistics.totalSum + newRate,
        },
      }));
    }
  };

  const handleRateChange = (newRating) => {
    const oldRating = userRate;
    if (oldRating <= 0) {
      rateMovie(user?.id, id, newRating);
      countNewRate(oldRating, newRating, false);
    } else {
      changeMovieRating(user?.id, id, newRating);
      countNewRate(oldRating, newRating, true);
    }
    setUserRate(newRating);
    toast.success('Pomyślnie oceniono film!');
  };

  return (
    <Wrapper>
      {isLoading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <>
          {showYTPlayer && (
            <YoutubePlayer
              title={title}
              trailerURL={trailerURL}
              setShowYTPlayer={setShowYTPlayer}
            />
          )}
          <HeroImage image={bgImage}>
            {movie.trailerURL && (
              <PlayButton setShowYTPlayer={setShowYTPlayer} />
            )}
            <WatchTrailer>Obejrzyj trailer</WatchTrailer>
            <Title>{title}</Title>
            <Rate>
              <IoMdStar size='35px' />
              {statistics?.rate}/10
            </Rate>
          </HeroImage>
          <Container>
            <Content>
              <BasicContent>
                <MovieBasicInfo>
                  <TitleSmall>{title}</TitleSmall>
                  <TransparentParagraph>{genre?.name}</TransparentParagraph>
                  <TransparentParagraph>{duration} min</TransparentParagraph>
                  {user && (
                    <RateStars
                      rate={userRate}
                      handleRateChange={handleRateChange}
                      movieId={id}
                    />
                  )}
                </MovieBasicInfo>
                <CinemaSelect
                  value={cinemaId}
                  onChange={(e) => setCinemaId(e.target.value)}
                >
                  <CinemaOption hidden>Wybierz kino</CinemaOption>
                  {cinemas.map(({ id, cityName, street }) => (
                    <CinemaOption
                      key={id}
                      value={id}
                    >{`${cityName}, ${street}`}</CinemaOption>
                  ))}
                </CinemaSelect>
              </BasicContent>
              <MovieDetailedInfo movie={movie} />
              {filmshows.length > 0 && (
                <>
                  <OrangeLine />
                  <FilmshowsSection filmshows={filmshows} />
                </>
              )}
              <ReviewsSection reviews={reviews} movieId={id} />
            </Content>
          </Container>
        </>
      )}
    </Wrapper>
  );
};

export default MovieDetails;
