import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './containers/Main';
import ProductDetails from './components/ProductDetails';
import CreateProduct from './components/CreateProduct';
import EditProduct from './containers/EditProduct';
import Page404 from './components/Page404';

const AppWrapper = styled('div')({
  position: 'relative',
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  alignContent: 'stretch',
  minHeight: '100vh',
  maxWidth: 1280,
  margin: '0 auto',
});

const App = () => (
  <AppWrapper>
    <Router>
      <Header />
      <Switch>
        <Route path="/exore-test/edit-product/:id">
          <EditProduct />
        </Route>
        <Route path="/exore-test/create-product">
          <CreateProduct />
        </Route>
        <Route path="/exore-test/products/:id">
          <ProductDetails />
        </Route>
        <Route path="/exore-test/products">
          <Main />
        </Route>
        <Route path="/exore-test/" exact>
          <Redirect to="/exore-test/products" />
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
    </Router>
    <Footer />
  </AppWrapper>
);
export default App;
