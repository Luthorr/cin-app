import {
  FaUser,
  FaImage,
  FaLock,
  FaEnvelope,
  FaFilm,
  FaVideo,
  FaChair,
  FaNewspaper,
  FaCity,
  FaTicketAlt,
} from 'react-icons/fa';

export const TransparentRoutes = [
  '',
  'login',
  'register',
  'movie-details',
  'reservation',
  'filmshows',
  'news',
  'favourite-movies',
];

export const UserProfileMenuItems = [
  { title: 'Informacje', icon: FaUser },
  { title: 'Awatar', icon: FaImage },
  { title: 'Adres email', icon: FaEnvelope },
  { title: 'Hasło', icon: FaLock },
];

export const AdminPanelMenuItems = [
  { title: 'Zarządzaj filmami', icon: FaVideo },
  { title: 'Zarządzaj seansami', icon: FaFilm },
  { title: 'Zarządzaj salami', icon: FaChair },
  { title: 'Zarządzaj newsami', icon: FaNewspaper },
  { title: 'Zarządzaj miastami', icon: FaCity },
  { title: 'Zarządzaj kinami', icon: FaTicketAlt },
];

export const MOVIE_FILTERS = [
  {
    propName: 'statistics',
    nestedPropName: 'votes',
    asc: true,
  },
  {
    propName: 'statistics',
    nestedPropName: 'votes',
    asc: false,
  },
  {
    propName: 'releaseDate',
    asc: true,
  },
  {
    propName: 'releaseDate',
    asc: false,
  },
  {
    propName: 'statistics',
    nestedPropName: 'rate',
    asc: true,
  },
  {
    propName: 'statistics',
    nestedPropName: 'rate',
    asc: false,
  },
];

export const allowedFileTypes = ['jpeg', 'png', 'jpg'];

export const TICKET_PRICE = 20;
export const POINTS_FOR_TICKET = 10;
export const moviesPerPage = 12;
export const newsPerPage = 8;
export const favMoviesPerPage = 8;
export const filmshowsPerPage = 6;
export const ticketsPerPage = 3;
export const reviewsPerPage = 5;
export const commentsPerPage = 10;
export const recordsInTable = 20;
