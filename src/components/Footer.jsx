import React from 'react';
import styled from 'styled-components';

const FooterWrap = styled('footer')({
  gridArea: 'footer',
  border: '1px solid #eeeeee',
});

const Footer = () => (
  <FooterWrap>
    <p>2021, made by Alex Sukhobski</p>
  </FooterWrap>
);

export default Footer;
