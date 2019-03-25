/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import ErrorBoundary from 'containers/ErrorBoundary';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage';
import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  background-color: #fff;
  min-height: 100vh;
`;

const App = () => (
  <AppWrapper>
    <Helmet
      titleTemplate="%s CDD App v1.0 - Powered by AITS"
      defaultTitle="CDD App v1.0 - Powered by AITS"
    >
      <meta name="description" content="CDD App" />
    </Helmet>
    <GlobalStyle />
    <ErrorBoundary>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </ErrorBoundary>
  </AppWrapper>
);

export default App;
