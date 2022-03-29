import moment from 'moment';
import 'moment/locale/pl';

export const useDateFormatter = () => {
  const capitalizeFirstLetter = (textContent) =>
    textContent.charAt(0).toUpperCase() + textContent.slice(1);

  const getMomentDays = (initialPoint) => {
    const daysArray = [];

    const daysRequired = 6;

    for (let i = 0; i <= daysRequired; i += 1) {
      daysArray.push(moment(initialPoint).add(i, 'days'));
    }
    return daysArray;
  };

  const getConvertedMomentDaysToStringArray = (momentDays) => {
    const dateStrings = [];
    momentDays.forEach((day) => {
      dateStrings.push({
        dayNumber: day.format('Do').substring(0, day.format('Do').length - 1), // usuwamy kropkę z ostatniej pozycji w stringu
        dayName: capitalizeFirstLetter(day.format('dddd')),
        month: capitalizeFirstLetter(day.format('MMM')),
        fullDate: day.format('YYYY-MM-DD'),
      });
    });
    return dateStrings;
  };

  const getCalendarDays = () => {
    const initialPoint = moment();
    initialPoint.locale('pl');
    const momentDays = getMomentDays(initialPoint);
    const dateStrings = getConvertedMomentDaysToStringArray(momentDays);

    return dateStrings;
  };

  const getCurrentDate = () => {
    const format = 'YYYY-MM-DD HH:mm';
    const currDate = new Date();
    const properDate = moment(currDate).format(format);
    return properDate;
  };

  // const getCurrentDate = () => {
  //   const dateHelper = new Date();
  //   const date = new Date(
  //     Date.UTC(
  //       dateHelper.getFullYear(),
  //       dateHelper.getMonth(),
  //       dateHelper.getDate()
  //     )
  //   );
  //   return `${
  //     date.toISOString().split('T')[0]
  //   } ${dateHelper.getHours()}:${dateHelper.getMinutes()}`;
  // };

  return { getCalendarDays, getCurrentDate };
};
