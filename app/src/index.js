import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './hooks/useAuth';
import { CinemaProvider } from './hooks/useCinema';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <AuthProvider>
    <CinemaProvider>
      <App />
      <ToastContainer
        position='top-right'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </CinemaProvider>
  </AuthProvider>,
  document.getElementById('root')
);
