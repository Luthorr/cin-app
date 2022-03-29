import React from 'react';
import PropTypes from 'prop-types';
import {
  BlogImage,
  Container,
  ImageContainer,
  InfoContainer,
  LearnMore,
  NewsHeading,
  NewsShortenedInfo,
  ArrowIcon,
  NewsDate,
} from './NewsCard.style';
import parse from 'html-react-parser';
import { useStringFormatter } from '../../../hooks/useStringFormatter';
import { ReactLink } from '../../atoms/ReactLink/ReactLink';

const NewsCard = ({ post: { id, image, title, content, creationDate } }) => {
  const { shortenString } = useStringFormatter();
  const shortenedContent = shortenString(content, 200);

  return (
    <ReactLink to={`/news-details/${id}`}>
      <Container>
        <ImageContainer>
          <BlogImage src={image} />
        </ImageContainer>
        <InfoContainer>
          <NewsHeading>{title}</NewsHeading>
          <NewsDate>{creationDate}</NewsDate>
          <NewsShortenedInfo>{parse(shortenedContent)}</NewsShortenedInfo>
          <LearnMore>
            Czytaj więcej <ArrowIcon />
          </LearnMore>
        </InfoContainer>
      </Container>
    </ReactLink>
  );
};

NewsCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default NewsCard;
