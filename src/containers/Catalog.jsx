import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchCatalog } from '../store/actions/catalog';

const CatalogWrap = styled('header')({
  gridArea: 'header',
  padding: '0.5rem',
  borderRadius: '0.75rem',
});

const Catalog = ({ fetchComponentCatalog }) => {
  useEffect(() => fetchComponentCatalog(), []);
  return (
    <CatalogWrap>
      <h1>Catalog</h1>
    </CatalogWrap>
  );
};

function mapStateToProps(state) {
  console.log(state);
  return {
    catalog: state.catalog.exercises,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComponentCatalog: () => dispatch(fetchCatalog()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
