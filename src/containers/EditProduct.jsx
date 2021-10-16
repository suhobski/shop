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

const InputSubmit = styled('input')({
  '&:active': {
    background: '#e0e0e0',
  },
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
    isPublished,
  } = product;

  // FUNCTIONS ==========================================================================================
  // const handleButtonCancelClick = () => history.push('/products');

  const showSuccessResult = () => {
    setResultOfCreation('success');
    setTimeout(() => history.push('/'), 3000);
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
      const { id: responseID } = data;

      const date = new Date();
      const editedProduct = {
        id: responseID,
        date,
        isCreate: true,
        ...productData,
      };

      console.log(editedProduct);

      const newCatalog = [...catalog];
      const index = newCatalog.findIndex(
        (item) => String(item.id) === String(editedProduct.id)
      );
      newCatalog[index] = editedProduct;

      window.localStorage.setItem('catalog', JSON.stringify(newCatalog));
      editProduct(newCatalog);
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
              maxLength: 100,
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
          <ButtonCancel onClick={() => history.push('/products')} type="button">
            Cancel
          </ButtonCancel>
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
    editProduct: (newCatalog) => dispatch(editProductSuccess(newCatalog)),
    editProductWithError: (e) => dispatch(editProductError(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
