import React from 'react';
import styled from 'styled-components';
import Catalog from './Catalog';

const MainWrap = styled('header')({
  gridArea: 'main',
  border: '1px solid #eeeeee',
});

const Main = () => (
  <MainWrap>
    <h2>Main</h2>
    <Catalog />
  </MainWrap>
);

export default Main;
