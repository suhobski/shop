import React from 'react';
import styled from 'styled-components';

const HeaderWrap = styled('header')({
  padding: '0.5rem',
  color: '#5a5a65',
  background: '#ffffff',
  borderRadius: '0.75rem',
});

const Header = () => (
  <HeaderWrap>
    <h1>Super shop</h1>
  </HeaderWrap>
);

export default Header;
