import React from 'react';
import styled from 'styled-components';

const FooterWrap = styled('footer')({
  padding: '0.5rem',
  textAlign: 'center',
});

const Footer = () => (
  <FooterWrap>
    <p>2021, made by Alex Sukhobski</p>
  </FooterWrap>
);

export default Footer;
