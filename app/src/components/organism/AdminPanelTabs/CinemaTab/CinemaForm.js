import React, { useState } from 'react';
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
import { RectButton } from '../../../atoms/Button/RectButton';
import { OutlineButton } from '../../../atoms/Button/OutlineButton';
import { useCinema } from '../../../../hooks/useCinema';
import { toast } from 'react-toastify';

const CinemaForm = ({
  setShowForm,
  editedCinema,
  setEditedCinema,
  setCinemas,
  cities,
}) => {
  const [cityId, setCityId] = useState(editedCinema ? editedCinema.cityId : 0);
  const [street, setStreet] = useState(editedCinema ? editedCinema.street : '');
  const [errors, setErrors] = useState({});
  const { postCinema, updateCinema } = useCinema();

  const handleCityChange = (e) => {
    setCityId(Number(e.target.value));
  };

  const handleStreetChange = (e) => {
    setStreet(e.target.value);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditedCinema(null);
  };

  const validateForm = () => {
    let isValidated = true;
    let errors = {};
    if (!street) {
      errors['street'] = 'Wprowadź adres kina';
      isValidated = false;
    }

    if (!cityId) {
      errors['cityId'] = 'Wybierz miejscowość';
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
    if (editedCinema) {
      const resultCinema = await updateCinema({
        cityId,
        street,
        id: editedCinema.id,
      });
      if (resultCinema) {
        setCinemas((prevState) =>
          prevState.map((cinema) =>
            cinema.id !== resultCinema.id ? cinema : resultCinema
          )
        );
        setEditedCinema(null);
        toast.success('Rekord został pomyślnie zaktualizowany.');
        setShowForm(false);
      } else {
        toast.error(
          'Wystąpił błąd podczas aktualizacji rekordu.. Spróbuj ponownie.'
        );
      }
    } else {
      const addedCinema = await postCinema(cityId, street);
      if (addedCinema) {
        setCinemas((prevState) => [...prevState, addedCinema]);
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
          <Label>Miejscowość</Label>
          <Select value={cityId} onChange={handleCityChange}>
            <Option hidden>Wybierz opcję</Option>
            {cities.map(({ id, name }) => (
              <Option key={id} value={id}>
                {`${name}`}
              </Option>
            ))}
          </Select>
          {errors?.cityId && <ErrorText>{errors.cityId}</ErrorText>}
        </Group>
        <Group>
          <Label>Adres kina</Label>
          <Input
            type='text'
            placeholder='Wprowadź adres kina'
            value={street}
            onChange={handleStreetChange}
          />
          {errors?.street && <ErrorText>{errors.street}</ErrorText>}
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

export default CinemaForm;
