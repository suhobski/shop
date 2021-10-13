import React from 'react';
import styled from 'styled-components';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './containers/Main';
import Navigation from './containers/Navigation';

const AppWrapper = styled('div')({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '300px 1fr',
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateAreas: `
    "header header"
    "nav main"
    "footer footer "`,
  minHeight: '100vh',
  maxWidth: 1280,
  margin: '0 auto',
  border: '1px solid #eeeeee',
});

const App = () => (
  <AppWrapper>
    <Header />
    <Navigation />
    <Main />
    <Footer />
  </AppWrapper>
);

export default App;
