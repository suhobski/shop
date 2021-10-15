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

const AppWrapper = styled('div')({
  position: 'relative',
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  minHeight: '100vh',
  maxWidth: 1280,
  margin: '0 auto',
  border: '1px solid #eeeeee',
});

const App = () => (
  <AppWrapper>
    <Router>
      <Header />
      <Switch>
        <Route path="/create-product">
          <CreateProduct />
        </Route>
        <Route path="/products/:id">
          <ProductDetails />
        </Route>
        <Route path="/products">
          <Main />
        </Route>
        <Route path="/" exact>
          <Redirect to="products" />
        </Route>
        <Route path="*">
          <div>
            <h2>404 error</h2>
          </div>
        </Route>
      </Switch>
    </Router>
    <Footer />
  </AppWrapper>
);

export default App;
