import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { deleteCatalogProduct, fetchCatalog } from '../store/actions/catalog';

const ProductDetailsWrap = styled('section')({
  display: 'grid',
  gridTemplateColumns: 'minmax(200px, 600px)',
  margin: '0.5rem',
  padding: '0.5rem',
  border: '1px solid #5a5a65',
  borderRadius: 4,
});

const ProductDetailsHeader = styled('header')({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  columnGap: '0.5rem',
});

const Image = styled('img')({
  height: 200,
});

const ButtonDelete = styled('button')({
  left: '95%',
  width: '2rem',
  height: '2rem',
  outline: 'none',
  borderRadius: 32,
  border: 'none',
  background: 'url(/img/trash.png) no-repeat center',
  backgroundSize: '17px',
  cursor: 'pointer',
  transition: 'all .3s ease-out',
  '&:active': {
    backgroundColor: '#e0e0e0',
  },
});

const ProductDetails = ({ fetchComponentCatalog, catalog, deleteProduct }) => {
  const { id } = useParams();
  const history = useHistory();
  const product = catalog.find((el) => String(el.id) === String(id));
  const {
    category = 'no category',
    description,
    image = 'https://clck.ru/YEDXY',
    price,
    rating = { rate: 0, count: 0 },
    title,
  } = product;

  const handleButtonDeleteClick = () => {
    deleteProduct(id);
    history.push('/exore-test/');
  };
  useEffect(() => fetchComponentCatalog(), []);

  return (
    <ProductDetailsWrap>
      <ProductDetailsHeader>
        <h2>{title}</h2>
        <ButtonDelete onClick={handleButtonDeleteClick} />
      </ProductDetailsHeader>
      <p>Category: {category}</p>
      <Image src={image} alt={title} />
      <p>{description}</p>
      <p>
        Rating: {rating.rate}/5 Count: {rating.count}
      </p>
      <p>{Math.round(price * 100) / 100}$</p>
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
    deleteProduct: (id) => dispatch(deleteCatalogProduct(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
