import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Switch from '@mui/material/Switch';
import { fetchCatalog } from '../store/actions/catalog';
import ProductItem from '../components/ProductItem';

const CatalogWrap = styled('section')({
  minHeight: '100%',
  padding: '0.5rem',
  border: '1px solid #5a5a65',
  borderRadius: 4,
  overflowX: 'auto',
});
const CatalogHeader = styled('header')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  justifyItems: 'stretch',
  gap: '0.5rem',
  padding: '0.5rem',
  borderRadius: 4,
});

const CountWrap = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  justifyContent: 'stretch',
  alignItems: 'center',
  gap: '0.5rem',
});

const ButtonAddProduct = styled('button')({
  padding: '0.5rem',
  border: 'none',
  outline: 'none',
  borderRadius: 4,
  background: '#b8f2c8',
  cursor: 'pointer',
  '&:active': {
    background: '#a9deb7',
  },
});

const ButtonSetCount = styled('button')((props) => ({
  padding: '0.5rem',
  border: 'none',
  outline: 'none',
  borderRadius: 4,
  background: props.background,
  cursor: 'pointer',
}));

const ButtonShowCreated = styled(ButtonSetCount)({
  width: '100%',
});

const CatalogListItems = styled('ul')({
  gridArea: 'header',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '0.5rem',
  padding: 0,
  listStyleType: 'none',
});

const Catalog = ({ fetchComponentCatalog, catalog }) => {
  const history = useHistory();
  const initialState = JSON.parse(window.localStorage.getItem('catalogState'));
  const [itemsCount, setItemsCount] = useState(initialState?.itemsCount || 8);
  const [isCreatedOnly, setIsCreatedOnly] = useState(
    initialState?.isCreatedOnly || false
  );
  const [isPublishedOnly, setIsPublishedOnly] = useState(
    initialState?.isPublishedOnly || false
  );

  const getShowItems = () => {
    let newcatalog = [...catalog];

    if (isPublishedOnly) {
      newcatalog = newcatalog.filter((item) => item.isPublished !== false);
    }

    if (isCreatedOnly) {
      newcatalog = newcatalog.filter((item) => item?.isCreate);
    }

    return newcatalog.filter((item, index) =>
      index < itemsCount ? item : false
    );
  };

  const showItems = getShowItems();

  const handleButtonAddProductClick = () =>
    history.push('/exore-test/create-product');

  useEffect(() => {
    window.localStorage.setItem(
      'catalogState',
      JSON.stringify({ itemsCount, isCreatedOnly, isPublishedOnly })
    );
  }, [itemsCount, isCreatedOnly, isPublishedOnly]);

  useEffect(() => fetchComponentCatalog(), []);

  return (
    <CatalogWrap>
      <CatalogHeader>
        <ButtonAddProduct onClick={handleButtonAddProductClick} type="button">
          Create product
        </ButtonAddProduct>
        <div>
          <ButtonShowCreated
            onClick={() => setIsCreatedOnly((prevState) => !prevState)}
            type="button"
            background={isCreatedOnly ? '#cccccc' : '#efefef'}
          >
            Only created
          </ButtonShowCreated>
        </div>
        <div style={{ justifySelf: 'center' }}>
          <span>Only published: </span>
          <Switch
            checked={isPublishedOnly}
            onChange={() => setIsPublishedOnly(!isPublishedOnly)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>
        <CountWrap>
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
        </CountWrap>
      </CatalogHeader>
      <CatalogListItems>
        {showItems &&
          showItems.map((product) => {
            if (product.id) {
              return (
                <ProductItem
                  product={product}
                  isCreatedOnly={isCreatedOnly}
                  key={product.id}
                />
              );
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComponentCatalog: () => dispatch(fetchCatalog()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
