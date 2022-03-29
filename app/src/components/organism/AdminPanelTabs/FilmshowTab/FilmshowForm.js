/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useReducer, useEffect, useRef } from 'react';
import { Content, Form } from '../Forms.style';
import {
  Group,
  Label,
  Input,
  Select,
  Option,
  ButtonContainer,
  ErrorText,
} from '../../../atoms/Input/Input';
import moment from 'moment';
import { RectButton } from '../../../atoms/Button/RectButton';
import { OutlineButton } from '../../../atoms/Button/OutlineButton';
import { useRoom } from '../../../../hooks/useRoom';
import { useFilmshow } from '../../../../hooks/useFilmshow';
import ReactSelect from '../../../atoms/ReactSelect/ReactSelect';
import { toast } from 'react-toastify';

const FilmshowForm = ({
  setShowForm,
  cinemas,
  movies,
  editedFilmshow,
  setEditedFilmshow,
  setFilmshows,
}) => {
  const [rooms, setRooms] = useState([]);
  const cinemaRef = useRef(null);
  const roomRef = useRef(null);
  const [errors, setErrors] = useState({});

  const handleCancel = () => {
    setShowForm(false);
    setEditedFilmshow(null);
  };
  const { getRoomsByCinemaId } = useRoom();
  const { postFilmshow, updateFilmshow } = useFilmshow();

  const initialState = {
    cinemaId: 0,
    roomId: 0,
    movieId: 0,
    date: '',
    time: '',
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

  const [filmshow, dispatchFilmshow] = useReducer(
    reducer,
    editedFilmshow
      ? {
          cinemaId: editedFilmshow.cinemaId,
          roomId: editedFilmshow.roomId,
          movieId: editedFilmshow.movieId,
          date: editedFilmshow.playDate.split(' ')[0],
          time: editedFilmshow.playDate.split(' ')[1],
          id: editedFilmshow.id,
        }
      : initialState
  );

  // przy zmianie cinemaId
  useEffect(() => {
    (async () => {
      const roomsData = await getRoomsByCinemaId(filmshow.cinemaId);
      if (roomsData) {
        setRooms(roomsData);
      }
    })();
  }, [filmshow.cinemaId]);

  /*
  const initialState = {
    cinemaId: 0,
    roomId: 0,
    movieId: 0,
    date: '',
    time: '',
  };
  */

  const validateForm = () => {
    let isValidated = true;
    let errors = {};

    if (!filmshow.cinemaId) {
      errors['cinemaId'] = 'Wybierz kino';
      isValidated = false;
    }

    if (!filmshow.roomId) {
      errors['roomId'] = 'Wybierz salę filmową';
      isValidated = false;
    }

    if (!filmshow.movieId) {
      errors['movieId'] = 'Wybierz wystawiany film';
      isValidated = false;
    }

    if (!filmshow.date) {
      errors['date'] = 'Wprowadź datę seansu';
      isValidated = false;
    }

    if (!filmshow.time) {
      errors['time'] = 'Wprowadź godzinę seansu';
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
    if (editedFilmshow) {
      const resultFilmshow = await updateFilmshow(filmshow);
      if (resultFilmshow) {
        setFilmshows((prevState) =>
          prevState.map((filmshow) =>
            filmshow.id !== resultFilmshow.id ? filmshow : { ...resultFilmshow }
          )
        );
        setEditedFilmshow(null);
        toast.success('Rekord został pomyślnie zaktualizowany.');
        setShowForm(false);
      } else {
        toast.error(
          'Wystąpił błąd podczas aktualizacji rekordu.. Spróbuj ponownie.'
        );
      }
    } else {
      const addedFilmshow = await postFilmshow(filmshow);
      if (addedFilmshow) {
        setFilmshows((prevState) => [{ ...addedFilmshow }, ...prevState]);
        toast.success('Rekord został pomyślnie dodany.');
        setShowForm(false);
      } else {
        toast.error(
          'Wystąpił błąd podczas dodawania rekordu.. Spróbuj ponownie.'
        );
      }
    }
  };

  const handleTextDispatch = (e) => {
    const { name, value } = e.target;
    dispatchFilmshow({
      type: 'handleChange',
      payload: {
        name,
        value,
      },
    });
  };

  const handleMovieDispatch = (e, name) => {
    const { value } = e;
    dispatchFilmshow({
      type: 'handleChange',
      payload: {
        name,
        value: Number(value),
      },
    });
  };

  const handleNumberDispatch = (e) => {
    const { value, name } = e.target;
    dispatchFilmshow({
      type: 'handleChange',
      payload: {
        name,
        value: Number(value),
      },
    });
  };

  const moviesOptions = movies.map(({ id, title }) => ({
    value: id,
    label: title,
  }));

  return (
    <Content>
      <Form onSubmit={handleSubmit}>
        <Group>
          <Label>Kino</Label>
          <Select
            ref={cinemaRef}
            name='cinemaId'
            value={filmshow.cinemaId}
            onChange={handleNumberDispatch}
          >
            <Option hidden>Wybierz opcję</Option>
            {cinemas.map(({ id, cityName, street }) => (
              <Option key={id} value={id}>
                {`${cityName}, ${street}`}
              </Option>
            ))}
          </Select>
          {errors?.cinemaId && <ErrorText>{errors.cinemaId}</ErrorText>}
        </Group>
        <Group>
          <Label>Sala</Label>
          <Select
            disabled={!filmshow.cinemaId}
            ref={roomRef}
            name='roomId'
            value={filmshow.roomId}
            onChange={handleNumberDispatch}
          >
            <Option hidden>Wybierz salę</Option>
            {rooms.map(({ id, name }) => (
              <Option key={id} value={id}>{`${name}`}</Option>
            ))}
          </Select>
          {errors?.roomId && <ErrorText>{errors.roomId}</ErrorText>}
        </Group>
        <Group>
          <Label>Film</Label>
          <ReactSelect
            options={moviesOptions}
            placeholder='Wybierz film'
            name='movieId'
            value={moviesOptions.filter(
              (option) => option.value === filmshow?.movieId
            )}
            onChangeAction={handleMovieDispatch}
          />
          {/* <Select
            ref={movieRef}
            name='movieId'
            value={filmshow.movieId}
            onChange={handleNumberDispatch}
          >
            <Option hidden>Wybierz opcję</Option>
            {movies.map(({ id, title }) => (
              <Option key={id} value={id}>{`${title}`}</Option>
            ))}
          </Select> */}
          {errors?.movieId && <ErrorText>{errors.movieId}</ErrorText>}
        </Group>
        <Group>
          <Label>Data</Label>
          <Input
            type='date'
            name='date'
            value={filmshow.date}
            min={moment().format('YYYY-MM-DD')}
            onChange={handleTextDispatch}
          />
          {errors?.date && <ErrorText>{errors.date}</ErrorText>}
        </Group>
        <Group>
          <Label>Godzina</Label>
          <Input
            type='time'
            name='time'
            value={filmshow.time}
            onChange={handleTextDispatch}
          />
          {errors?.time && <ErrorText>{errors.time}</ErrorText>}
        </Group>

        <ButtonContainer>
          <OutlineButton type='button' onClick={handleCancel}>
            Anuluj
          </OutlineButton>
          <RectButton type='submit'>Zatwierdź</RectButton>
        </ButtonContainer>
      </Form>
    </Content>
  );
};

export default FilmshowForm;
