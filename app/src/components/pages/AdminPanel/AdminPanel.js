/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import {
  Content,
  Menu,
  MenuRow,
  WiderColumn,
  Wrapper,
  SpinnerContainer,
} from './AdminPanel.style';

import MovieTab from '../../organism/AdminPanelTabs/MovieTab/MovieTab';
import FilmshowTab from '../../organism/AdminPanelTabs/FilmshowTab/FilmshowTab';
import { AdminPanelMenuItems } from '../../../constants';
import RoomTab from '../../organism/AdminPanelTabs/RoomTab/RoomTab';
import BlogpostTab from '../../organism/AdminPanelTabs/BlogpostTab/BlogpostTab';
import CinemaTab from '../../organism/AdminPanelTabs/CinemaTab/CinemaTab';
import Citytab from '../../organism/AdminPanelTabs/CityTab/CityTab';
import { useGenre } from '../../../hooks/useGenre';
import { useCinema } from '../../../hooks/useCinema';
import { useMovie } from '../../../hooks/useMovie';
import { useCity } from '../../../hooks/useCity';
import { useFilmshow } from '../../../hooks/useFilmshow';
import { useRoom } from '../../../hooks/useRoom';
import { useBlogPost } from '../../../hooks/useBlogPost';
import Spinner from '../../atoms/Spinner/Spinner';

const AdminPanel = () => {
  const [genres, setGenres] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [movies, setMovies] = useState([]);
  const [cities, setCities] = useState([]);
  const [filmshows, setFilmshows] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [blogposts, setBlogposts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { getGenres } = useGenre();
  const { getAdminCinemas } = useCinema();
  const { getAdminMovies } = useMovie();
  const { getCities } = useCity();
  const { getAdminFilmshows } = useFilmshow();
  const { getAdminRooms } = useRoom();
  const { getAdminBlogPosts } = useBlogPost();
  const componentMounted = useRef(true);

  useEffect(() => {
    (async () => {
      componentMounted.current && setIsLoading(true);
      const obtainedGenres = await getGenres();
      const obtainedCinemas = await getAdminCinemas();
      const obtainedMovies = await getAdminMovies();
      const obtainedCities = await getCities();
      const obtainedFilmshows = await getAdminFilmshows();
      const obtainedRooms = await getAdminRooms();
      const obtainedBlogposts = await getAdminBlogPosts();

      if (obtainedGenres && componentMounted.current) {
        setGenres(obtainedGenres);
      }
      if (obtainedCinemas && componentMounted.current) {
        setCinemas(obtainedCinemas);
      }
      if (obtainedMovies && componentMounted.current) {
        setMovies(obtainedMovies);
      }
      if (obtainedCinemas && componentMounted.current) {
        setCities(obtainedCities);
      }
      if (obtainedFilmshows && componentMounted.current) {
        setFilmshows(obtainedFilmshows);
      }
      if (obtainedRooms && componentMounted.current) {
        setRooms(obtainedRooms);
      }
      if (obtainedBlogposts && componentMounted.current) {
        setBlogposts(obtainedBlogposts);
      }
      componentMounted.current && setIsLoading(false);
    })();
    return () => (componentMounted.current = false);
  }, []);

  const [activeTab, setActiveTab] = useState(AdminPanelMenuItems[0]);
  const handleTabChange = (tab) => setActiveTab(tab);
  const isTabActive = (tab) =>
    JSON.stringify(activeTab) === JSON.stringify(tab);

  useEffect(() => {
    (async () => {
      const obtainedCinemas = await getAdminCinemas();
      const obtainedFilmshows = await getAdminFilmshows();
      const obtainedRooms = await getAdminRooms();
      if (obtainedCinemas && componentMounted.current) {
        setCinemas(obtainedCinemas);
      }
      if (obtainedFilmshows && componentMounted.current) {
        setFilmshows(obtainedFilmshows);
      }
      if (obtainedRooms && componentMounted.current) {
        setRooms(obtainedRooms);
      }
    })();
  }, [cities]);

  useEffect(() => {
    (async () => {
      const obtainedFilmshows = await getAdminFilmshows();
      if (obtainedFilmshows && componentMounted.current) {
        setFilmshows(obtainedFilmshows);
      }
    })();
  }, [movies]);

  useEffect(() => {
    (async () => {
      const obtainedFilmshows = await getAdminFilmshows();
      if (obtainedFilmshows && componentMounted.current) {
        setFilmshows(obtainedFilmshows);
      }
    })();
  }, [rooms]);

  return (
    <Wrapper>
      {isLoading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <Content>
          <Menu>
            {AdminPanelMenuItems.map(({ title, icon }) => (
              <MenuRow
                key={title}
                onClick={() => handleTabChange({ title, icon })}
                isActive={isTabActive({ title, icon })}
              >
                {icon()}
                {title}
              </MenuRow>
            ))}
          </Menu>
          <WiderColumn>
            {isTabActive(AdminPanelMenuItems[0]) && (
              <MovieTab genres={genres} movies={movies} setMovies={setMovies} />
            )}
            {isTabActive(AdminPanelMenuItems[1]) && (
              <FilmshowTab
                cinemas={cinemas}
                movies={movies}
                filmshows={filmshows}
                setFilmshows={setFilmshows}
              />
            )}
            {isTabActive(AdminPanelMenuItems[2]) && (
              <RoomTab cinemas={cinemas} rooms={rooms} setRooms={setRooms} />
            )}
            {isTabActive(AdminPanelMenuItems[3]) && (
              <BlogpostTab blogposts={blogposts} setBlogposts={setBlogposts} />
            )}
            {isTabActive(AdminPanelMenuItems[4]) && (
              <Citytab cities={cities} setCities={setCities} />
            )}
            {isTabActive(AdminPanelMenuItems[5]) && (
              <CinemaTab
                cinemas={cinemas}
                setCinemas={setCinemas}
                cities={cities}
              />
            )}
          </WiderColumn>
        </Content>
      )}
    </Wrapper>
  );
};

export default AdminPanel;
