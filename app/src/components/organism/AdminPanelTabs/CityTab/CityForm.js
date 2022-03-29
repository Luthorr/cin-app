import React, { useState } from 'react';
import { Content, Form } from '../Forms.style';
import {
  Group,
  Label,
  Input,
  ButtonContainer,
  ErrorText,
} from '../../../atoms/Input/Input';
import { RectButton } from '../../../atoms/Button/RectButton';
import { OutlineButton } from '../../../atoms/Button/OutlineButton';
import { useCity } from '../../../../hooks/useCity';
import { toast } from 'react-toastify';

const CityForm = ({ setShowForm, editedCity, setEditedCity, setCities }) => {
  const handleCancel = () => {
    setShowForm(false);
    setEditedCity(null);
  };

  const { postCity, updateCity } = useCity();
  const [errors, setErrors] = useState({});

  const [name, setName] = useState(editedCity ? editedCity.name : '');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const validateForm = () => {
    let isValidated = true;
    let errors = {};
    if (!name) {
      errors['name'] = 'Wprowadź nazwę miejscowości';
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
    if (editedCity) {
      const resultCity = await updateCity({ id: editedCity.id, name });
      if (resultCity) {
        setCities((prevState) =>
          prevState.map((city) =>
            city.id !== resultCity.id ? city : { ...resultCity }
          )
        );
        setEditedCity(null);
        toast.success('Rekord został pomyślnie zaktualizowany.');
        setShowForm(false);
      } else {
        toast.error(
          'Wystąpił błąd podczas aktualizacji rekordu.. Spróbuj ponownie.'
        );
      }
    } else {
      const addedCity = await postCity(name);
      if (addedCity) {
        setCities((prevState) => [...prevState, addedCity]);
        toast.success('Rekord został pomyślnie dodany.');
        setShowForm(false);
      }
    }
  };

  return (
    <Content>
      <Form onSubmit={handleSubmit}>
        <Group>
          <Label>Nazwa miejscowości</Label>
          <Input
            type='text'
            placeholder='Wprowadź nazwę miejscowości'
            value={name}
            onChange={handleNameChange}
          />
          {errors?.name && <ErrorText>{errors.name}</ErrorText>}
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

export default CityForm;
