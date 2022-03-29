import React from 'react';
import { Wrapper, PlayIcon, ShadowButton } from './PlayButton.style';

const PlayButton = ({ setShowYTPlayer }) => {
  const handleEnter = () => {
    setShowYTPlayer(true);
  };

  return (
    <Wrapper onClick={handleEnter}>
      <PlayIcon />
      <ShadowButton />
    </Wrapper>
  );
};

export default PlayButton;
