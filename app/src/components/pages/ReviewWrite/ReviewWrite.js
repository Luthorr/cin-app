/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ErrorText, Group, Input, Label } from '../../atoms/Input/Input';
import { Wrapper, Content, Heading, MovieName } from './ReviewWrite.style';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { RectButton } from '../../atoms/Button/RectButton';
import { useMovie } from '../../../hooks/useMovie';
import Spinner from '../../atoms/Spinner/Spinner';
import { useReview } from '../../../hooks/useReview';
import { useAuth } from '../../../hooks/useAuth';
import { ReactLink } from '../../atoms/ReactLink/ReactLink';

const ReviewWrite = () => {
  const [movie, setMovie] = useState({});
  const { movieId, reviewId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const { getMovieById } = useMovie();
  const { getReviewById, postReview, updateReview } = useReview();
  const { user } = useAuth();
  let history = useHistory();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const movieData = await getMovieById(movieId);
      if (movieData) {
        setMovie(movieData);
      } else {
        history.push('/not-found');
      }
      if (isReviewBeingEdited()) {
        const reviewData = await getReviewById(reviewId);
        if (reviewData) {
          setTitle(reviewData.title);
          setContent(reviewData.content);
        } else {
          history.push('/not-found');
        }
      }
      setIsLoading(false);
    })();
  }, []);

  const handleEditorChange = (e, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  const isReviewBeingEdited = () => {
    if (reviewId !== undefined && reviewId) return true;
    return false;
  };

  const validateForm = () => {
    let isValidated = true;
    let errors = {};

    if (!title) {
      errors['title'] = 'Wprowadź tytuł recenzji';
      isValidated = false;
    }

    if (!content) {
      errors['content'] = 'Wprowadź zawartość recenzji';
      isValidated = false;
    }

    setErrors(errors);
    return isValidated;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isReviewBeingEdited()) {
      const isValidated = validateForm();
      if (!isValidated) {
        return;
      }
      const responseResult = await updateReview(reviewId, title, content);
      if (responseResult) {
        history.push(`/review/${reviewId}`);
      }
    } else {
      const isValidated = validateForm();
      if (!isValidated) {
        return;
      }
      const createdReview = await postReview(movie.id, user.id, title, content);
      if (createdReview) {
        history.push(`/review/${createdReview.id}`);
      }
    }
  };

  const { title: movieTitle, releaseDate } = movie;

  return (
    <Wrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <Content onSubmit={handleSubmit}>
          <ReactLink to={`/movie-details/${movieId}`}>
            <Heading>
              Recenzja filmu{' '}
              <MovieName>
                {movieTitle} ({releaseDate?.split('-')[0]})
              </MovieName>
            </Heading>
          </ReactLink>
          <Group>
            <Label>Tytuł</Label>
            <Input type='text' value={title} onChange={handleTitleChange} />
            {errors?.title && <ErrorText>{errors.title}</ErrorText>}
          </Group>
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={handleEditorChange}
          />
          {errors?.content && <ErrorText>{errors.content}</ErrorText>}
          <RectButton type='submit'>
            {isReviewBeingEdited() ? 'Zapisz zmiany' : 'Dodaj recenzję'}
          </RectButton>
        </Content>
      )}
    </Wrapper>
  );
};

export default ReviewWrite;
