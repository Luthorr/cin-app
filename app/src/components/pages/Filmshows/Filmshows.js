/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';

import {
  Container,
  Wrapper,
  Content,
  HeaderRow,
  ScheduleText,
  InputWrapper,
  FormInput,
  Icon,
  FilmshowsContainer,
  CinemaSelect,
  CinemaOption,
  CalendarContainer,
  InputCalendar,
  InputCalendarContainer,
  PickDateText,
  NoMoviesAvailable,
} from './Filmshows.style';
import Calendar from '../../molecules/Calendar/Calendar';
import CalendarPage from '../../atoms/CalendarPage/CalendarPage';

import { FaSearch } from 'react-icons/fa';
import HeroImage from '../../organism/HeroImage/HeroImage';
import filmshowsImage from '../../../images/filmshows2.jpg';
import { OrangeLine } from '../../atoms/Lines/Lines';
import Filmshow from '../../molecules/Filmshow/Filmshow';
import { useDateFormatter } from '../../../hooks/useDateFormatter';
import { useFilmshow } from '../../../hooks/useFilmshow';
import { useCinema } from '../../../hooks/useCinema';
import Spinner from '../../atoms/Spinner/Spinner';
import Pagination from '../../atoms/Pagination/Pagination';
import { filmshowsPerPage } from '../../../constants';
import { usePagination } from '../../../hooks/usePagination';

const Filmshows = () => {
  const [filmshows, setFilmshows] = useState({});
  const [shownFilmshows, setShownFilmshow] = useState({});
  const [cinemas, setCinemas] = useState([]);
  const [clickedPage, setClickedPage] = useState(new Array(7).fill(false));
  const [playDate, setPlayDate] = useState('');
  const [searchTag, setSearchTag] = useState('');
  const { getFilmshowsByDate, getUpdatedSearchArray } = useFilmshow();
  const { getCalendarDays } = useDateFormatter();
  const calendarDays = getCalendarDays();
  const { getCinemas, setCinemaId, cinemaId } = useCinema();
  const { paginate, currentPage } = usePagination();
  const initial = useRef(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (playDate.length > 0 && cinemaId) {
        setIsLoading(true);
        const filmshowsData = await getFilmshowsByDate(cinemaId, playDate);
        if (filmshowsData) {
          setFilmshows(filmshowsData);
          setShownFilmshow(filmshowsData);
        }
        setIsLoading(false);
      }
    })();
  }, [cinemaId, playDate]);

  useEffect(() => {
    (async () => {
      const cinemasData = await getCinemas();
      setCinemas(cinemasData);
    })();
  }, []);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    const searchDelay = setTimeout(() => {
      if (searchTag.length > 0) {
        const updatedArray = getUpdatedSearchArray(searchTag, filmshows);
        setShownFilmshow(updatedArray);
      } else {
        setShownFilmshow(filmshows);
      }
    }, 500);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(searchDelay);
    };
  }, [searchTag]);

  const handleInputDateChange = (e) => {
    setPlayDate(e.target.value);
    for (let i = 0; i < calendarDays.length; i += 1) {
      if (calendarDays[i].fullDate === e.target.value) {
        setClickedPage(
          clickedPage.map((val, ind) => (ind === i ? true : false))
        );
        break;
      }
    }
  };

  const renderFilmshows = () => {
    const filmshowsArray = [];
    for (
      let i = filmshowsPerPage * (currentPage - 1);
      i < Object.keys(shownFilmshows).length &&
      i < filmshowsPerPage * currentPage;
      i += 1
    ) {
      filmshowsArray.push(
        <Filmshow
          key={Object.values(shownFilmshows)[i].id}
          movie={Object.values(shownFilmshows)[i]}
        />
      );
    }
    return filmshowsArray;
  };

  return (
    <Wrapper>
      <HeroImage image={filmshowsImage} />
      <Container>
        <Content>
          <HeaderRow>
            <ScheduleText>Harmonogram</ScheduleText>
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
            <InputWrapper>
              <FormInput
                type='text'
                placeholder='Wyszukaj...'
                onChange={(e) => setSearchTag(e.target.value)}
              />
              <Icon>
                <FaSearch />
              </Icon>
            </InputWrapper>
          </HeaderRow>
          <OrangeLine />
          <CalendarContainer>
            <Calendar>
              {calendarDays.map((dateState, index) => (
                <CalendarPage
                  key={dateState.dayNumber}
                  dateState={dateState}
                  index={index}
                  clickedPage={clickedPage}
                  setClickedPage={setClickedPage}
                  setPlayDate={setPlayDate}
                />
              ))}
            </Calendar>
          </CalendarContainer>
          <InputCalendarContainer>
            <PickDateText>Data seansu</PickDateText>
            <InputCalendar
              type='date'
              value={playDate}
              min={calendarDays[0].fullDate}
              max={calendarDays[calendarDays.length - 1].fullDate}
              onChange={handleInputDateChange}
            />
          </InputCalendarContainer>
          {isLoading ? (
            <Spinner />
          ) : Object.keys(shownFilmshows).length > 0 ? (
            <>
              <FilmshowsContainer>
                {/* {Object.keys(shownFilmshows).map((key) => (
                  <Filmshow key={key} movie={shownFilmshows[key]} />
                ))} */}
                {renderFilmshows()}
              </FilmshowsContainer>
              <Pagination
                postsPerPage={filmshowsPerPage}
                totalPosts={Object.keys(shownFilmshows).length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>
          ) : (
            <NoMoviesAvailable>
              Bardzo nam przykro, ale nie mamy jeszcze ustalonego repertuaru na
              wybrany dzień
            </NoMoviesAvailable>
          )}
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Filmshows;
