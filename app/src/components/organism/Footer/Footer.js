import React from 'react';
import {
  Wrapper,
  Content,
  Row,
  ContentInColumns,
  Logo,
  ContentInRows,
  Icon,
  IconContainer,
} from './Footer.style';
import logo from '../../../images/cinema.png';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { ReactLink } from '../../atoms/ReactLink/ReactLink';

const Footer = () => {
  return (
    <Wrapper>
      <Content>
        <Row>
          <ContentInRows>
            <Logo src={logo} />
            <p>Przemysław Stupak &copy;</p>
          </ContentInRows>
        </Row>
        <Row>
          <ContentInColumns>
            <ReactLink to='/'>
              <p>GŁÓWNA</p>
            </ReactLink>
            <ReactLink to='/movies'>
              <p>FILMY</p>
            </ReactLink>
            <ReactLink to='/filmshows'>
              <p>SEANSE</p>
            </ReactLink>
            <ReactLink to='/news'>
              <p>NEWS</p>
            </ReactLink>
          </ContentInColumns>
        </Row>
        <Row>
          <IconContainer>
            <Icon>
              <FaFacebook />
            </Icon>
            <Icon>
              <FaInstagram />
            </Icon>
            <Icon>
              <FaTwitter />
            </Icon>
          </IconContainer>
        </Row>
      </Content>
    </Wrapper>
  );
};

export default Footer;
