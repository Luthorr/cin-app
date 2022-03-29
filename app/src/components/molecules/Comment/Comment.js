import React from 'react';
import {
  Container,
  ProfilePicture,
  Content,
  UsernameText,
  DateText,
  ReviewText,
  ButtonContainer,
  SmallButton,
} from './Comment.style';
import placeholderImage from '../../../images/img-01.png';
import { useAuth } from '../../../hooks/useAuth';

const Comment = ({
  value,
  value: {
    id: comId,
    content,
    creationDate,
    user: { id: userId, userName, image },
  },
  handleCommentDeletion,
  handleCommentEditionStart,
}) => {
  const { user } = useAuth();

  const handleDeletion = (e) => {
    e.preventDefault();
    handleCommentDeletion(comId);
  };

  const handleEdition = (e) => {
    e.preventDefault();
    handleCommentEditionStart(value);
  };

  return (
    <Container>
      <ProfilePicture src={image ? image : placeholderImage} />
      <Content>
        <>
          <UsernameText>{userName}</UsernameText>
          <DateText>
            <em>Napisano dnia: {creationDate}</em>
          </DateText>
        </>
        <ReviewText>{content}</ReviewText>
        {user && (
          <ButtonContainer>
            {(user.id === userId || user.role === 2) && (
              <SmallButton type='button' onClick={handleEdition}>
                Edytuj
              </SmallButton>
            )}
            {(user.id === userId || user.role === 2) && (
              <SmallButton type='button' onClick={handleDeletion}>
                Usuń
              </SmallButton>
            )}
          </ButtonContainer>
        )}
      </Content>
    </Container>
  );
};

export default Comment;
