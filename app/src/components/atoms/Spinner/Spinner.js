import React from 'react';
import { SpinnerContainer, SpinnerDot } from './Spinner.style';

const Spinner = () => {
  return (
    <SpinnerContainer>
      <SpinnerDot />
      <SpinnerDot />
      <SpinnerDot />
      <SpinnerDot />
      <SpinnerDot />
      <SpinnerDot />
    </SpinnerContainer>
  );
};

export default Spinner;
