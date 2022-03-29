import styled from 'styled-components';
import { RectButton } from '../../atoms/Button/RectButton';
import { OutlineButton } from '../../atoms/Button/OutlineButton';

export const Wrapper = styled.div`
  margin-top: 7rem;
  background-color: var(--secondary);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2.5rem;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReviewOfMovie = styled.p`
  text-transform: uppercase;
  opacity: 0.8;
`;

export const MovieName = styled.span`
  color: var(--contrast);
  font-weight: 600;
`;

export const Title = styled.h1`
  font-family: 'Oswald', sans-serif;
  text-transform: uppercase;
`;

export const AuthorContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0.8rem 0;
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
`;

export const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
`;

export const UsernameText = styled.p`
  font-weight: 600;
  letter-spacing: 0.1rem;
`;

export const DateText = styled.p`
  font-style: italic;
  font-size: 0.7rem;
  opacity: 0.6;
`;

export const ReviewContainer = styled.div`
  max-width: 912px;
  padding: 1rem;
  margin: 0 auto;
  width: 100%;
  p {
    letter-spacing: 0.02rem;
    font-size: 1.25rem;

    &:first-child:first-letter {
      color: #c56433;
      float: left;
      font-family: Georgia;
      font-size: 75px;
      line-height: 60px;
      padding-top: 10px;
      padding-right: 8px;
      padding-left: 3px;
    }
  }
`;

export const ReviewText = styled.p`
  letter-spacing: 0.02rem;
  font-size: 1.25rem;

  &:first-child:first-letter {
    color: #c56433;
    float: left;
    font-family: Georgia;
    font-size: 75px;
    line-height: 60px;
    padding-top: 10px;
    padding-right: 8px;
    padding-left: 3px;
  }
`;

export const CommentsContent = styled(Content)`
  justify-content: flex-start;
`;

export const CommentsSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SectionHeader = styled.p`
  font-family: 'Oswald', sans-serif;
  font-size: 1.1rem;
  padding-bottom: 0.2rem;
  letter-spacing: 0.1rem;
`;

export const CreateReviewText = styled.p`
  cursor: pointer;
  opacity: 0.7;
  user-select: none;
`;

export const CommentsHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const CommentInput = styled.textarea`
  font-family: 'Work Sans', sans-serif;
  padding: 1rem;
  margin: 1rem 0;
  max-width: 1200px;
  /* min-width: 250px; */
  background-color: var(--secondary);
  color: var(--white);
  border: 2px solid rgba(255, 255, 255, 0.2);
  outline: 0px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-self: flex-end;
  column-gap: 0.5rem;
`;

export const CancelButton = styled(OutlineButton)`
  width: 130px;
  padding: 0;
  margin: 0;
`;

export const ConfirmButton = styled(RectButton)`
  width: 130px;
  padding: 0;
  margin: 0;
`;
