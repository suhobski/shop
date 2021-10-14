import React from 'react';
import styled from 'styled-components';

const ProductWrap = styled('li')({
  display: 'grid',
  justifyItems: 'center',
  gridTemplateRows: '48px 160px 40px',
  rowGap: '0.5rem',
  padding: '0.5rem',
  border: '1px solid #eeeeee',
  borderRadius: 4,
  overflow: 'hidden',
});

const ProductFooter = styled('footer')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '0 1rem',
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
  fontSize: '1.5rem',
});

const Raiting = styled('div')({});

const ProductItem = ({ product }) => {
  // const { id, title, description, image, price, rating } = product;
  const { title, image, price, rating } = product;

  return (
    <ProductWrap>
      <header>
        <ProductTitle>{title}</ProductTitle>
      </header>
      <img src={image} alt={title} height="150px" />
      <ProductFooter>
        <Raiting>
          Rating {rating.rate}/5 {rating.count} reviews
        </Raiting>
        <Price>{price}$</Price>
      </ProductFooter>
    </ProductWrap>
  );
};

export default ProductItem;
