import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './Calendar.style';
function Calendar({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

Calendar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Calendar;
