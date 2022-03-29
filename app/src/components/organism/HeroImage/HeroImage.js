import React from 'react';
import { Wrapper, Content, BGImage } from './HeroImage.style';

const HeroImage = ({ children, image, height = 700 }) => {
  return (
    <Wrapper height={height}>
      <BGImage src={image} />
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default HeroImage;
