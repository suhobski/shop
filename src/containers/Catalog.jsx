import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Switch from '@mui/material/Switch';
import ProductItem from '../components/ProductItem';
import { fetchCatalog } from '../store/actions/catalog';

const CatalogWrap = styled('section')({});
const CatalogHeader = styled('header')({
  padding: '0.5rem',
  '& button': {
    marginRight: '0.5rem',
  },
  '& button:last-child': {
    marginRight: 0,
  },
});

const ButtonSetCount = styled('button')((props) => ({
  width: 40,
  padding: '0.5rem',
  border: 'none',
  outline: 'none',
  borderRadius: 4,
  background: props.background,
  cursor: 'pointer',
}));

const CatalogListItems = styled('ul')({
  gridArea: 'header',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(284px, 1fr))',
  gap: '0.5rem',
  padding: '0.5rem',
  listStyleType: 'none',
});

const Catalog = ({ fetchComponentCatalog, catalog }) => {
  const [itemsCount, setItemsCount] = useState(8);
  const [isCreatedOnly, setIsCreatedOnly] = useState(false);
  const createdProducts =
    JSON.parse(window.localStorage.getItem('createdProducts')) || [];

  const getShowItems = () => {
    if (isCreatedOnly) {
      return catalog.filter((item, index) =>
        index < itemsCount ? item : false
      );
    }
    return [...createdProducts, ...catalog].filter((item, index) =>
      index < itemsCount ? item : false
    );
  };

  const showItems = getShowItems();

  const handleChangeSwitch = (event) => {
    setIsCreatedOnly(event.target.checked);
  };

  useEffect(() => fetchComponentCatalog(), []);

  return (
    <CatalogWrap>
      <CatalogHeader>
        <span>Count: </span>
        <ButtonSetCount
          onClick={() => setItemsCount(8)}
          type="button"
          background={itemsCount === 8 ? '#cccccc' : '#efefef'}
        >
          8
        </ButtonSetCount>
        <ButtonSetCount
          onClick={() => setItemsCount(16)}
          type="button"
          background={itemsCount === 16 ? '#cccccc' : '#efefef'}
        >
          16
        </ButtonSetCount>
        <ButtonSetCount
          onClick={() => setItemsCount(catalog.length)}
          type="button"
          background={itemsCount === catalog.length ? '#cccccc' : '#efefef'}
        >
          All
        </ButtonSetCount>
        <span>Only created: </span>
        <Switch
          checked={isCreatedOnly}
          onChange={handleChangeSwitch}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </CatalogHeader>
      <CatalogListItems>
        {showItems &&
          showItems.map((product) => {
            if (product.id) {
              return <ProductItem product={product} key={product.id} />;
            }
            return null;
          })}
      </CatalogListItems>
    </CatalogWrap>
  );
};

function mapStateToProps(state) {
  return {
    catalog: state.catalog.catalog,
    createdProducts: state.createdProducts.createdProducts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComponentCatalog: () => dispatch(fetchCatalog()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
