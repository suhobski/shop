import React from 'react';
import styled from 'styled-components';

const FooterWrap = styled('footer')({
  margin: '0 0.5rem 0.5rem',
  padding: '0.5rem',
  textAlign: 'center',
  border: '1px solid #5a5a65',
  borderRadius: 4,
});

const Footer = () => (
  <FooterWrap>
    <p>2021, made by Alex Sukhobski</p>
  </FooterWrap>
);

export default Footer;
