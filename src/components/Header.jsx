import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

const HeaderWrap = styled('header')({
  padding: '0.5rem',
  borderBottom: '1px solid #eeeeee',
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
