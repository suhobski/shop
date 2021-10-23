/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import {
  createProductSuccess,
  createProductError,
} from '../store/actions/catalog';
import Button from './UI/Button/Button';

const CreateProductWrap = styled('section')({
  margin: '0.5rem',
  padding: '0.5rem',
  border: '1px solid #5a5a65',
  borderRadius: 4,
});

const Form = styled('form')({
  display: 'grid',
  rowGap: '1rem',
  gridTemplateColumns: 'minmax(auto, 500px)',
  '& input': {
    width: '100%',
    padding: '0.5rem',
    borderRadius: 4,
    border: '1px solid #dddddd',
    outline: 'none',
  },
  '& input[type="checkbox"]': {
    width: 'auto',
  },
});

const Title = styled('h3')({
  marginBottom: '1rem',
});

const ResultText = styled.p((props) => ({
  color: props.error ? 'red' : '#85de9e',
}));

const ButtonsWrap = styled('div')({
  display: 'grid',
  columnGap: '1rem',
  gridTemplateColumns: '1fr 1fr',
});

const InputSubmit = styled('input')({
  '&:active': {
    background: '#e0e0e0',
  },
});

export { Form, Title, ResultText, ButtonsWrap, InputSubmit };

const CreateProduct = ({ createProduct, createProductWithError }) => {
  const [resultOfCreation, setResultOfCreation] = useState(null);
  const history = useHistory();
  const {
    register,
    formState: { errors },
    reset,
    trigger,
    handleSubmit,
  } = useForm({
    criteriaMode: 'all',
  });

  const saveInLocalStorage = (product) => {
    const cachedCreatedProducts = window.localStorage.getItem('catalog');

    if (cachedCreatedProducts) {
      const storageProducts = JSON.parse(cachedCreatedProducts);
      storageProducts.push(product);
      window.localStorage.setItem('catalog', JSON.stringify(storageProducts));
    } else {
      window.localStorage.setItem('catalog', JSON.stringify([product]));
    }
  };

  const showSuccessResult = () => {
    setResultOfCreation('success');
    setTimeout(() => setResultOfCreation(null), 3000);
  };

  const showErrorResult = () => {
    setResultOfCreation('error');
    setTimeout(() => setResultOfCreation(null), 3000);
  };

  const onSubmit = async (productData) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        body: JSON.stringify(productData),
      });
      const data = await response.json();

      const date = new Date();
      const { _id } = data;
      const newProduct = { id: _id, date, isCreate: true, ...productData };

      saveInLocalStorage(newProduct);
      createProduct(newProduct);
      showSuccessResult();
      reset({
        title: '',
        description: '',
        price: '',
        isPublished: false,
      });
    } catch (e) {
      createProductWithError(e);
      showErrorResult();
    }
  };

  return (
    <CreateProductWrap>
      <Title>Create product</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Title"
          {...register('title', {
            required: true,
            pattern: /^[A-Za-zА-Яа-я0-9]+/i,
            maxLength: 50,
          })}
        />
        {errors.title?.type === 'required' && (
          <span style={{ color: 'red' }}>Title is required</span>
        )}
        <input
          placeholder="Description"
          {...register('description', {
            required: true,
            maxLength: 200,
          })}
        />
        {errors.description?.type === 'required' && (
          <span style={{ color: 'red' }}>Description is required</span>
        )}
        <input
          placeholder="Price"
          onChange={() => trigger}
          {...register('price', {
            required: true,
            min: 0.01,
            validate: (value) => {
              if (!Number(value)) {
                return 'This is validate required.';
              }
              return true;
            },
          })}
        />
        {errors.price?.type === 'required' && (
          <span style={{ color: 'red' }}>Price is required</span>
        )}
        {errors.price?.type === 'validate' && (
          <span style={{ color: 'red' }}>Does not match the price pattern</span>
        )}
        <label htmlFor="is-publish">
          <input type="checkbox" id="is-publish" {...register('isPublished')} />
          <span>publish</span>
        </label>
        <ButtonsWrap>
          <Button type="submit">OK</Button>
          <Button
            onClick={() => history.push('/exore-test/products')}
            type="button"
          >
            Cancel
          </Button>
        </ButtonsWrap>
        {resultOfCreation === 'success' && (
          <ResultText>The product has created successfully</ResultText>
        )}
        {resultOfCreation === 'error' && (
          <ResultText error>The product hasn&apos;t created</ResultText>
        )}
      </Form>
    </CreateProductWrap>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    createProduct: (product) => dispatch(createProductSuccess(product)),
    createProductWithError: (e) => dispatch(createProductError(e)),
  };
}

export default connect(null, mapDispatchToProps)(CreateProduct);
