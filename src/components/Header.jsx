import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

const HeaderWrap = styled('header')({
  margin: '0.5rem',
  marginBottom: 0,
  padding: '0.5rem',
  border: '1px solid #5a5a65',
  borderRadius: 4,
});

const HeaderTitle = styled('h1')({
  display: 'inline-block',
  cursor: 'pointer',
});

const Header = () => {
  const history = useHistory();

  return (
    <HeaderWrap>
      <HeaderTitle onClick={() => history.push('/exore-test/')}>
        Super shop
      </HeaderTitle>
    </HeaderWrap>
  );
};

export default Header;
