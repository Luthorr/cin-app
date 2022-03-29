import React from 'react';
import PropTypes from 'prop-types';
import { Date, RedDot, Wrapper } from './CalendarPage.style';
function CalendarPage({
  dateState,
  dateState: { dayNumber, dayName, month, fullDate },
  index,
  setPlayDate,
  clickedPage,
  setClickedPage,
}) {
  const isClicked = clickedPage[index];
  return (
    <Wrapper
      key={dayNumber}
      aria-hidden='true'
      onClick={() => {
        setPlayDate(fullDate);
        setClickedPage(clickedPage.map((state, ind) => index === ind));
      }}
      isClicked={isClicked}
    >
      {isClicked && <RedDot />}
      <div>{dayName}</div>
      <Date isClicked={isClicked}>{dayNumber}</Date>
      <div>{month}</div>
    </Wrapper>
  );
}

CalendarPage.propTypes = {
  dateState: PropTypes.shape({
    dayNumber: PropTypes.string.isRequired,
    dayName: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    fullDate: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  setPlayDate: PropTypes.func.isRequired,
  clickedPage: PropTypes.arrayOf(Boolean).isRequired,
  setClickedPage: PropTypes.func.isRequired,
};

export default CalendarPage;
