import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Mainsite from './components/pages/MainSite/MainSite';
import MoviesPage from './components/pages/MoviesPage/MoviesPage';
import Login from './components/pages/Login/Login';
import MovieDetails from './components/pages/MovieDetails/MovieDetails';
import Register from './components/pages/Register/Register';
import Sidebar from './components/organism/Sidebar/Sidebar';
import Footer from './components/organism/Footer/Footer';
import Navbar from './components/organism/Navbar/Navbar';
import Reservation from './components/pages/Reservation/Reservation';
import ReviewDetails from './components/pages/ReviewDetails/ReviewDetails';
import UserProfile from './components/pages/UserProfile/UserProfile';
import AdminPanel from './components/pages/AdminPanel/AdminPanel';
import PageNotFound from './components/pages/PageNotFound/PageNotFound';

import { GlobalStyle } from './GlobalStyle';
import './App.css';
import ReviewWrite from './components/pages/ReviewWrite/ReviewWrite';
import News from './components/pages/News/News';
import NewsDetails from './components/pages/NewsDetails/NewsDetails';
import Filmshows from './components/pages/Filmshows/Filmshows';
import ScrollToTop from './components/atoms/ScrollToTop/ScrollToTop';
import FavouriteMovies from './components/pages/FavouriteMovies/FavouriteMovies';
import MyTickets from './components/pages/MyTickets/MyTickets';
import ProtectedRoute from './components/atoms/ProtectedRoute/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import AdminRoute from './components/atoms/AdminRoute/AdminRoute';
const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const { user } = useAuth();

  return (
    <Router>
      <>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} />
        <ScrollToTop />
        <Switch>
          <Route path='/' exact component={Mainsite} />
          <Route path='/movies' component={MoviesPage} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/movie-details/:id' component={MovieDetails} />
          <ProtectedRoute
            path='/reservation/:id'
            component={Reservation}
            user={user}
          />
          <Route path='/review/:id' component={ReviewDetails} />
          <ProtectedRoute path='/profile' component={UserProfile} user={user} />
          <ProtectedRoute
            path='/review-create/:movieId'
            component={ReviewWrite}
            user={user}
          />
          <ProtectedRoute
            path='/review-edit/:movieId/:reviewId'
            component={ReviewWrite}
            user={user}
          />
          <AdminRoute path='/admin-panel' component={AdminPanel} user={user} />
          <Route path='/filmshows' component={Filmshows} />
          <Route path='/news' component={News} />
          <ProtectedRoute
            path='/my-tickets'
            component={MyTickets}
            user={user}
          />
          <ProtectedRoute
            path='/favourite-movies'
            component={FavouriteMovies}
            user={user}
          />
          <Route path='/news-details/:id' component={NewsDetails} />
          <Route path='/*' component={PageNotFound} />
        </Switch>
        <Footer />
        <GlobalStyle />
      </>
    </Router>
  );
};

export default App;
