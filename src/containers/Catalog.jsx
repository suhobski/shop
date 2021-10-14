import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ProductItem from '../components/ProductItem';
import { fetchCatalog } from '../store/actions/catalog';

const CatalogWrap = styled('section')({});

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
      <header>
        <button onClick={() => setItemsCount(8)} type="button">
          Show 8 items
        </button>
        <button onClick={() => setItemsCount(16)} type="button">
          Show 16 items
        </button>
        <button onClick={() => setItemsCount(catalog.length)} type="button">
          Show all
        </button>
      </header>
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
