import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCatalog } from '../store/actions/catalog';

const ProductDetailsWrap = styled('section')({
  padding: '0.5rem',
});

const ProductDetails = ({ fetchComponentCatalog, catalog }) => {
  const { id } = useParams();
  const product = catalog.find((el) => String(el.id) === String(id));
  const {
    category = 'no category',
    description,
    image = 'https://clck.ru/YEDXY',
    price,
    rating = { rate: 0, count: 0 },
    title,
  } = product;

  useEffect(() => fetchComponentCatalog(), []);

  return (
    <ProductDetailsWrap>
      <h2>{title}</h2>
      <p>Category: {category}</p>
      <img src={image} alt={title} height="200px" />
      <p>{description}</p>
      <p>
        Rating: {rating.rate}/5 Count: {rating.count}
      </p>
      <p>{price}$</p>
    </ProductDetailsWrap>
  );
};

function mapStateToProps(state) {
  console.log('state', state);
  return {
    catalog: state.catalog.catalog,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComponentCatalog: () => dispatch(fetchCatalog()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
