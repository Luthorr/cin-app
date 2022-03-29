import React, { useState } from 'react';
import { OrangeLine } from '../../../atoms/Lines/Lines';

import {
  Wrapper,
  Content,
  Heading,
  Group,
  Label,
  Text,
  ImportantText,
  Input,
  ConfirmButton,
} from '../UserProfileTabs.style';

import { useUser } from '../../../../hooks/useUser';
import { useAuth } from '../../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { ErrorText } from '../../../atoms/ErrorText/ErrorText';

const EmailTab = () => {
  const { updatePassword } = useUser();
  const [errors, setErrors] = useState({});
  const { user } = useAuth();

  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const validateForm = () => {
    let isValidated = true;
    let errors = {};

    const newPasswordValidation = validatePassword(
      newPassword,
      'newPassword',
      errors
    );
    const oldPasswordValidation = validatePassword(
      oldPassword,
      'oldPassword',
      errors
    );
    const repeatedPasswordValidation = validatePassword(
      repeatedPassword,
      'repeatedPassword',
      errors
    );
    if (
      !newPasswordValidation ||
      !oldPasswordValidation ||
      !repeatedPasswordValidation
    ) {
      isValidated = false;
    }
    setErrors(errors);
    return isValidated;
  };

  const validatePassword = (password, labelName, errors) => {
    const passwordRegExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (!password) {
      errors[labelName] = 'Wprowadź wymagane hasło';
      return false;
    } else if (!password.match(passwordRegExp)) {
      errors[labelName] =
        'Hasło musi zawierać od 8 do 15 znaków, jedną wielką literę, numer i znak specjalny.';
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidated = validateForm();
    if (isValidated) {
      if (newPassword === repeatedPassword) {
        const response = await updatePassword(
          user.id,
          newPassword,
          oldPassword
        );
        if (response) {
          setNewPassword('');
          setOldPassword('');
          setRepeatedPassword('');
          toast.success('Profil został pomyślnie zaktualizowany.');
        } else {
          toast.error('Wystąpił błąd przy aktualizacji profilu.');
        }
      } else {
        setErrors({
          notMatchingPassword:
            'Podane przez Ciebie nowe hasła, różnią się od siebie.',
        });
      }
    }
  };

  return (
    <Wrapper>
      <Content onSubmit={handleSubmit}>
        <Heading>Zmień hasło</Heading>
        <OrangeLine />
        <Group>
          <Label>
            Aktualne hasło <ImportantText>WYMAGANE</ImportantText>
          </Label>
          <Input
            type='password'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          {errors.oldPassword && <ErrorText>{errors.oldPassword}</ErrorText>}
          <Text>Aby upewnić się, że ta zmiana jest bezpieczna</Text>
        </Group>
        <Group>
          <Label>
            Nowe hasło <ImportantText>WYMAGANE</ImportantText>
          </Label>
          <Input
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {errors.newPassword && <ErrorText>{errors.newPassword}</ErrorText>}
        </Group>
        <Group>
          <Label>
            Potwierdź nowe hasło <ImportantText>WYMAGANE</ImportantText>
          </Label>
          <Input
            type='password'
            value={repeatedPassword}
            onChange={(e) => setRepeatedPassword(e.target.value)}
          />
        </Group>
        {errors.repeatedPassword && (
          <ErrorText>{errors.repeatedPassword}</ErrorText>
        )}
        {errors.notMatchingPassword && (
          <ErrorText>{errors.notMatchingPassword}</ErrorText>
        )}
        <ConfirmButton type='submit'>Zapisz</ConfirmButton>
      </Content>
    </Wrapper>
  );
};

export default EmailTab;
