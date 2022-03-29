import React, { useContext, useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import API from '../api/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      (async () => {
        try {
          const response = await API.get('/me', {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          // console.log('Error', error);
        }
      })();
    }
  }, []);

  const signIn = async (email, password) => {
    try {
      const response = await API.post('/login', {
        email,
        password,
      });
      const { accessToken, ...userData } = response.data;
      setUser(userData);
      localStorage.setItem('token', accessToken);
      return true;
    } catch (error) {
      // console.log('error');
      return false;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw Error('useAuth needs to be used inside AuthContext');
  }
  return auth;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
