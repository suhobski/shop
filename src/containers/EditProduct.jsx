/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { editProductError, editProductSuccess } from '../store/actions/catalog';
import {
  Form,
  Title,
  ResultText,
  ButtonsWrap,
  InputSubmit,
  ButtonCancel,
} from '../components/CreateProduct';

// STYLES===================================================================================================
const EditProductWrap = styled('section')({
  padding: '0.5rem',
});

const InputDescription = styled('p')({
  marginBottom: '0.25rem',
  fontSize: '0.75rem',
});

//  ?COMPONENT==============================================================================================
const EditProduct = ({ catalog, editProduct, editProductWithError }) => {
  const [resultOfCreation, setResultOfCreation] = useState(null);
  const history = useHistory();
  const { id } = useParams();
  const product = catalog.find((el) => String(el.id) === String(id));
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {
    category = '',
    description,
    image = '',
    price,
    title,
    isPublished = false,
  } = product;

  // FUNCTIONS ==========================================================================================
  // const handleButtonCancelClick = () => history.push('/products');

  const saveInLocalStorage = (editedProduct) => {
    const cachedCreatedProducts = window.localStorage.getItem('catalog');
    const storageProducts = JSON.parse(cachedCreatedProducts);
    const index = storageProducts.findIndex((item) => item.id === id);
    storageProducts[index] = editedProduct;
    window.localStorage.setItem('catalog', JSON.stringify(storageProducts));
  };

  const showSuccessResult = () => {
    setResultOfCreation('success');
    setTimeout(() => setResultOfCreation(null), 3000);
    history.push('/');
  };

  const showErrorResult = () => {
    setResultOfCreation('error');
    setTimeout(() => setResultOfCreation(null), 3000);
  };

  const onSubmit = async (productData) => {
    const { title, price, description, image, category } = productData;
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          price: +price,
          description,
          image,
          category,
        }),
      });
      const data = await response.json();

      const date = new Date();
      const editedProduct = { date, isCreate: true, ...data };

      saveInLocalStorage(editedProduct);
      editProduct(editedProduct);
      showSuccessResult();
    } catch (e) {
      editProductWithError(e);
      showErrorResult();
    }
  };

  //! RENDER===============================================================================
  return (
    <EditProductWrap>
      <Title>Edit product</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">
          <InputDescription>Title</InputDescription>
          <input
            placeholder="Title"
            defaultValue={title}
            id="title"
            {...register('title', {
              required: true,
              pattern: /^[A-Za-zА-Яа-я0-9]+/i,
              maxLength: 50,
            })}
          />
          {errors.title?.type === 'required' && (
            <span style={{ color: 'red' }}>Title is required</span>
          )}
        </label>
        <label htmlFor="category">
          <InputDescription>Category</InputDescription>
          <input
            placeholder="Category"
            defaultValue={category}
            id="category"
            {...register('category', {
              required: true,
              maxLength: 50,
            })}
          />
        </label>
        <label htmlFor="image-url">
          <InputDescription>Image url</InputDescription>
          <input
            placeholder="Image"
            defaultValue={image}
            id="image-url"
            {...register('image', {
              required: true,
            })}
          />
        </label>
        <label htmlFor="desctiption">
          <InputDescription>Description</InputDescription>
          <input
            placeholder="Description"
            defaultValue={description}
            id="desctiption"
            {...register('description', {
              required: true,
              maxLength: 100,
            })}
          />
          {errors.description?.type === 'required' && (
            <span style={{ color: 'red' }}>Description is required</span>
          )}
        </label>
        <label htmlFor="price">
          <InputDescription>Price</InputDescription>
          <input
            placeholder="Price"
            defaultValue={+price}
            {...register('price', {
              required: true,
              min: 0.01,
            })}
          />
          {errors.price?.type === 'required' && (
            <span style={{ color: 'red' }}>Price is required</span>
          )}
        </label>
        <label htmlFor="is-publish">
          <input
            type="checkbox"
            id="is-publish"
            defaultValue={isPublished}
            {...register('isPublished')}
          />
          <span>publish</span>
        </label>
        <ButtonsWrap>
          <InputSubmit type="submit" />
          <ButtonCancel type="button">Cancel</ButtonCancel>
        </ButtonsWrap>
        {resultOfCreation === 'success' && (
          <ResultText>The product has created successfully</ResultText>
        )}
        {resultOfCreation === 'error' && (
          <ResultText error>The product hasn&apos;t created</ResultText>
        )}
      </Form>
    </EditProductWrap>
  );
};

function mapStateToProps(state) {
  return {
    catalog: state.catalog.catalog,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editProduct: (product) => dispatch(editProductSuccess(product)),
    editProductWithError: (e) => dispatch(editProductError(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
