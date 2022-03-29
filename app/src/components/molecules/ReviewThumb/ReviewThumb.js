import React from 'react';
import {
  Wrapper,
  Container,
  Content,
  ProfilePicture,
  ReviewText,
  DateText,
  UsernameText,
} from './ReviewThumb.style';
import parse from 'html-react-parser';
import placeholderImage from '../../../images/img-01.png';
import { useStringFormatter } from '../../../hooks/useStringFormatter';
import { ReactLink } from '../../atoms/ReactLink/ReactLink';

const ReviewThumb = ({
  review: { content, creationDate, id, title, user: { userName, image } = {} },
}) => {
  /*
{
  content = '',
  creationDate,
  id,
  title,
  user: { userName, image } = {},
}
  */
  const { shortenString } = useStringFormatter();
  const shortenedReview = shortenString(content, 200);
  return (
    <Wrapper>
      <ReactLink to={`/review/${id}`}>
        <Container>
          {image ? (
            <ProfilePicture src={image} />
          ) : (
            <ProfilePicture src={placeholderImage} />
          )}
          <Content>
            <>
              <UsernameText>{userName}</UsernameText>
              <DateText>
                <em>Napisano dnia: {creationDate}</em>
              </DateText>
            </>
            <h3>{title}</h3>
            <ReviewText>{parse(shortenedReview)}</ReviewText>
          </Content>
        </Container>
      </ReactLink>
    </Wrapper>
  );
};

export default ReviewThumb;
