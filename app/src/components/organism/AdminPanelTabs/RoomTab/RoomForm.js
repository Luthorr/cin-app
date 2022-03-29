import React, { useRef, useReducer, useState } from 'react';
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
import {
  RoomWrapper,
  Legend,
  LegendElement,
  LegendText,
} from './RoomForm.style';

import { RectButton } from '../../../atoms/Button/RectButton';
import { OutlineButton } from '../../../atoms/Button/OutlineButton';
import RoomRow from '../../../molecules/RoomRow/RoomRow';
import ChairPreview from '../../../atoms/ChairPreview/ChairPreview';
import { useRoom } from '../../../../hooks/useRoom';
import { toast } from 'react-toastify';

const RoomForm = ({
  setShowForm,
  cinemas,
  editedRoom,
  setEditedRoom,
  setRooms,
}) => {
  const { postRoom, updateRoom } = useRoom();
  const cinemaRef = useRef(null);
  const [errors, setErrors] = useState({});

  const handleCancel = () => {
    setShowForm(false);
    setEditedRoom(null);
  };

  const initialState = {
    rows: 0,
    cols: 0,
    unavailableSeats: [],
    name: '',
    cinemaId: 0,
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

  const [room, dispatchRoom] = useReducer(
    reducer,
    editedRoom
      ? {
          rows: editedRoom.rows,
          cols: editedRoom.cols,
          unavailableSeats: JSON.parse(editedRoom.unavailableSeats),
          name: editedRoom.name,
          cinemaId: editedRoom.cinemaId,
          id: editedRoom.id,
        }
      : initialState
  );

  const handleTextDispatch = (e) => {
    const { name, value } = e.target;
    dispatchRoom({
      type: 'handleChange',
      payload: {
        name,
        value,
      },
    });
  };

  const handleNumberDispatch = (e) => {
    const { name, value } = e.target;
    dispatchRoom({
      type: 'handleChange',
      payload: {
        name,
        value: Number(value),
      },
    });
  };

  const renderRoom = () => {
    const array = [];
    for (let i = 0; i <= room.rows - 1; i += 1) {
      array.push(
        <RoomRow
          key={i}
          currentRow={i}
          cols={room.cols}
          unavailableSeats={room.unavailableSeats}
          dispatchRoom={dispatchRoom}
        />
      );
    }
    return array;
  };

  /*
    const initialState = {
    rows: 0,
    cols: 0,
    unavailableSeats: [],
    name: '',
    cinemaId: 0,
  };
  */

  const validateForm = () => {
    let isValidated = true;
    let errors = {};

    if (!room.name) {
      errors['name'] = 'Wprowadź nazwę sali';
      isValidated = false;
    }

    if (room.rows <= 0) {
      errors['rows'] = 'Wprowadź liczbę rzędów w sali';
      isValidated = false;
    } else if (!/^\d+$/.test(room.rows)) {
      errors['rows'] = 'Liczba rzędów może zawierać tylko liczby';
      isValidated = false;
    }

    if (room.cols <= 0) {
      errors['cols'] = 'Wprowadź liczbę kolumn w sali';
      isValidated = false;
    } else if (!/^\d+$/.test(room.cols)) {
      errors['cols'] = 'Liczba kolumn może zawierać tylko liczby';
      isValidated = false;
    }

    if (!room.cinemaId) {
      errors['cinemaId'] = 'Wybierz kino';
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
    if (editedRoom) {
      const resultFilmshow = await updateRoom(room);
      if (resultFilmshow) {
        setRooms((prevState) =>
          prevState.map((room) =>
            room.id !== resultFilmshow.id
              ? room
              : { ...room, ...resultFilmshow }
          )
        );
        setEditedRoom(null);
        toast.success('Rekord został pomyślnie zaktualizowany.');
        setShowForm(false);
      } else {
        toast.error(
          'Wystąpił błąd podczas aktualizacji rekordu.. Spróbuj ponownie.'
        );
      }
    } else {
      const addedRoom = await postRoom(room);
      if (addedRoom) {
        setRooms((prevState) => [addedRoom, ...prevState]);
        toast.success('Rekord został pomyślnie dodany.');
        setShowForm(false);
      } else {
        toast.error(
          'Wystąpił błąd podczas dodawania rekordu.. Spróbuj ponownie.'
        );
      }
    }
  };

  return (
    <Content>
      <Form onSubmit={handleSubmit}>
        <Group>
          <Label>Kino</Label>
          <Select
            ref={cinemaRef}
            name='cinemaId'
            value={room.cinemaId}
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
          <Label>Nazwa sali</Label>
          <Input
            type='text'
            placeholder='Wprowadź nazwę sali'
            name='name'
            value={room.name}
            onChange={handleTextDispatch}
          />
          {errors?.name && <ErrorText>{errors.name}</ErrorText>}
        </Group>
        <Group>
          <Label>Rzędów</Label>
          <Input
            type='number'
            placeholder='Wprowadź liczbę rzędów'
            name='rows'
            value={room.rows}
            onChange={handleNumberDispatch}
          />
          {errors?.rows && <ErrorText>{errors.rows}</ErrorText>}
        </Group>
        <Group>
          <Label>Kolumn</Label>
          <Input
            type='number'
            placeholder='Wprowadź liczbę kolumn'
            name='cols'
            value={room.cols}
            onChange={handleNumberDispatch}
          />
          {errors?.cols && <ErrorText>{errors.cols}</ErrorText>}
        </Group>

        {room.cols > 0 && room.rows > 0 && (
          <RoomWrapper>
            <>
              <p>Widok sali</p>
              {renderRoom()}
              <Legend>
                <LegendElement>
                  <ChairPreview chairState='available' cursorDisabled />
                  <LegendText>Dostępne</LegendText>
                </LegendElement>
                <LegendElement>
                  <ChairPreview chairState='reserved' cursorDisabled />
                  <LegendText>Wyłączone z użytku</LegendText>
                </LegendElement>
              </Legend>
            </>
          </RoomWrapper>
        )}

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

export default RoomForm;
