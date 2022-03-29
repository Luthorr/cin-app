import React from 'react';
import { Container, Content, Wrapper } from './PageNotFound.style';

const PageNotFound = () => {
  return (
    <Wrapper>
      <Container>
        <Content>
          <h3>Ups! Coś poszło nie tak...</h3>
          <h1>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
        </Content>
        <h2>strona, na którą próbowałeś wejść, nie została odnaleziona.</h2>
      </Container>
    </Wrapper>
  );
};

export default PageNotFound;
