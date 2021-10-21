/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { ButtonCancel, ButtonsWrap, Form, InputSubmit } from '../CreateProduct';
import app from '../../backend/core';

const defaultWrap = `
  margin: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #5a5a65;
  border-radius: 4px;
`;

const AuthPage = styled('div')`
  ${defaultWrap}
  display: grid;
  place-items: center center;
  gap: 1rem;
`;

export default function Auth() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: 'all',
  });

  const onSubmit = async ({ email, password }) => {
    const Auth = getAuth(app);
    createUserWithEmailAndPassword(Auth, email, password)
      .then(({ user }) => console.log(`user`, user))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <AuthPage>
      <h2>Regictration</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register('email', {
            required: true,
          })}
        />
        {errors.email?.type === 'required' && (
          <span style={{ color: 'red' }}>Title is required</span>
        )}
        <input
          type="password"
          placeholder="Password"
          {...register('password', {
            required: true,
          })}
        />
        {errors.password?.type === 'required' && (
          <span style={{ color: 'red' }}>Description is required</span>
        )}
        <ButtonsWrap>
          <InputSubmit type="submit" />
          <ButtonCancel type="button">Cancel</ButtonCancel>
        </ButtonsWrap>
      </Form>
    </AuthPage>
  );
}
