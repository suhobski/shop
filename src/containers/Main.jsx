import React from 'react';
import styled from 'styled-components';
import Catalog from './Catalog';

const MainWrap = styled('main')({
  padding: '0.5rem',
});

const Main = () => (
  <MainWrap>
    <Catalog />
  </MainWrap>
);

export default Main;
