/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import {
  Content,
  Wrapper,
  Title,
  Header,
  ReviewOfMovie,
  MovieName,
  AuthorContainer,
  AuthorInfo,
  ProfilePicture,
  UsernameText,
  DateText,
  ReviewContainer,
  CommentsSection,
  SectionHeader,
  CommentsContent,
  CommentsHeader,
  CreateReviewText,
  CommentInput,
  ButtonContainer,
  CancelButton,
  ConfirmButton,
} from './ReviewDetails.style';
import placeholderImage from '../../../images/img-01.png';
import { OrangeLine } from '../../atoms/Lines/Lines';
import Comment from '../../molecules/Comment/Comment';
import { useParams, useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
import { usePost } from '../../../hooks/usePost';
import { useReview } from '../../../hooks/useReview';
import { useAuth } from '../../../hooks/useAuth';
import Spinner from '../../atoms/Spinner/Spinner';
import { SpinnerContainer } from '../AdminPanel/AdminPanel.style';
import { ReactLink } from '../../atoms/ReactLink/ReactLink';
import { OutlineButton } from '../../atoms/Button/OutlineButton';
import { ErrorText } from '../../atoms/ErrorText/ErrorText';
import Pagination from '../../atoms/Pagination/Pagination';
import { commentsPerPage } from '../../../constants';
import { usePagination } from '../../../hooks/usePagination';
import { toast } from 'react-toastify';
import { RectButton } from '../../atoms/Button/RectButton';

const ReviewDetails = () => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');
  const [editedComment, setEditedComment] = useState(null);
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);
  const [errors, setErrors] = useState({});
  const { user } = useAuth();
  const { getReviewById, updateReviewPoints, deleteReview } = useReview();
  const { getPostsByReviewId, postForumPost, deletePost, updatePost } =
    usePost();
  const { paginate, currentPage } = usePagination();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const commentRef = useRef(null);
  let history = useHistory();

  const {
    title,
    creationDate,
    content = '',
    isRated,
    movie: { id: movieId, releaseDate, movieTitle } = {},
    user: { creatorId, userName, image } = {},
  } = review;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const reviewData = await getReviewById(id);
      if (reviewData) {
        setReview(reviewData);
      } else {
        history.push('/not-found');
      }
      const postsData = await getPostsByReviewId(id);
      if (postsData) {
        setComments(postsData);
      }
      setIsLoading(false);
    })();
  }, []);

  const validateComment = () => {
    let isValidated = true;
    let errors = {};

    if (!comment) {
      errors['comment'] = 'Wprowadź treść komentarza';
      isValidated = false;
    }
    setErrors(errors);
    return isValidated;
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (editedComment) {
      const isValid = validateComment();
      if (isValid) {
        const response = await updatePost(editedComment.id, comment);
        if (response) {
          setComments((prevState) =>
            prevState.map((com) =>
              com.id !== editedComment.id ? com : response
            )
          );
          setEditedComment(null);
          setComment('');
          setShowCommentInput(false);
          toast.success('Komentarz został zedytowany.');
        }
      }
      return;
    } else {
      const isValid = validateComment();
      if (isValid) {
        const postedPost = await postForumPost(user.id, id, comment);
        if (postedPost) {
          setComments((prevState) => [...prevState, postedPost]);
          setComment('');
          setShowCommentInput(false);
          toast.success('Komentarz został dodany.');
        }
      }
      return;
    }
  };

  const handlePointAssignment = async (e) => {
    e.preventDefault();
    const wasUpdated = await updateReviewPoints(
      id,
      !isRated,
      review.user.creatorId
    );
    if (wasUpdated) {
      setReview((prevState) => ({ ...prevState, isRated: !isRated }));
    }
  };

  const handleCancel = () => {
    setShowCommentInput(false);
    setComment('');
  };

  const handleReviewDeletion = async (e) => {
    e.preventDefault();
    const answer = window.confirm('Czy chcesz usunąć wybraną recenzję?');
    if (answer) {
      const result = await deleteReview(id);
      if (result) {
        history.push(`/movie-details/${movieId}`);
      }
    }
  };

  const handleCommentDeletion = async (id) => {
    const confirmResult = window.confirm(
      'Czy chcesz usunąć wybrany komentarz?'
    );
    if (confirmResult) {
      const result = await deletePost(id);
      if (result) {
        setComments((prevState) => prevState.filter((com) => com.id !== id));
        toast.success('Komentarz został usunięty');
      }
    }
  };

  const handleCommentEditionStart = async (comment) => {
    await setShowCommentInput(true);
    commentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setEditedComment(comment);
    setComment(comment.content);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <>
          <Content>
            <Header>
              <ReviewOfMovie>
                Recenzja filmu{' '}
                <ReactLink to={`/movie-details/${movieId}`}>
                  <MovieName>
                    {movieTitle} ({releaseDate?.split('-')[0]})
                  </MovieName>
                </ReactLink>
              </ReviewOfMovie>
              <Title>{title}</Title>
              <AuthorContainer>
                <ProfilePicture src={image ? image : placeholderImage} />
                <AuthorInfo>
                  <>
                    <UsernameText>{userName}</UsernameText>
                    <DateText>
                      <em>Napisano: {creationDate}</em>
                    </DateText>
                  </>
                </AuthorInfo>
              </AuthorContainer>
            </Header>
          </Content>
          <OrangeLine />
          <Content>
            <ReviewContainer>{parse(content)}</ReviewContainer>
            {(user?.role === 2 || user?.id === creatorId) && (
              <ButtonContainer>
                {user?.role === 2 && (
                  <RectButton onClick={handlePointAssignment}>
                    {!isRated ? 'Przyznaj punkt' : 'Odbierz punkt'}
                  </RectButton>
                )}
                <ReactLink to={`/review-edit/${movieId}/${id}`}>
                  <OutlineButton type='button'>Edytuj</OutlineButton>
                </ReactLink>
                <OutlineButton type='button' onClick={handleReviewDeletion}>
                  Usuń
                </OutlineButton>
              </ButtonContainer>
            )}
          </Content>
          <OrangeLine />
          <CommentsContent>
            <CommentsSection>
              <CommentsHeader>
                <SectionHeader>KOMENTARZE ({comments.length})</SectionHeader>
                {user && (
                  <CreateReviewText
                    onClick={() => setShowCommentInput(!showCommentInput)}
                  >
                    Napisz komentarz
                  </CreateReviewText>
                )}
              </CommentsHeader>
              {showCommentInput && (
                <>
                  <CommentInput
                    ref={commentRef}
                    rows={8}
                    placeholder='Wprowadź swój komentarz...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <ErrorText>{errors.comment}</ErrorText>

                  <ButtonContainer>
                    <CancelButton type='button' onClick={handleCancel}>
                      Anuluj
                    </CancelButton>
                    <ConfirmButton type='button' onClick={handleCommentSubmit}>
                      Zatwierdź
                    </ConfirmButton>
                  </ButtonContainer>
                </>
              )}
              {comments.length > 0 ? (
                <>
                  {comments
                    .slice(
                      commentsPerPage * (currentPage - 1),
                      currentPage * commentsPerPage
                    )
                    .map((com) => (
                      <Comment
                        key={com.id}
                        value={com}
                        handleCommentDeletion={handleCommentDeletion}
                        handleCommentEditionStart={handleCommentEditionStart}
                      />
                    ))}
                  <Pagination
                    postsPerPage={commentsPerPage}
                    totalPosts={comments.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </>
              ) : (
                <h4>
                  Aktualnie brak komentarzy do wyświetlenia. Skomentuj, aby być
                  pierwszy!
                </h4>
              )}
            </CommentsSection>
          </CommentsContent>
        </>
      )}
    </Wrapper>
  );
};

export default ReviewDetails;
