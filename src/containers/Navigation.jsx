import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

const NavigationWrap = styled('nav')({
  padding: '0.5rem',
  border: '1px solid #eeeeee',
});

const Navigation = () => {
  const history = useHistory();

  return <NavigationWrap></NavigationWrap>;
};

export default Navigation;
