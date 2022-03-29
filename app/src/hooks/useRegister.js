import API from '../api/api';

export const useRegister = () => {
  const register = async ({
    password,
    email,
    firstName,
    lastName,
    userName,
  }) => {
    try {
      const response = await API.post('/register', {
        email,
        firstName,
        lastName,
        userName,
        password,
      });
      // console.log('response', response.data);
      return response.data;
    } catch (error) {
      // console.log('ERROR', error);
      return null;
    }
  };

  return { register };
};
