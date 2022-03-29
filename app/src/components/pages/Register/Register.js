import React, { useReducer, useState } from 'react';
import {
  Wrapper,
  Container,
  Content,
  Form,
  FormInput,
  Heading,
  InputWrapper,
  Icon,
  Button,
  Group,
  SuccessDiv,
  SuccessMessage,
  SuccessText,
  RegisterLogo,
} from '../Register/Register.style';
import { useRegister } from '../../../hooks/useRegister';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { ErrorText } from '../../atoms/ErrorText/ErrorText';
import { ReactLink } from '../../atoms/ReactLink/ReactLink';
import registerLogo from '../../../images/registerSuccess.png';

const Login = () => {
  const { register } = useRegister();
  const initErrors = {
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    repeatedPassword: '',
    badReq: '',
  };
  const initRegisterState = {
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    repeatedPassword: '',
  };

  const [errors, setErrors] = useState(initErrors);
  const [success, setSuccess] = useState(false);

  const registerReducer = (state, action) => {
    switch (action.type) {
      case 'handleChange':
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      case 'reset':
        return initRegisterState;
      default:
        return state;
    }
  };

  const [registerParams, dispatchRegisterParams] = useReducer(
    registerReducer,
    initRegisterState
  );

  const validateForm = () => {
    let isValidated = true;
    let errors = { ...initErrors };

    if (!registerParams.email) {
      errors['email'] = 'Wprowadź adres email';
      isValidated = false;
    } else {
      const regExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regExp.test(registerParams.email)) {
        errors['email'] = 'Adres email jest nieprawidłowy';
        isValidated = false;
      }
    }

    if (!registerParams.userName) {
      errors['userName'] = 'Wprowadź login';
      isValidated = false;
    }

    if (!registerParams.lastName) {
      errors['lastName'] = 'Wprowadź swoje imię';
      isValidated = false;
    }

    if (!registerParams.firstName) {
      errors['firstName'] = 'Wprowadź swoje nazwisko';
      isValidated = false;
    }

    const passwordRegExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (!registerParams.password) {
      errors['password'] = 'Wprowadź hasło';
      isValidated = false;
    } else if (!registerParams.password.match(passwordRegExp)) {
      errors['password'] =
        'Hasło musi zawierać od 8 do 15 znaków, jedną wielką literę, numer i znak specjalny.';
      isValidated = false;
    }

    if (!registerParams.repeatedPassword) {
      errors['repeatedPassword'] = 'Wprowadź hasło';
      isValidated = false;
    } else if (registerParams.repeatedPassword !== registerParams.password) {
      errors['repeatedPassword'] = 'Hasła do siebie nie pasują';
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
    const result = await register(registerParams);
    console.log('RESULT', result);
    if (!result) {
      setErrors((prevState) => ({
        ...prevState,
        badReq: result,
      }));
      return;
    }

    setSuccess(true);
  };

  return (
    <Wrapper>
      <Container>
        <Content>
          {!success ? (
            <>
              <Form onSubmit={handleSubmit}>
                <Heading>ZAREJESTRUJ SIĘ</Heading>
                <Group>
                  <InputWrapper>
                    <FormInput
                      type='text'
                      placeholder='Wprowadź imię'
                      value={registerParams.firstName}
                      isValidated={errors.firstName ? false : true}
                      onChange={(e) =>
                        dispatchRegisterParams({
                          type: 'handleChange',
                          payload: { name: 'firstName', value: e.target.value },
                        })
                      }
                    />
                    <Icon>
                      <FaUser />
                    </Icon>
                  </InputWrapper>
                  {errors.firstName && (
                    <ErrorText>{errors.firstName}</ErrorText>
                  )}
                </Group>
                <Group>
                  <InputWrapper>
                    <FormInput
                      type='text'
                      placeholder='Wprowadź nazwisko'
                      value={registerParams.lastName}
                      isValidated={errors.lastName ? false : true}
                      onChange={(e) =>
                        dispatchRegisterParams({
                          type: 'handleChange',
                          payload: { name: 'lastName', value: e.target.value },
                        })
                      }
                    />
                    <Icon>
                      <FaUser />
                    </Icon>
                  </InputWrapper>
                  {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
                </Group>

                <Group>
                  <InputWrapper>
                    <FormInput
                      type='text'
                      placeholder='Wprowadź login'
                      value={registerParams.userName}
                      isValidated={errors.userName ? false : true}
                      onChange={(e) =>
                        dispatchRegisterParams({
                          type: 'handleChange',
                          payload: { name: 'userName', value: e.target.value },
                        })
                      }
                    />
                    <Icon>
                      <FaUser />
                    </Icon>
                  </InputWrapper>
                  {errors.userName && <ErrorText>{errors.userName}</ErrorText>}
                </Group>

                <Group>
                  <InputWrapper>
                    <FormInput
                      type='email'
                      placeholder='Wprowadź email'
                      value={registerParams.email}
                      isValidated={errors.email ? false : true}
                      onChange={(e) =>
                        dispatchRegisterParams({
                          type: 'handleChange',
                          payload: { name: 'email', value: e.target.value },
                        })
                      }
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
                      value={registerParams.password}
                      isValidated={errors.password ? false : true}
                      onChange={(e) =>
                        dispatchRegisterParams({
                          type: 'handleChange',
                          payload: { name: 'password', value: e.target.value },
                        })
                      }
                    />
                  </InputWrapper>
                  {errors.password && <ErrorText>{errors.password}</ErrorText>}
                </Group>
                <Group>
                  <InputWrapper>
                    <Icon>
                      <FaLock />
                    </Icon>
                    <FormInput
                      type='password'
                      placeholder='Powtórz hasło'
                      value={registerParams.repeatedPassword}
                      isValidated={errors.repeatedPassword ? false : true}
                      onChange={(e) =>
                        dispatchRegisterParams({
                          type: 'handleChange',
                          payload: {
                            name: 'repeatedPassword',
                            value: e.target.value,
                          },
                        })
                      }
                    />
                  </InputWrapper>
                  {errors.repeatedPassword && (
                    <ErrorText>{errors.repeatedPassword}</ErrorText>
                  )}
                </Group>

                <Button type='submit'>Stwórz konto</Button>
                {errors.badReq && <ErrorText>{errors.badReq}</ErrorText>}
              </Form>
            </>
          ) : (
            <SuccessDiv>
              <SuccessText>Gratulacje!</SuccessText>
              <SuccessMessage>
                Twoje konto zostało pomyślnie założone
              </SuccessMessage>
              <RegisterLogo src={registerLogo} alt='pomyślna rejestracja' />
              <ReactLink to={'/login'}>
                <Button type='button'>Przejdź do logowania</Button>
              </ReactLink>
            </SuccessDiv>
          )}
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Login;
