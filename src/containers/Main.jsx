import React from 'react';
import styled from 'styled-components';
import Catalog from './Catalog';
import Navigation from './Navigation';

const MainWrap = styled('main')({
  border: '1px solid #eeeeee',
});

const Main = () => (
  <MainWrap>
    <Navigation />
    <Catalog />
  </MainWrap>
);

export default Main;
