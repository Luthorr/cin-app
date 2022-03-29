import React from 'react';
import { CloseIcon, MovieTitle, Player, Wrapper } from './YoutubePlayer.style';

const YoutubePlayer = ({ title, trailerURL, setShowYTPlayer }) => {
  const handleClose = () => {
    setShowYTPlayer(false);
  };

  return (
    <Wrapper onClick={handleClose}>
      <CloseIcon onClick={handleClose} />
      <MovieTitle>{title}</MovieTitle>
      <Player
        src={trailerURL}
        title='YouTube video player'
        frameborder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></Player>
    </Wrapper>
  );
};

export default YoutubePlayer;
