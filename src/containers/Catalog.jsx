import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
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

const ButtonSetCount = styled('button')({
  width: 85,
  padding: '0.5rem',
  border: 'none',
  outline: 'none',
  borderRadius: 4,
});

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
  const showItems = catalog.filter((item, index) =>
    index < itemsCount ? item : false
  );

  useEffect(() => fetchComponentCatalog(), []);
  return (
    <CatalogWrap>
      <CatalogHeader>
        <ButtonSetCount onClick={() => setItemsCount(8)} type="button">
          8 items
        </ButtonSetCount>
        <ButtonSetCount onClick={() => setItemsCount(16)} type="button">
          16 items
        </ButtonSetCount>
        <ButtonSetCount
          onClick={() => setItemsCount(catalog.length)}
          type="button"
        >
          All
        </ButtonSetCount>
      </CatalogHeader>
      <CatalogListItems>
        {showItems &&
          showItems.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
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
