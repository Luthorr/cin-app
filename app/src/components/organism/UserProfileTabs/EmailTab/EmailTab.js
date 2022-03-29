import React, { useState } from 'react';
import { OrangeLine } from '../../../atoms/Lines/Lines';

import {
  Wrapper,
  Content,
  Heading,
  Group,
  Label,
  Value,
  Text,
  ImportantText,
  Input,
  ConfirmButton,
} from '../UserProfileTabs.style';
import { useAuth } from '../../../../hooks/useAuth';
import { useUser } from '../../../../hooks/useUser';
import { toast } from 'react-toastify';
import { ErrorText } from '../../../atoms/ErrorText/ErrorText';

const EmailTab = () => {
  const [newEmail, setNewEmail] = useState('');
  const [errors, setErrors] = useState({});
  const { user, setUser } = useAuth();
  const { updateEmail } = useUser();
  const { email } = user;

  const handleInputChange = (e) => {
    setNewEmail(e.target.value);
  };

  const validateForm = () => {
    let isValidated = true;
    let errors = {};

    if (!newEmail) {
      errors['newEmail'] = 'Wprowadź nowy email do powiązania z kontem';
      isValidated = false;
    }

    setErrors(errors);
    return isValidated;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidated = validateForm();
    if (isValidated) {
      const response = await updateEmail(user.id, newEmail);
      if (response.status) {
        setUser((prevState) => ({ ...prevState, email: newEmail }));
        toast.success('Profil został pomyślnie zaktualizowany.');
        setNewEmail('');
      } else {
        setErrors({ newEmail: response.message });
        toast.error(response.message);
      }
    }
  };

  return (
    <Wrapper>
      <Content onSubmit={handleSubmit}>
        <Heading>Zmień adres email</Heading>
        <OrangeLine />
        <Group>
          <Label>Aktualny adres email</Label>
          <Value>{email}</Value>
        </Group>
        <Group>
          <Label>
            Nowy adres email <ImportantText>WYMAGANE</ImportantText>
          </Label>
          <Input
            type='email'
            placeholder='Nowy adres email'
            value={newEmail}
            onChange={handleInputChange}
          />
          {errors.newEmail && <ErrorText>{errors.newEmail}</ErrorText>}
          <Text>
            Podaj nowy adres email, który chcesz powiązać ze swoim kontem
          </Text>
        </Group>
        <ConfirmButton type='submit'>Zapisz</ConfirmButton>
      </Content>
    </Wrapper>
  );
};

export default EmailTab;
