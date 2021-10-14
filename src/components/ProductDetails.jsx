import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCatalog } from '../store/actions/catalog';

const ProductDetailsWrap = styled('section')({
  padding: '0.5rem',
});

const ProductDetails = ({ catalog, fetchComponentCatalog }) => {
  const { id } = useParams();
  const product = catalog.find((el) => el.id === +id);
  const { category, description, image, price, rating, title } = product;

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
