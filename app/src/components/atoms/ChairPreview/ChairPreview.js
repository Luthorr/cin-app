import React from 'react';
import { Wrapper, UpperChair, LowerChair } from './ChairPreview.style';
const ChairPreview = ({ chairState }) => {
  return (
    <Wrapper chairState={chairState}>
      <UpperChair />
      <LowerChair />
    </Wrapper>
  );
};

export default ChairPreview;
