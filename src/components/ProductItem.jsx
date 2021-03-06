import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteCatalogProduct } from '../store/actions/catalog';

const ProductWrap = styled('li')({
  position: 'relative',
  display: 'grid',
  justifyItems: 'center',
  gridTemplateRows: 'auto 160px 25px',
  rowGap: '0.5rem',
  padding: '0.5rem',
  border: '1px solid #5a5a65',
  borderRadius: 4,
  overflow: 'hidden',
  cursor: 'pointer',
  zIndex: 0,
  '&:active': {
    borderColor: '#5a5a65',
  },
});

const ProductHeader = styled('header')({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  columnGap: '0.5rem',
  width: '100%',
});

const ButtonEdit = styled('button')({
  width: '2rem',
  height: '2rem',
  outline: 'none',
  borderRadius: 32,
  border: 'none',
  background: 'url(/img/pen.png) no-repeat center',
  backgroundSize: '17px',
  cursor: 'pointer',
  transition: 'all .3s ease-out',
  zIndex: 40,
  '&:active': {
    backgroundColor: '#e0e0e0',
  },
});

const ButtonDelete = styled('button')((props) => ({
  display: props.show ? 'inline-block' : 'none',
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
}));

const ButtonGroup = styled('div')({
  display: 'flex',
  justifyContent: 'end',
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

const ProductItem = ({ product, isCreatedOnly, deleteProduct, catalog }) => {
  const defaultImage = 'https://clck.ru/YEDXY';
  const { id, title, image = defaultImage, price } = product;
  const history = useHistory();

  const handleButtonEditClick = (e) => {
    e.stopPropagation();
    history.push(`/exore-test/edit-product/${id}`);
  };

  const handleButtonDeleteClick = (e) => {
    e.stopPropagation();
    const newcatalog = catalog.filter((item) => String(item.id) !== String(id));
    window.localStorage.setItem('catalog', JSON.stringify(newcatalog));
    deleteProduct(id);
  };

  return (
    <ProductWrap onClick={() => history.push(`/exore-test/products/${id}`)}>
      <ProductHeader>
        <ProductTitle>{title}</ProductTitle>
        <ButtonGroup>
          <ButtonEdit onClick={handleButtonEditClick} />
          <ButtonDelete
            onClick={handleButtonDeleteClick}
            show={isCreatedOnly}
          />
        </ButtonGroup>
      </ProductHeader>
      <img src={image} alt={title} height="150px" />
      <Price>{Math.round(price * 100) / 100}$</Price>
    </ProductWrap>
  );
};

function mapStateToProps(state) {
  return {
    catalog: state.catalog.catalog,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteProduct: (id) => dispatch(deleteCatalogProduct(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
