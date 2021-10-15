import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

const NavigationWrap = styled('nav')({
  padding: '0.5rem',
  border: '1px solid #eeeeee',
});

const ButtonAddProduct = styled('button')({
  padding: '0.5rem',
  border: 'none',
  outline: 'none',
  borderRadius: 4,
  background: '#b8f2c8',
  cursor: 'pointer',
  '&:active': {
    background: '#a9deb7',
  },
});

const Navigation = () => {
  const history = useHistory();

  return (
    <NavigationWrap>
      <ButtonAddProduct
        onClick={() => history.push('/create-product')}
        type="button"
      >
        Create product
      </ButtonAddProduct>
    </NavigationWrap>
  );
};

export default Navigation;
