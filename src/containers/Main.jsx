import React from 'react';
import styled from 'styled-components';

const MainWrap = styled('header')({
  gridArea: 'main',
  border: '1px solid #eeeeee',
});

const Main = () => (
  <MainWrap>
    <h2>Main</h2>
  </MainWrap>
);

export default Main;
