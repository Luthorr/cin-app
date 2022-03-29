import moment from 'moment';

export const useFilter = () => {
  const getActualDate = () => {
    const format = 'YYYY-MM-DD HH:mm';
    const currDate = new Date();
    const properDate = moment(currDate).format(format);
    return properDate;
  };

  const getFutureMovies = (movies) => {
    const actualDate = getActualDate();

    const updatedArray = movies.filter(({ releaseDate }) =>
      moment(releaseDate).isAfter(actualDate)
    );
    return updatedArray;
  };

  return { getFutureMovies };
};
