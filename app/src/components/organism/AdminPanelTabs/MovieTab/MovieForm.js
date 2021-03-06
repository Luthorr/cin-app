import React, { useReducer, useRef, useState } from 'react';
import { Content, Form } from '../Forms.style';
import {
  Group,
  Label,
  Input,
  TextArea,
  Select,
  Option,
  ButtonContainer,
  ErrorText,
} from '../../../atoms/Input/Input';
import { RectButton } from '../../../atoms/Button/RectButton';
import { OutlineButton } from '../../../atoms/Button/OutlineButton';
import { useMovie } from '../../../../hooks/useMovie';
import { toast } from 'react-toastify';
import { useYoutubeConverter } from '../../../../hooks/useYoutubeConverter';

const MovieForm = ({
  setShowForm,
  genres,
  setMovies,
  editedMovie,
  setEditedMovie,
}) => {
  const { postMovie, updateMovie } = useMovie();
  const { createPlayerURL } = useYoutubeConverter();
  const genreRef = useRef(null);
  const bgRef = useRef(null);
  const posterRef = useRef(null);
  const [errors, setErrors] = useState({});

  const handleCancel = () => {
    setShowForm(false);
    if (editedMovie) {
      setEditedMovie(null);
    }
  };

  const initialState = {
    title: '',
    duration: 0,
    minAge: 0,
    releaseDate: '',
    description: '',
    director: '',
    genreId: 0,
    posterImage: null,
    bgImage: null,
    trailerURL: '',
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'handleChange':
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      case 'reset':
        return initialState;
      default:
        return state;
    }
  };

  const [movie, dispatchMovie] = useReducer(
    reducer,
    editedMovie ? editedMovie : initialState
  );

  const handleTextDispatch = (e) => {
    const { name, value } = e.target;
    dispatchMovie({
      type: 'handleChange',
      payload: {
        name,
        value,
      },
    });
  };

  const handleNumberDispatch = (e) => {
    const { name, value } = e.target;
    dispatchMovie({
      type: 'handleChange',
      payload: {
        name,
        value: Number(value),
      },
    });
  };

  const handleFileDispatch = (e) => {
    const { name, files } = e.target;
    dispatchMovie({
      type: 'handleChange',
      payload: {
        name,
        value: files[0],
      },
    });
  };

  const validateForm = () => {
    let isValidated = true;
    let errors = {};
    if (!movie.title) {
      errors['title'] = 'Wprowad?? tytu?? filmu';
      isValidated = false;
    }
    if (!movie.director) {
      errors['director'] = 'Wprowad?? re??ysera filmu';
      isValidated = false;
    }

    if (movie.duration <= 0) {
      errors['duration'] = 'Wprowad?? czas trwania filmu';
      isValidated = false;
    } else if (!/^\d+$/.test(movie.duration)) {
      errors['duration'] = 'Czas trwania filmu mo??e zawiera?? tylko liczby';
      isValidated = false;
    }

    if (movie.minAge <= 0) {
      errors['minAge'] =
        'Wiek od kt??rego film mo??e zosta?? obejrzany musi zosta?? podany';
      isValidated = false;
    } else if (!/^\d+$/.test(movie.minAge)) {
      errors['minAge'] =
        'Wiek od kt??rego film mo??e zosta?? obejrzany mo??e zawiera?? tylko liczby';
      isValidated = false;
    }

    if (!movie.releaseDate) {
      errors['releaseDate'] = 'Wprowad?? dat?? wydania filmu';
      isValidated = false;
    }

    if (!movie.description) {
      errors['description'] = 'Wprowad?? d??u??szy opis filmu';
      isValidated = false;
    }

    if (!movie.genreId) {
      errors['genreId'] = 'Wybierz gatunek filmu';
      isValidated = false;
    }

    if (!movie.trailerURL) {
      errors['trailerURL'] = 'Wprowad?? link do traileru (YouTube)';
      isValidated = false;
    } else {
      const link = createPlayerURL(movie.trailerURL);
      if (!link) {
        errors['trailerURL'] = 'Podano niepoprawny link';
        isValidated = false;
      } else {
        dispatchMovie({
          type: 'handleChange',
          payload: { name: 'trailerURL', value: link },
        });
      }
    }

    if (!movie.bgImage) {
      errors['bgImage'] =
        'Wybierz z dysku obraz wysokiej rozdzielczo??ci promuj??cy film';
      isValidated = false;
    }

    if (!movie.posterImage) {
      errors['posterImage'] = 'Wybierz z dysku plakat promuj??cy film';
      isValidated = false;
    }

    setErrors(errors);
    return isValidated;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidated = validateForm();
    if (!isValidated) {
      return;
    }
    const link = createPlayerURL(movie.trailerURL);
    const movieWithEmbedPlayer = { ...movie, trailerURL: link };
    if (editedMovie) {
      const resultMovie = await updateMovie(movieWithEmbedPlayer);
      if (resultMovie) {
        setMovies((prevState) =>
          prevState.map((movie) =>
            movie.id !== resultMovie.id ? movie : { ...resultMovie }
          )
        );
        setEditedMovie(null);
        toast.success('Rekord zosta?? pomy??lnie zaktualizowany.');
        setShowForm(false);
      } else {
        toast.error(
          'Wyst??pi?? b????d podczas aktualizacji rekordu.. Spr??buj ponownie.'
        );
      }
    } else {
      const addedMovie = await postMovie(movieWithEmbedPlayer);
      if (addedMovie instanceof Object) {
        setMovies((prevState) => [...prevState, addedMovie]);
        toast.success('Rekord zosta?? pomy??lnie dodany.');
        setShowForm(false);
      } else {
        toast.error(
          'Wyst??pi?? b????d podczas dodawania rekordu.. Spr??buj ponownie.'
        );
      }
    }
  };

  return (
    <Content>
      <Form onSubmit={handleSubmit}>
        <Group>
          <Label>Tytu??</Label>
          <Input
            type='text'
            placeholder='Wprowad?? tytu??'
            name='title'
            value={movie.title}
            onChange={handleTextDispatch}
          />
          {errors?.title && <ErrorText>{errors.title}</ErrorText>}
        </Group>
        <Group>
          <Label>Re??yser</Label>
          <Input
            type='text'
            placeholder='Wprowad?? imi?? i nazwisko re??ysera'
            name='director'
            value={movie.director}
            onChange={handleTextDispatch}
          />
          {errors?.director && <ErrorText>{errors.director}</ErrorText>}
        </Group>
        <Group>
          <Label>Czas trwania</Label>
          <Input
            type='number'
            placeholder='Wprowad?? czas trwania'
            name='duration'
            value={movie.duration}
            onChange={handleNumberDispatch}
          />
          {errors?.duration && <ErrorText>{errors.duration}</ErrorText>}
        </Group>
        <Group>
          <Label>Wymagania wiekowe</Label>
          <Input
            type='number'
            placeholder='Wprowad?? czas trwania'
            name='minAge'
            value={movie.minAge}
            onChange={handleNumberDispatch}
          />
          {errors?.minAge && <ErrorText>{errors.minAge}</ErrorText>}
        </Group>
        <Group>
          <Label>Data wydania</Label>
          <Input
            type='date'
            name='releaseDate'
            value={movie.releaseDate}
            onChange={handleTextDispatch}
          />
          {errors?.releaseDate && <ErrorText>{errors.releaseDate}</ErrorText>}
        </Group>
        <Group>
          <Label>Opis filmu</Label>
          <TextArea
            rows={5}
            placeholder='Wprowad?? opis filmu'
            name='description'
            value={movie.description}
            onChange={handleTextDispatch}
          />
          {errors?.description && <ErrorText>{errors.description}</ErrorText>}
        </Group>
        <Group>
          <Label>Gatunek filmowy</Label>
          <Select
            ref={genreRef}
            name='genreId'
            onChange={handleNumberDispatch}
            value={movie.genreId}
          >
            <Option value='' hidden>
              Wybierz opcj??
            </Option>
            {genres.map(({ id, name }) => (
              <Option key={id} value={id}>{`${name}`}</Option>
            ))}
          </Select>
          {errors?.genreId && <ErrorText>{errors.genreId}</ErrorText>}
        </Group>
        <Group>
          <Label>URL trailera</Label>
          <Input
            type='text'
            placeholder='Podaj URL do trailera YouTube'
            name='trailerURL'
            value={movie.trailerURL}
            onChange={handleTextDispatch}
          />
          {errors?.trailerURL && <ErrorText>{errors.trailerURL}</ErrorText>}
        </Group>
        <Group>
          <Label>Obraz wysokiej rozdzielczo??ci</Label>
          <Input
            type='file'
            ref={bgRef}
            name='bgImage'
            onChange={handleFileDispatch}
          />
          {errors?.bgImage && <ErrorText>{errors.bgImage}</ErrorText>}
        </Group>
        <Group>
          <Label>Plakat</Label>
          <Input
            type='file'
            ref={posterRef}
            name='posterImage'
            onChange={handleFileDispatch}
          />
          {errors?.posterImage && <ErrorText>{errors.posterImage}</ErrorText>}
        </Group>
        <ButtonContainer>
          <OutlineButton type='button' onClick={handleCancel}>
            Anuluj
          </OutlineButton>
          <RectButton type='submit'>Zatwierd??</RectButton>
        </ButtonContainer>
      </Form>
    </Content>
  );
};

export default MovieForm;
