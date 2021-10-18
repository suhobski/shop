import React from 'react';
import styled from 'styled-components';

const Page404Wrap = styled('header')({
  margin: '0.5rem',
  padding: '0.5rem',
  border: '1px solid #5a5a65',
  borderRadius: 4,
});

const Page404 = () => (
  <Page404Wrap>
    <h2>Page not found...</h2>
  </Page404Wrap>
);

export default Page404;
