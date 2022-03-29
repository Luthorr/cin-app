import React, { useState } from 'react';
import {
  Wrapper,
  Container,
  Content,
  NarrowerColumn,
  Logo,
  Form,
  FormInput,
  Heading,
  InputWrapper,
  Icon,
  Button,
  Group,
} from './Login.style';
import { Redirect } from 'react-router-dom';
import LogoTest from '../../../images/img-01.png';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuth } from '../../../hooks/useAuth';
import { ErrorText } from '../../atoms/ErrorText/ErrorText';

const Login = () => {
  const initialErrors = { email: '', password: '', badData: '' };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, signIn } = useAuth();
  const [errors, setErrors] = useState(initialErrors);

  const validateForm = () => {
    let isValidated = true;
    let errors = { ...initialErrors };

    if (!email) {
      errors['email'] = 'Wprowadź email powiązany z kontem';
      isValidated = false;
    }

    if (!password) {
      errors['password'] = 'Wprowadź hasło';
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
    const resposne = await signIn(email, password);
    if (!resposne) {
      setErrors((prevState) => ({
        ...prevState,
        badData: 'Podano nieprawidłowe dane logowania.',
      }));
    }
  };

  return (
    <>
      {user === null ? (
        <Wrapper>
          <Container>
            <Content>
              <NarrowerColumn>
                <Logo src={LogoTest} />
              </NarrowerColumn>
              <Form onSubmit={handleSubmit}>
                <Heading>ZALOGUJ SIĘ</Heading>
                <Group>
                  <InputWrapper>
                    <FormInput
                      type='email'
                      placeholder='Wprowadź email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      isValidated={errors.email ? false : true}
                    />
                    <Icon>
                      <FaEnvelope />
                    </Icon>
                  </InputWrapper>
                  {errors.email && <ErrorText>{errors.email}</ErrorText>}
                </Group>
                <Group>
                  <InputWrapper>
                    <Icon>
                      <FaLock />
                    </Icon>
                    <FormInput
                      type='password'
                      placeholder='Wprowadź hasło'
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      isValidated={errors.password ? false : true}
                    />
                  </InputWrapper>
                  {errors.password && <ErrorText>{errors.password}</ErrorText>}
                </Group>
                <Button type='submit'>Zaloguj</Button>
                {errors.badData && (
                  <ErrorText>Podano niepoprawne dane logowania.</ErrorText>
                )}
              </Form>
            </Content>
          </Container>
        </Wrapper>
      ) : (
        <Redirect to='/' />
      )}
    </>
  );
};

export default Login;
