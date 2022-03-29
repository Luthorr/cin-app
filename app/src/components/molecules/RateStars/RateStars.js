/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { IoMdStar } from 'react-icons/io';
import PropTypes from 'prop-types';
import { Star, Wrapper } from './RateStars.style';

const RateStars = ({ rate, handleRateChange }) => {
  const renderStars = () => {
    const stars = new Array(10).fill(0).map((item, idx) => (
      <Star
        key={idx}
        className={`${idx <= rate - 1 && 'active'}`}
        onClick={() => {
          const newRating = idx + 1;
          handleRateChange(newRating);
        }}
        index={idx}
        isActive={idx <= rate - 1}
      >
        <IoMdStar fontSize='2.5rem' />
      </Star>
    ));
    return stars;
  };

  return <Wrapper>{renderStars()}</Wrapper>;
};

RateStars.propTypes = {
  rate: PropTypes.number,
  handleRateChange: PropTypes.func.isRequired,
};

export default RateStars;
