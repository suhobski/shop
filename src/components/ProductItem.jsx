import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

const ProductWrap = styled('li')({
  display: 'grid',
  justifyItems: 'center',
  gridTemplateRows: 'auto 160px 25px',
  rowGap: '0.5rem',
  padding: '0.5rem',
  border: '1px solid #eeeeee',
  borderRadius: 4,
  overflow: 'hidden',
  cursor: 'pointer',
  '&:active': {
    borderColor: '#5a5a65',
  },
});

const ProductTitle = styled('h3')({
  marginBottom: '0.5rem',
  fontSize: '1rem',
  textAlign: 'center',
  overflow: 'hidden',
  '&:hover': {
    overflow: 'visible',
  },
});

const Price = styled('p')({
  fontSize: '1.25rem',
  textAlign: 'center',
});

const ProductItem = ({ product }) => {
  // const { id, title, description, image, price, rating } = product;
  const { id, title, image, price } = product;
  const history = useHistory();

  return (
    <ProductWrap onClick={() => history.push(`/products/${id}`)}>
      <header>
        <ProductTitle>{title}</ProductTitle>
      </header>
      <img src={image} alt={title} height="150px" />
      <Price>{price}$</Price>
    </ProductWrap>
  );
};

export default ProductItem;
